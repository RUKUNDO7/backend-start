const express = require('express')
const app = express()

app.use(express.json())

//Storage(in memory)
let users = []

app.get('/', (req, res) => {
    res.send("Home page")
})

app.get('/about', (req, res) => {
    res.send("About page")
})

app.get('/user', (req, res) => {
    res.send("Users page")
})

app.get('/test', (req, res) => {
    res.send("Test page")
})

app.post('/greet', (req, res) => {                        
    const name = req.body.name
    if(!name || name.trim()=== "") { //“Reject the request if name is missing entirely OR if after removing all the blank spaces, nothing is left.”
        return res.status(404).send("Name is required")  
    } /*return is crucial here.
    It stops the rest of the  
    function from running. So  
    if we enter the if block,  
    we send the error and exit.  
    The friendly res.send("Hello " + name)
    line below never runs in the error case.*/
    res.send("Hello " + name)
})

app.post('/users', (req, res) => {
    const name = req.body.name
    if(!name || name.trim() === "") {
        return res.status(400).send("Name is required")
    }
    const user = { name: name.trim()} //Create a clean user object - removes extra spaces from the name
    users.push(user) //Add the user to the users array
    res.send(user.name + " is added")
})

app.get('/users', (req, res) => {
    res.send(users) 
    /*It simply sends back the entire users array.
    Because users is an array of objects, Express  
    will convert it to JSON automatically (it calls JSON.stringify behind the scenes).*/ 
})

app.delete('/users/:index', (req, res) => { // Listens for DELETE requests. The colon means :index is a variable part of the URL.
    const index = req.params.index  
    /*Express captures that value in req.params.index.  
    It’s a string, but JavaScript’s array works with numeric indices even when passed as strings*/
    if(!users[index]) {
        return res.status(404).send("User not found")
    }
    users.splice(index, 1)
    /*splice(index, 1) starts at the given index and removes 1 element from the array.
    The array is modified in place; after this, the user is gone.*/
    res.send("User deleted")
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})