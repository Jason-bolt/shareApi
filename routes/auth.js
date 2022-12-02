const router = require('express').Router()
const Testimony = require('../models/Testimony')

// @desc    Register user
// @route   PUT /user
router.get('/', async (req, res) => {

    try {
        const testimonies = await Testimony.find({}).populate('user', 'name').lean()
        res.status(200).send(testimonies)
    } catch (err) {
        console.error(err)
        res.status(500).send('Sorry, something went wrong!')
    }
})


module.exports = router