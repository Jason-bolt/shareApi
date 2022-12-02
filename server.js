const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

// Configure dotenv
dotenv.config({ path: './config/config.env' })

// Connect Database
try {
    const conn = mongoose.connect(process.env.MONGO_URI)
    
    const app = express()

    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(morgan('combined'))
    app.use(helmet())
    app.use(cors())
    
    // Routes
    app.use('/api/v1/testimonies', require('./routes/public'))
    app.use('/api/v1', require('./routes/auth'))
    
    
    const PORT = process.env.PORT || 3000
    
    app.listen(PORT, console.log(`Server running on ${PORT}`))


} catch (err) {
    console.error(err)
    process.exit(1)
}

