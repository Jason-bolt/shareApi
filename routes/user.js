const router = require('express').Router()
const UsersController = require('../controllers/UsersController')
const UserVerificationMiddleware = require('../middlewares/verifyUserMiddleware')

// @desc    Register user
// @route   POST /register
router.post('/register', [UsersController.create])

// @desc    Login user
// @route   POST /login
router.post('/login', [
    UserVerificationMiddleware.isPasswordAndUserMatch,
    UsersController.login
])

// @desc    Get one user
// @route   GET /user/:id
router.get('/user/:id', [UsersController.getById])

// @desc    Update user data
// @route   PATCH /user/:id
router.patch('/user/:id', [UsersController.patchById])

// @desc    Profile
// @route   GET /profile
router.get('/profile', [
    UserVerificationMiddleware.validateToken,
    UsersController.getProfile
])


module.exports = router