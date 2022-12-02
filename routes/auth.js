const router = require('express').Router()
const UsersController = require('../controllers/UsersController')

// @desc    Register user
// @route   PUT /register
router.post('/register', [UsersController.create])


module.exports = router