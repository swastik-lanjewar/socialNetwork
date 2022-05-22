const router = require("express").Router()
const jwt = require("jsonwebtoken")
const conversation = require("../models/conversation")
// create a new conversation
router.post("/", (req, res) => {
    // check if the user has a valid token 
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Unthorized Access"
            })
        }
        const newConversation = new conversation({ participants: [...req.body.participants, decoded.id] })
        newConversation.save().then(conversation => {
            res.status(200).json({
                message: "Conversation created",
                conversation: conversation
            })
        }).catch(err => { 
            console.log(err)
            res.status(500).json({
                message: "Error creating conversation"
            })
        })
    })
})

// get convesation of a user by id
router.get("/", (req, res) => {
    // check if the user has a valid token 
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Unthorized Access"
            })
        }
        // get the conversation of the user by id 
        conversation.find({
            participants: decoded.id
        }).then(conv => {
            return res.status(200).json({
                message: "Conversation retrieved",
                conversations: conv
            })
        }).catch(err => {
            res.status(501).json({
                message: "Cannot find conversation"
            })
        })

    })

})

module.exports = router