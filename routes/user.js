const router = require('express').Router()
const UsersController = require('../controllers/UsersController')

// @desc    Register user
// @route   PUT /register
router.post('/register', [UsersController.create])

// @desc    Get one user
// @route   GET /user/:id
router.get('/user/:id', [UsersController.getById])


module.exports = router