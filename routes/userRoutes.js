const express = require('express')
const router = express.Router()

const { //destructuring
    getUsers,
    addUser,
    deleteUser
} = require('../controllers/userController')

router.get('/', getUsers)
router.post('/', addUser)
router.delete('/:index', deleteUser)

module.exports = router //This makes the router object available to other files