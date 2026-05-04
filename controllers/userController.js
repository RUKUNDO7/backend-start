let users = []

const getUsers = (req, res) => {
    res.send(users)
}

const addUser = (req, res) => {
    const name = req.body.name
    if(!name || name.trim() ==="") {
        return res.status(400).send("Name is required")
    }
    const user = { name : name.trim() }
    users.push(user)

    res.send(user.name + " is added")
}

const deleteUser = (req, res) => {
    const index = req.params.index
    if(!users[index]) {
        return res.status(404).send("User not found")
    }
    users.splice(index, 1)

    res.send("User deleted")
}

const testUser = (req, res) => {
    res.send("User route is working")
}

module.exports = { getUsers, addUser, deleteUser, testUser}

