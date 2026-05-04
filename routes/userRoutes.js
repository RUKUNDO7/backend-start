const express = require('express')
const router = express.Router()

const { //destructuring
    getUsers,
    addUser,
    deleteUser, 
    testUser
} = require('../controllers/userController')

router.get('/', getUsers)
router.post('/', addUser)
router.delete('/:id', deleteUser)
router.get('/test', testUser)

module.exports = router //This makes the router object available to other files