require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

// Import Routes
const riotRoutes = require('./routes/riot')
const matchRoutes = require('./routes/match')
const statsRoutes = require('./routes/stats')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const mongoose = require('mongoose')

// Middleware
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))

// API Routes
app.use('/api', riotRoutes)
app.use('/api', matchRoutes)
app.use('/api', statsRoutes)
app.use('/api', authRoutes);
// Root route (optional)
app.get('/', (req, res) => {
    res.json({ status: 'TeamFightTools API is running' })
})

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('[MongoDB] Verbunden ✔️'))
    .catch((err) => console.error('[MongoDB] Fehler:', err))

// Start Server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
