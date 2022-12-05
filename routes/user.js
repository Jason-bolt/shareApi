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
router.patch('/user/:id', [
    UserVerificationMiddleware.validateToken,
    UsersController.patchById
])

// @desc    Display profile, user info and user testimonies
// @route   GET /profile
router.get('/profile', [
    UserVerificationMiddleware.validateToken,
    UsersController.getProfile
])

// @desc    Add testimony
// @route   POST /testimony
router.post('/testimony', [
    UserVerificationMiddleware.validateToken,
    UsersController.addTestimony
])

// @desc    Delete testimony
// @route   DELETE /testimony
router.delete('/testimony/:id', [
    UserVerificationMiddleware.validateToken,
    UsersController.deleteTestimony
])

// @desc    Refresh tokens
// @route   POST /refreshTokens
router.post('/refreshTokens', [
    UsersController.refreshTokens
])


module.exports = router