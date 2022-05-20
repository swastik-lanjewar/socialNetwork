const router = require("express").Router()
const user = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post('/create-account', (req, res) => {
    const { name, username, email, password } = req.body;
    const newUser = new user({
        name,
        username,
        email,
        password: bcrypt.hashSync(password, 16)
    })

    newUser.save().then(user => {
        // NOW WE HAVE TO GENERATE A TOKEN
        const token = jwt.sign({
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
        }, process.env.SECRET_KEY, { expiresIn: '1h' })
        user.password = undefined;
        res.status(200).json({
            message: "User created successfully",
            token, 
            user
        })

    }).catch(err => {
        // error of duplicate email 
        if (err.code === 11000) {
            if(err.errmsg.includes("email")){
                res.status(400).json({
                    message: "Email already exists"
                })
            } else if(err.errmsg.includes("username")){
                res.status(400).json({
                    message: "Username already exists"
                })
            }
        } else {
            res.status(500).json({
                message: "Error creating user"
            })
        }
    })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    user.findOne({ email }).then(user => { 
        if(!user) {
            return res.status(400).json({
                message: "Invalid User Credentials"
            })
        }
        // check if password is correct
        if(!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({
                message: "Invalid User Credentials"
            })
        }
        // generate a token
        const token = jwt.sign({
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
        }, process.env.SECRET_KEY, { expiresIn: '1h' })
        user.password = undefined;
        res.status(200).json({
            message: "User logged in successfully",
            token, 
            user
        })
    })
})

module.exports = router