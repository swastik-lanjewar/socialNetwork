const router = require("express").Router()
const jwt = require("jsonwebtoken")

router.post("/upload", (req, res) => {
    // the request header has the token then we can verify it
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    // get the user if the user has valid token 
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        // find the user and update the profile picture url
        const user = await User.findById(decoded.id)
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        user.profilePicture = req.body.profilePicture
        await user.save()
    })
})



module.exports = router