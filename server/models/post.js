const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    tags: {
        type: [String],
        default: []
    },
    image: {
        type: String,
        default: "",
    },
    content: {
        type: String,
        required: true,
        maxlength: 1000,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
    location: {
        type: String,
    },
}, {timestamps:true})

const post = mongoose.model("Post", postSchema)
module.exports = post