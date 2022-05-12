const user = require("../models/user.model")


exports.registerNewUser = async (req, res) => {
    try{
        console.log(isUser)
        if(ifUser.length >= 1){
            return res.status(409).json({
                message:"email already in use"
            })
        }

        const User = new user({
            username:req.body.user.username,
            email:req.body.user.email,
            password:req.body.user.password,
        })
        let response = await User.save()
        const token = User.generateAuthToken()
        res.status(201).json({response,token})
    }catch(err){
        res.status(400).json({err:err})
    }
}
exports.loginUser = async (req, res) => {

}
exports.getUserDetails = async (req, res) => {

}