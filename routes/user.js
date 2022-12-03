const router = require('express').Router()
const UsersController = require('../controllers/UsersController')

// @desc    Register user
// @route   PUT /register
router.post('/register', [UsersController.create])

// @desc    Get one user
// @route   GET /user/:id
router.get('/user/:id', [UsersController.getById])

// @desc    Update user data
// @route   PATCH /user/:id
router.patch('/user/:id', [UsersController.patchById])


module.exports = router