const User = require("../models/User")

const getUsers = async (req, res) => {
    const users = await User.find()
    res.send(users)
}

const addUser = async (req, res) => {
    const name = req.body.name
    if(!name || name.trim() ==="") {
        return res.status(400).send("Name is required")
    }
    const user = new User({ name : name.trim() })
    await user.save()

    res.send(user.name + " is added")
}

const deleteUser = async (req, res) => {
    const id = req.params.id

    const user = await User.findByIdAndDelete(id)

    if(!user) {
        return res.status(404).send("User not found")
    }
   
    res.send("User deleted")
}

const testUser = (req, res) => {
    res.send("User route is working")
}

module.exports = { getUsers, addUser, deleteUser, testUser} //This exports all the controller functions so the route file can use them

