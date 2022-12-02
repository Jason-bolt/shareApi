const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

// Configure dotenv
dotenv.config({ path: './config/config.env' })

const app = express()

connectDB()

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running on ${PORT}`))