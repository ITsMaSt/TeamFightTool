const express = require('express')
const router = express.Router()
require('dotenv').config()

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

const RIOT_API_KEY = process.env.RIOT_API_KEY

// ============================================
// 📦 GET /api/matches/:puuid
// → Holt letzte 20 Match-IDs via PUUID
// ============================================
router.get('/matches/:puuid', async (req, res) => {
    const puuid = req.params.puuid

    // ✅ Mock-Modus
    if (puuid === 'mock-puuid-1') {
        return res.json({
            matches: [
                'EUW1_1234567890',
                'EUW1_1234567891',
                'EUW1_1234567892',
                'EUW1_1234567893',
                'EUW1_1234567894'
            ],
            mock: true
        })
    }

    const riotUrl = `https://europe.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?count=20&api_key=${RIOT_API_KEY}`

    try {
        const response = await fetch(riotUrl)

        if (!response.ok) throw new Error('Riot API failed')
        const matchIds = await response.json()
        return res.json({ matches: matchIds })

    } catch (err) {
        console.warn('⚠️ Riot API failed – serving fallback match IDs')
        return res.json({
            matches: [
                'EUW1_1234567890',
                'EUW1_1234567891',
                'EUW1_1234567892'
            ],
            mock: true
        })
    }
})


// ============================================
// 📄 GET /api/match/:matchId
// → Holt vollständige Match-Details
// ============================================
router.get('/match/:matchId', async (req, res) => {
    const matchId = req.params.matchId
    const riotUrl = `https://europe.api.riotgames.com/tft/match/v1/matches/${matchId}?api_key=${RIOT_API_KEY}`

    try {
        const response = await fetch(riotUrl)

        if (!response.ok) throw new Error('Riot API failed')
        const matchData = await response.json()
        return res.json({ match: matchData })

    } catch (err) {
        console.warn('⚠️ Riot API failed – serving mock match data')

        const mockMatch = {
            metadata: {
                match_id: matchId,
                participants: ["mock-puuid-1", "mock-puuid-2"]
            },
            info: {
                game_datetime: Date.now(),
                participants: [
                    {
                        puuid: "mock-puuid-1",
                        placement: 1,
                        level: 9,
                        traits: [
                            { name: "Set11_Bruiser", num_units: 4, tier_current: 2 }
                        ],
                        units: [
                            { character_id: "TFT11_Shen", items: [6, 14], tier: 2 },
                            { character_id: "TFT11_Galio", items: [], tier: 1 }
                        ]
                    },
                    {
                        puuid: "mock-puuid-2",
                        placement: 8,
                        level: 6,
                        traits: [
                            { name: "Set11_Reaper", num_units: 2, tier_current: 1 }
                        ],
                        units: [
                            { character_id: "TFT11_Kayle", items: [2], tier: 1 }
                        ]
                    }
                ]
            }
        }

        return res.json({ match: mockMatch, mock: true })
    }
})

module.exports = router
