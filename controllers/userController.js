const bcrypt = require('bcrypt')

const User = require("../models/User")

const getUsers = async (req, res) => {
    const users = await User.find()
    res.status(200).send(users)
}

const addUser = async (req, res) => {
    const name = req.body.name
    if(!name || name.trim() ==="") {
        return res.status(400).send("Name is required")
    }
    const user = new User({ name : name.trim() })
    await user.save()

    res.status(201).json({ message: "User created" })
}

const deleteUser = async (req, res) => {
    const id = req.params.id

    const user = await User.findByIdAndDelete(id)

    if(!user) {
        return res.status(404).send("User not found")
    }
   
    res.status(200).json({ message: "User deleted" })
}

const testUser = (req, res) => {
    res.status(200).json({ message: "User route is working"})
}

const signup = async (req, res) => {
    let { name, password } = req.body /*We pull name and password from the request body.
                                       The { name, password } syntax is just a shortcut to 
                                       grab those two properties directly.*/
    
    if(!name || name.trim() === "" || !password || password.trim() === "") {
        return res.status(400).json({ message: "All fields are required" })
    }

    name = name.trim()
    password = password.trim()

    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await User.findOne({ name }) 

    if (existingUser) {
        return res.status(400).json({ message: "User already exists"})
    }

    const user = new User ({
        name,
        password: hashedPassword
    })

    await user.save()

    res.status(201).json({ message: "User created" })
}
    
    const login = async (req, res) => {
    const { name, password } = req.body

    const user = await User.findOne({ name })

    if(!user) {
        return res.status(404).json({ message: "User not found" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" }) /*The message is vague on purpose —  
                                                 you don’t want to tell a hacker whether 
                                                 the name exists or the password is wrong. */
    }

    res.status(200).json({ message: "Login successful" })
}

module.exports = { getUsers, addUser, deleteUser, testUser, signup, login} //This exports all the controller functions so the route file can use them

