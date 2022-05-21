const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    participants: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        required: true,
    }
}, {timestamps:true})

const conversation = mongoose.model("Conversation", conversationSchema)
module.exports = conversation