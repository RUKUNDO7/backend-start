const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()

const { //destructuring
    getUsers,
    addUser,
    deleteUser, 
    testUser,
    signup,
    login
} = require('../controllers/userController')

router.get('/', auth, getUsers)
router.post('/', addUser)
router.delete('/:id', deleteUser)
router.get('/test', testUser)
router.post('/signup', signup)
router.post('/login', login)

module.exports = router //This makes the router object available to other files