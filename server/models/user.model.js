const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        unique:true,
        type:String
    },
    email:{
        unique:true,
        type:String
    },
    password:String,

})

const user = mongoose.model("User", userSchema)
module.exports = user