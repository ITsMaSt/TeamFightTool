require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

// Import Routes
const riotRoutes = require('./routes/riot')
const matchRoutes = require('./routes/match')
const statsRoutes = require('./routes/stats')

// Middleware
app.use(cors())
app.use(express.json())

// API Routes
app.use('/api', riotRoutes)
app.use('/api', matchRoutes)
app.use('/api', statsRoutes)

// Root route (optional)
app.get('/', (req, res) => {
    res.json({ status: 'TeamFightTools API is running' })
})

// Start Server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
