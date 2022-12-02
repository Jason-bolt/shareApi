const User = require("../models/User")
const bcrypt = require('bcrypt')

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
                // await User.create()
    
                res.status(201).send(newUser)
            }
    
        } catch (err) {
            res.status(500).send("Server error!")        
        }
    }
}