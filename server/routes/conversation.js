const router = require("express").Router()
const jwt = require("jsonwebtoken")
const Conversation = require("../models/conversation")
// create a new conversation
router.post("/", (req, res) => {
    // check if the user has a valid token 
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Unthorized Access"
            })
        }
        
        try {
         
            // check there is a conversation with the same participants
            const duplicateConversation = await Conversation.findOne({
                participants: {
                    $all: [decoded.id, ...req.body.participants]
                }
            })
            if (duplicateConversation) {
                return res.status(400).json({
                    message: "Conversation already exists"
                })
            }

            // if there is no conversation with the  same participants
            // create a new conversation
            const newConversation = await new Conversation({
                participants: [decoded.id, ...req.body.participants]                
            })

            await newConversation.save()

            return res.status(201).json({
                message: "Conversation created successfully",
                conversation: newConversation
            })

        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    })
})

// get convesation of a user by id
router.get("/", (req, res) => {
    // check if the user has a valid token 
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Unthorized Access"
            })
        }
        
        try {
            // get all conversations of the user
            const conversations = await Conversation.find({
                participants: {
                    $all: [decoded.id]
                }
            })
            return res.status(200).json({
                message: "Conversations retrieved successfully",
                conversations
            })
            
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error"
            })
        }
    })
})

// DELETE a conversation 
router.delete("/:id", (req, res) => { 
    // check if the user has a valid token 
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Unthorized Access"
            })
        }
        // delete the conversation of the user by id 
        Conversation.findByIdAndDelete(req.params.id).then(conversation => {
            return res.status(200).json({
                message: "Conversation deleted",
                conversation
            })
        }).catch(err => {
            res.status(501).json({
                message: "Cannot delete conversation"
            })
        })
    })
})


module.exports = router