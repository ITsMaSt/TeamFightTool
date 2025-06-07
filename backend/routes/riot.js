const express = require('express')
const router = express.Router()
require('dotenv').config()

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

const RIOT_REGION = 'euw1'
const RIOT_API_KEY = process.env.RIOT_API_KEY
console.log('API Key:', RIOT_API_KEY)
router.get('/summoner/:name', async (req, res) => {
    const summonerName = req.params.name

    // 👉 Mock-Fallback
    if (summonerName === 'mock-puuid-1') {
        return res.json({
            name: 'mock-puuid-1',
            puuid: 'mock-puuid-1',
            profileIconId: 456
        })
    }

    try {
        const response = await fetch(
            `https://${RIOT_REGION}.api.riotgames.com/tft/summoner/v1/summoners/by-name/${encodeURIComponent(summonerName)}`,
            {
                headers: {
                    'X-Riot-Token': RIOT_API_KEY
                }
            }
        )

        if (!response.ok) {
            return res.status(response.status).json({ error: 'summoner not found or API error' })
        }

        const data = await response.json()
        res.json({
            name: data.name,
            puuid: data.puuid,
            profileIconId: data.profileIconId
        })
    } catch (err) {
        console.error('Riot API error:', err)
        res.status(500).json({ error: 'internal server error' })
    }
})


module.exports = router
