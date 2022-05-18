const router = require("express").Router()
const user = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

// GET A USER BY ID
router.get("/:id", (req, res) => {
    // get the user if the user has valid token 
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => { 
        if(err) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        user.findById(req.params.id).then(user => {
            if(!user) {
                return res.status(404).json({
                    message: "User not found"
                })
            }
            res.status(200).json({
                user
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
    // get the user if the user has valid token 
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => { 
        if(err) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        // if the user is updating their password then hash it 
        if (req.body.password) { 
            req.body.password = bcrypt.hashSync(req.body.password, 16)
        }
        user.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(user => { 
            if(!user) {
                return res.status(404).json({
                    message: "User not found"
                })
            }
            res.status(200).json({
                user
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
    // get the user if the user has valid token 
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => { 
        if(err) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        user.findByIdAndDelete(req.params.id).then(user => {
            if(!user) {
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


module.exports = router