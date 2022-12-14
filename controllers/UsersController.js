const User = require("../models/User")
const bcrypt = require('bcrypt')
const _ = require('lodash')
const jwt = require("jsonwebtoken")
const Testimony = require("../models/Testimony")

exports.create = async (req, res) => {
    const { email, name, password, confirm_password } = req.body
    const errors = []
    // Validating input
    if (!email){
        errors.push('Email is required!')
    }

    if(!name){
        errors.push('Name is required!')
    }
    
    if(!password){
        errors.push('Password is required!')
    }
    
    if(!confirm_password){
        errors.push('Password confirmation is required!')
    }
    
    if(password !== confirm_password){
        errors.push('Passwords do not match is required!')
    }

    if (errors.length > 0){
        res.status(403).send(errors)
    }else{
        try {
            const user = await User.findOne({ email: email })
    
            if (user){
                res.status(409).send("User already exists")
            }else{
                hashed_password = await bcrypt.hash(req.body.password, 10)
                
                const newUser = {
                    email: req.body.email,
                    name: req.body.name,
                    password: hashed_password
                }
                // await User.create(newUser)
    
                res.status(201).send(_.omit(newUser, ['password']))
            }
    
        } catch (err) {
            res.status(500).send("Server error!")        
        }
    }
}

exports.getById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean()
        res.status(200).send(_.omit(user, ['password', '__v']))
    } catch (err) {
        res.status(500).send("Server error!")
    }
}

exports.patchById = async (req, res) => {

    console.log(req.body)
    try {
        await User.findByIdAndUpdate(req.params.id, req.body)
        res.status(204).send({})
    } catch (err) {
        res.status(500).send({ errors: err })
    }

}

exports.login = (req, res) => {
    try {
        const access_token = jwt.sign(req.body, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: process.env.TEST_TOKEN_EXPIRY })
        const refresh_token = jwt.sign(req.body, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: process.env.TEST_REFRESH_TOKEN_EXPIRY })

        res.status(200).send({ accessToken: access_token, refreshToken: refresh_token })
    } catch (err) {
        res.status(500).send({ errors: err })
    }
}

exports.refreshTokens = (req, res) => {
    try {
        const refresh_token = req.body.refreshToken
        // Check if it's there
        if (!refresh_token){
            res.status(400).send("Refresh token is required")
        }else{
            // Verify token
            const user = jwt.verify(refresh_token, process.env.JWT_REFRESH_TOKEN_SECRET)
            if (user.id === req.body.user_id){
                const access_token = jwt.sign(user, process.env.JWT_ACCESS_TOKEN_SECRET)
                const refresh_token = jwt.sign(user, process.env.JWT_REFRESH_TOKEN_SECRET)

                res.status(200).send({ accessToken: access_token, refreshToken: refresh_token })
            }else{
                res.status(400).send("Invalid token")
            }
        }
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

exports.getProfile = async (req, res) => {
    try {
        const userTestimonies = await Testimony.find({ user: req.user.id })
        const user = JSON.stringify(req.user)
        res.status(200).send(`user: ${user}, testimonies: ${userTestimonies}`)
    } catch (err) {
        res.status(500).send({ errors: err })
    }
}

exports.addTestimony = async (req, res) => {
    try {
        const testimony = req.body.testimony.trim()
        // Check if there is a testimony
        if (!testimony || testimony.length == 0){
            res.status(400).send("Testimony is required")
        }else{
            const payload = {
                testimony: testimony,
                tags: req.body.tags,
                user: req.user.id
            }
            await Testimony.create(payload)
            res.status(201).send(payload)
        }
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

exports.deleteTestimony = async (req, res) => {
    try {
        testimony_id = req.params.id
        const testimony = await Testimony.findById(testimony_id)

        // Check if testimony exists
        if (!testimony){
            res.status(400).send("Testimony not found")
        }else{
            await Testimony.remove({ _id: testimony_id })
            res.status(200).send("Testimony deleted")
        }
    } catch (err) {
        res.status(500).send({ error: err })
    }
}