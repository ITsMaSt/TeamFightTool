const express = require('express')
const router = express.Router()
require('dotenv').config()

const RIOT_API_KEY = process.env.RIOT_API_KEY
console.log('[RIOT] Loaded API Key:', RIOT_API_KEY ? '✔️' : '❌ NICHT GESETZT!')

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

const ACCOUNT_REGION = 'europe'
const SUMMONER_REGION = 'euw1'

router.get('/summoner/:gameName/:tagLine', async (req, res) => {
    const { gameName, tagLine } = req.params
    console.log('[RIOT] Request for:', gameName, '#', tagLine)

    if (gameName === 'mock' && tagLine === 'puuid') {
        return res.json({
            name: 'MockPlayer',
            puuid: 'mock-puuid-1',
            profileIconId: 123,
            rank: 'Gold I'
        })
    }

    try {
        // Step 1: Account → PUUID
        const accountUrl = `https://${ACCOUNT_REGION}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}?api_key=${RIOT_API_KEY}`
        const accountRes = await fetch(accountUrl)

        if (!accountRes.ok) {
            const errorText = await accountRes.text()
            console.error('[RIOT] Account API error:', errorText)
            return res.status(accountRes.status).json({ error: 'account not found', detail: errorText })
        }

        const accountData = await accountRes.json()
        const { puuid } = accountData

        // Step 2: Summoner-Info → Name, Icon, ID
        const summonerUrl = `https://${SUMMONER_REGION}.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${puuid}?api_key=${RIOT_API_KEY}`
        const summonerRes = await fetch(summonerUrl)

        if (!summonerRes.ok) {
            const errText = await summonerRes.text()
            console.warn('[RIOT] Summoner fallback. Only PUUID returned. Reason:', errText)
            return res.json({
                puuid,
                name: gameName,
                profileIconId: null,
                rank: 'Unranked'
            })        }

        const summonerData = await summonerRes.json()

        // Step 3: Ranked Info → tier + rank
        const leagueUrl = `https://${SUMMONER_REGION}.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerData.id}?api_key=${RIOT_API_KEY}`
        const leagueRes = await fetch(leagueUrl)

        let rank = 'Unranked'
        if (leagueRes.ok) {
            const leagueData = await leagueRes.json()
            if (Array.isArray(leagueData)) {
                const tftRanked = leagueData.find(entry => entry.queueType === 'RANKED_TFT')
                if (tftRanked) {
                    rank = `${tftRanked.tier} ${tftRanked.rank}`
                } else {
                    console.log('[RIOT] No RANKED_TFT entry found')
                }
            } else {
                console.warn('[RIOT] Unexpected league data:', leagueData)
            }
        } else {
            const text = await leagueRes.text()
            console.warn('[RIOT] League API error:', text)
        }

        res.json({
            name: summonerData.name,
            puuid: summonerData.puuid,
            profileIconId: summonerData.profileIconId,
            rank: rank
        })

    } catch (err) {
        console.error('[RIOT] Fatal error:', err)
        res.status(500).json({ error: 'internal server error' })
    }
})

module.exports = router
