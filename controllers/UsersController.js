const User = require("../models/User")
const bcrypt = require('bcrypt')
const _ = require('lodash')
const jwt = require("jsonwebtoken")

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
        const access_token = jwt.sign(req.body, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
        const refresh_token = jwt.sign(req.body, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: "20m" })

        res.status(200).send({ accessToken: access_token, refreshToken: refresh_token })
    } catch (err) {
        res.status(500).send({ errors: err })
    }
}