const router = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post('/create-account', (req, res) => {
    const { name, username, email, password } = req.body;
    const newUser = new User({
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
        }, process.env.SECRET_KEY, { expiresIn: '24h' })
        user.password = undefined;
        res.status(200).json({
            message: "User created successfully",
            token,
            user
        })

    }).catch(err => {
        // error of duplicate email 
        if (err.code === 11000) {
            if (err.errmsg.includes("email")) {
                res.status(400).json({
                    message: "Email already exists"
                })
            } else if (err.errmsg.includes("username")) {
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

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
        if (!user) {
            throw new Error("Email not found")
        }
        // check if password is correct
        if (!bcrypt.compareSync(password, user.password)) {
            throw new Error("Password did not match")
        }
        // generate a token
        const token = jwt.sign({
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
        }, process.env.SECRET_KEY, { expiresIn: '24h' })

        user.password = undefined
        
        res.status(200).json({
            message: "User logged in successfully",
            token,
            user
        })

    } catch (err) {
        res.status(400).json({message:err.message})
    }

})

module.exports = router