const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const user = mongoose.model("User", userSchema)
module.exports = user