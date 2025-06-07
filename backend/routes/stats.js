const express = require('express')
const router = express.Router()

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

// Holt Matches und berechnet Stats
router.get('/stats/:puuid', async (req, res) => {
    const puuid = req.params.puuid

    try {
        // Step 1: Match-IDs abrufen
        const matchRes = await fetch(`http://localhost:3000/api/matches/${puuid}`)
        const matchData = await matchRes.json()
        const matchIds = matchData.matches || []

        if (matchIds.length === 0) {
            return res.status(404).json({ error: 'no matches found' })
        }

        // Step 2: Alle Matches abrufen
        let totalPlacement = 0
        const placementCounts = {} // z.B. { 1: 3, 4: 5 }

        for (const matchId of matchIds) {
            const detailRes = await fetch(`http://localhost:3000/api/match/${matchId}`)
            const detailData = await detailRes.json()
            const match = detailData.match

            const player = match.info.participants.find(p => p.puuid === puuid)
            if (!player) continue

            const placement = player.placement
            totalPlacement += placement
            placementCounts[placement] = (placementCounts[placement] || 0) + 1
        }

        const matchCount = Object.values(placementCounts).reduce((a, b) => a + b, 0)
        const avgPlacement = matchCount > 0 ? (totalPlacement / matchCount).toFixed(2) : null

        return res.json({
            matchCount,
            averagePlacement: avgPlacement,
            placementCounts
        })

    } catch (err) {
        console.error('Stat-Fehler:', err)
        return res.status(500).json({ error: 'stats calculation failed' })
    }
})

module.exports = router
