const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username:{
        unique:true,
        type:String,
        required: true,
    },
    email:{
        unique:true,
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
        max: 500,
    },
    connections: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
    posts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Post",
        default: [],
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Post",
        default: [],
    }
}, {timestamps:true})

const user = mongoose.model("User", userSchema)
module.exports = user