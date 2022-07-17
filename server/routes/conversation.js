const router = require("express").Router()
const jwt = require("jsonwebtoken")
const Conversation = require("../models/conversation")
const jwtAuth = require("../middleware/jwtAuth")

// create a new conversation
router.post("/", jwtAuth, async (req, res) => {
    if (req.user) {
        try {
            // check there is a conversation with the same participants
            const duplicateConversation = await Conversation.findOne({
                participants: {
                    $all: [req.user.id, ...req.body.participants]
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
                participants: [req.user.id, ...req.body.participants]
            })
            await newConversation.save()
            return res.status(201).json({
                message: "Conversation created successfully",
                conversation: newConversation
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
})

// get conversation of a user by id
router.get("/", jwtAuth, async (req, res) => {
    if (req.user) {
        try {
            // get all conversations of the user
            const conversations = await Conversation.find({
                participants: {
                    $all: [req.user.id]
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
    }
})
 
// DELETE a conversation 
router.delete("/:id", jwtAuth, async (req, res) => {
    if (req.user) {
        try {
            // delete the conversation of the user by id 
            const conversation = await Conversation.findByIdAndDelete(req.params.id)
            return res.status(200).json({
                message: "Conversation deleted",
                conversation
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
})

module.exports = router