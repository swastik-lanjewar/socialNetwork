const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    participants: {
        type: Array,
        required: true,
    }
}, { timestamps: true })

conversationSchema.indexes({participants: 1}, {unique: false})

const conversation = mongoose.model("Conversation", conversationSchema)
module.exports = conversation