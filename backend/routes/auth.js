// backend/routes/auth.js
const express = require('express')
const router = express.Router()
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const session = require('express-session')
const mongoose = require('mongoose')
const User = require('../models/User')
require('dotenv').config()

const RIOT_API_KEY = process.env.RIOT_API_KEY
const RIOT_ACCOUNT_URL = 'https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id'

// Login per Riot ID (gameName + tagLine)
router.post('/login', async (req, res) => {
    const { gameName, tagLine } = req.body
    if (!gameName || !tagLine) return res.status(400).json({ error: 'gameName and tagLine required' })

    try {
        const response = await fetch(`${RIOT_ACCOUNT_URL}/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`, {
            headers: { 'X-Riot-Token': RIOT_API_KEY }
        })

        if (!response.ok) return res.status(403).json({ error: 'Invalid Riot ID' })

        const data = await response.json()

        // MongoDB: User anlegen oder abrufen
        let user = await User.findOne({ puuid: data.puuid })
        if (!user) {
            user = new User({
                puuid: data.puuid,
                gameName: data.gameName,
                tagLine: data.tagLine
            })
            await user.save()
        }

        // Session setzen
        req.session.user = {
            puuid: data.puuid,
            gameName: data.gameName,
            tagLine: data.tagLine
        }

        res.json({ message: 'Login successful', user: req.session.user })
    } catch (err) {
        console.error('Login error:', err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

// Session abrufen
router.get('/me', (req, res) => {
    if (!req.session.user) return res.status(401).json({ error: 'Not logged in' })
    res.json({ user: req.session.user })
})

// Logout
router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ message: 'Logged out' })
    })
})

module.exports = router
