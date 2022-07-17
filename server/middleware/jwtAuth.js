const jwt = require("jsonwebtoken")
const jwtAuth = (req, res, next) => { 
    // check if the request body has a authorization header
    if (req.headers.authorization) { 
        // get the token from the header and split it into two parts (before and after the space)
        const token = req.headers.authorization.split(" ")[1]
        // verify the token and get the decoded payload
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => { 
            if (err) { 
                return res.status(401).json({ 
                    message: "Invalid token" 
                }) 
            } else { 
                // if the token is valid, set the user to the request object
                req.user = decoded 
                next() 
            } 
        })
    } else {
        return res.status(401).json({
            message: "No token provided"
        })
    }
}

module.exports = jwtAuth