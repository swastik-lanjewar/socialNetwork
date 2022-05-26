const router = require("express").Router()
const Message = require("../models/message")
const jwt = require("jsonwebtoken")

// POST /api/message
router.post("/", (req, res) => { 
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => { 
        if (err) { 
            return res.status(401).json({ message: "Unauthorized" })
        }
        const newMessage = new Message({
            conversationId: req.body.conversationId,
            sender: decoded.id,
            text: req.body.text
        })
        newMessage.save().then(message => {
            res.json(message)
        }).catch(err => {
            res.status(500).json(err)
        })
    })
})

// GET /api/message/:conversationId
router.get("/:conversationId", (req, res) => { 
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Unauthorized" })
        
        Message.find({conversationId: req.params.conversationId}).then(messages => {
            res.status(200).json({
                message: "messages fetched successfully",
                messages
            })
        }).catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    })
})


module.exports = router