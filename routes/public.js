const router = require('express').Router()
const Testimony = require('../models/Testimony')
var _ = require('lodash');

// @desc    Get all testimonies
// @route   FET /testimonies
router.get('/', async (req, res) => {

    try {
        const testimonies = await Testimony.find({}).populate('user').lean()
        res.status(200).send(_.omit(JSON.parse(JSON.stringify(testimonies)), ['user.password']))
        // res.status(200).send(testimonies)
    } catch (err) {
        console.error(err)
        res.status(500).send('Sorry, something went wrong!')
    }
})


module.exports = router