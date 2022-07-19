const router = require("express").Router()
const Message = require("../models/message")
const jwtAuth = require("../middleware/jwtAuth")

// POST /api/message
router.post("/", jwtAuth, async (req, res) => { 
    if (req.user) {
        try {
            const newMessage = new Message({
                conversationId: req.body.conversationId,
                sender: req.user.id,
                text: req.body.text
            })
            await newMessage.save()
            return res.status(201).json({
                message: "Message created successfully",
                message: newMessage
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
})

// GET /api/message/:conversationId
router.get("/:conversationId", jwtAuth, async (req, res) => { 
    if (req.user) {
        try {
            const messages = await Message.find({conversationId: req.params.conversationId})
            return res.status(200).json({
                message: "messages fetched successfully",
                messages
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
})

module.exports = router