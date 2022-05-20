const router = require("express").Router()
const user = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

// GET A USER BY ID
router.get("/:id", (req, res) => {
    // the request header has the token then we can verify it
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    // get the user if the user has valid token 
    const token = req.headers.authorization.split(" ")[1]

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        user.findById(req.params.id).then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                })
            }
            // if the user is found, do not send the password and timestamp
            const {
                password,
                updsatedAt,
                ...other
            } = user._doc
            res.status(200).json({
                message: "User found",
                user: other
            })

        }).catch(err => {
            res.status(500).json({
                message: "Error getting user"
            })
        })
    })
})


// UPDATE A USER BY ID
router.put("/:id", (req, res) => {
    // the request header has the token then we can verify it
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    // get the user if the user has valid token 
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        // if the user is updating their password then hash it 
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 16)
        }
        user.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }).then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                })
            }
            // if the user is found, do not send the password and timestamp
            const {
                password,
                updatedAt,
                ...userData
            } = user._doc
            res.status(200).json({
                message: "User updated",
                user: userData
            })
        }).catch(err => {
            res.status(500).json({
                message: "Error updating user"
            })
        })
    })
})


// DELETE A USER BY ID
router.delete("/:id", (req, res) => {
    // the request header has the token then we can verify it
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    // get the user if the user has valid token 
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        user.findByIdAndDelete(req.params.id).then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                })
            }
            res.status(200).json({
                message: "User deleted"
            })
        }).catch(err => {
            res.status(500).json({
                message: "Error deleting user"
            })
        })
    })
})

// GET ALL USERS
router.get("/", (req, res) => { 
    // the request header has the token then we can verify it
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    // get the user if the user has valid token 
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        user.find().then(users => {
            if (!users) {
                return res.status(404).json({
                    message: "No users found"
                })
            }
            res.status(200).json({
                message: "Users found",
                users: users
            })
        }).catch(err => {
            res.status(500).json({
                message: "Error getting users"
            })
        })
    })
})

// connect to a user
router.post("/:id/connect", (req, res) => {
    // the request header has the token then we can verify it
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    // get the user if the user has valid token 
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        // find the user and add the id to the connections array of the user
        user.findByIdAndUpdate(req.params.id, {
            $push: {
                connections: decoded.id
            }
        }).then(userOne => { 
            // find the user and add the id to the connections array of the user
            user.findByIdAndUpdate(decoded.id, {
                $push: {
                    connections: req.params.id
                }
            }).then(userTwo => { 
                res.status(200).json({
                    message: "Connected"
                })
            }).catch(err => {
                res.status(500).json({
                    message: "Error connecting"
                })
            })
                
        }).catch(err => { 
            res.status(500).json({
                message: "Error connecting user"
            })
        })
    })
})

module.exports = router