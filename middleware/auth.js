//It runs before protected routes and checks if the user is logged in by verifying a JWT token.
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]

    if(!token) {
        return res.status(401).json({ message: "No token provided" }) /*Immediately sends back a  
                                                                      401 (Unauthorized) response  
                                                                      with a JSON message saying  
                                                                      "No token provided".  
                                                                      It stops further processing  
                                                                      (the protected route never runs).*/
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET )
        req.user = decoded
        next()
    } catch (err) {
        return res.status(403).json({ message: "Invalid token"}) /* Sends a 403 (Forbidden) response  
                                                                 with a JSON message "Invalid token".  
                                                                 (Some people use 401 here, but the logic  
                                                                 is: the token is present but incorrect/expired,  
                                                                 so access is forbidden.)*/
    }
}

module.exports = auth /*Exports the auth middleware so 
                    it can be imported and used in other 
                    files (e.g., app.use('/profile', auth, profileRoute)).*/
