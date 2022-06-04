const router = require("express").Router()
const User = require("../models/user")
const Post = require("../models/post")
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
        User.findById(req.params.id).then(user => {
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
router.put("/", (req, res) => {
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
        console.log(req.body)
        //if the user is updating their password then hash it 
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 16)
        }
        User.findByIdAndUpdate(decoded.id, req.body, {
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
router.delete("/", (req, res) => {
    // the request header has the token then we can verify it
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    // get the user if the user has valid token 
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        try {            
            // delete all posts of the user
            await Post.deleteMany({ userId: decoded.id })
            // delete the user
            await User.findByIdAndDelete(decoded.id)

            res.status(200).json({
                message: "User deleted"
            })

        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error"
            })
        }

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
        User.find().then(users => {
            if (!users) {
                return res.status(404).json({
                    message: "No users found"
                })
            }
            // don not send the password and timestamp
            const usersData = users.map(user => {
                const {
                    password,
                    updatedAt,
                    ...other
                } = user._doc
                return other
            })
            res.status(200).json({
                message: "Users found",
                users: usersData
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
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        try {
            // check if the user is already connected to the other user
            const user = await User.findById(decoded.id)
            const isConnected = user.connections.find(connection => connection.userId === req.params.id)
            if (isConnected) {
                return res.status(400).json({
                    message: "User already connected"
                })
            }

            // save current user to the other user's connections array
            const otherUser = await User.findById(req.params.id)
            otherUser.connections.push(decoded.id)
            await otherUser.save()

            // save the other user to the current user's connections array
            user.connections.push(req.params.id)
            const updatedUser = await user.save()

            // send the updated user to the frontend
            const {
                password,
                updatedAt,
                ...other
            } = updatedUser._doc

            res.status(200).json({
                message: "User connected",
                user : other
            })

        } catch (error) {
            res.status(500).json({
                message: "Error connecting user"
            })
        }
    })
})

// disconnect from a user
router.post("/:id/disconnect", (req, res) => {
    // the request header has the token then we can verify it
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    // get the user if the user has valid token
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        try {
            
            const updatedUser = await User.findByIdAndUpdate(decoded.id, {
                $pull: {connections: req.params.id}
            }, { new: true })
            
            await User.findByIdAndUpdate(req.params.id, {
                $pull: {connections: decoded.id}
            })
            
            const {
                password,
                updatedAt,
                ...other
            } = updatedUser._doc

            res.status(200).json({
                message: "User disconnected",
                user: other
            })
            
        } catch (error) {
            res.status(500).json({
                message: "Error disconnecting user"
            })
        }

    })
})

module.exports = router