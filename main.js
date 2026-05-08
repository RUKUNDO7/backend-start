require('dotenv').config()  //load .env at the very start
const express = require('express')
const app = express()

const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/backend-start")
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err))

const userRoutes = require('./routes/userRoutes')

app.use(express.json())

app.use('/users', userRoutes)

app.get('/', (req, res) => {
    res.send('Backend API is working')
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})
