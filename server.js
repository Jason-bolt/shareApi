const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

// Configure dotenv
dotenv.config({ path: './config/config.env' })

// Connect Database
try {
    const conn = mongoose.connect(process.env.MONGO_URI)
    
    const app = express()

    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    
    // Routes
    app.use('/testimonies', require('./routes/public'))
    
    
    const PORT = process.env.PORT || 3000
    
    app.listen(PORT, console.log(`Server running on ${PORT}`))


} catch (err) {
    console.error(err)
    process.exit(1)
}

