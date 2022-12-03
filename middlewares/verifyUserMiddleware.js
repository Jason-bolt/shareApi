const User = require("../models/User")
const bcrypt = require('bcrypt')

exports.isPasswordAndUserMatch = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    try {
        if (!user){
            res.status(404).send({errors: ['Invalid email or password']})
        }else{
            const db_password = user.password
            if (await bcrypt.compare(req.body.password, db_password)){
                req.body = {
                    id: user._id,
                    email: user.email,
                    name: user.name
                }
                return next()
            }else{
                res.status(400).send({errors: ['Invalid email or password']})
            }
        }
    } catch (err) {
        res.status(500).send({ errors: err })
    }
}