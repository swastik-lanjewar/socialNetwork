const router = require("express").Router()
const post = require("../models/post")
const jwt = require("jsonwebtoken")
//ROUTE IS /post/
// Create a new Post
router.post("/", (req, res) => {
    // check if the user has valid token
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => { 
        if (err) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        // if the user has valid token, create a new post
        const newPost = new post({
            title: req.body.title,
            content: req.body.content,
            userId: decoded.id
        })
        newPost.save().then(post => {
            res.status(200).json({
                message: "Post created",
                post: post
            })
        }).catch(err => {
            res.status(500).json({
                message: "Error creating post"
            })
        })
    })
   
}) 
// update the post
router.put("/:id", (req, res) => { 
    // check if the user has valid token
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => { 
        if (err) {
            return res.status(401).json({
                message: "Invalid token"
            })
        } else {
            post.findByIdAndUpdate(req.params.id, {
                $set: {
                    title: req.body.title,
                    content: req.body.content
                }
            }, {
                new: true
            }).then(post => {
                res.json(post)
            }).catch(err => {
                res.json({
                    message: err
                })
            })
        }
    })
   
})

// delete the post
router.delete("/:id", (req, res) => {
    // check if the user has valid token
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => { 
        if (err) {
            return res.status(401).json({
                message: "Invalid token"
            })
        } else {
            post.findByIdAndDelete(req.params.id).then(() => {
                res.json({
                    message: "Post deleted"
                })
            }).catch(err => {
                res.json({
                    message: err
                })
            })
        }
    })
   
})

// like the post
router.put("/like/:id", (req, res) => { 
    // check if the user has valid token
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => { 
        if (err) {
            return res.status(401).json({
                message: "Invalid token"
            })
        } else {
            post.findByIdAndUpdate(req.params.id, {
                $push: {
                    likes: decoded.id
                }
            }, {
                new: true
            }).then(post => {
                res.json(post)
            }).catch(err => {
                res.json({
                    message: err
                })
            })
        }
    })
   
})

// unlike the post
router.put("/unlike/:id", (req, res) => { 
    // check if the user has valid token
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => { 
        if (err) {
            return res.status(401).json({
                message: "Invalid token"
            })
        } else {
            post.findByIdAndUpdate(req.params.id, {
                $pull: {
                    likes: decoded.id
                }
            }, {
                new: true
            }).then(post => {
                res.json(post)
            }).catch(err => {
                res.json({
                    message: err
                })
            })
        }
    })
})

// get a users all posts
router.get("/", (req, res) => { 
    // check if the user has valid token
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => { 
        if (err) { 
            return res.status(401).json({
                message: "Invalid token"
            })
        } else {
            post.find({
                userId: decoded.id
            }).then(posts => { 
                res.json(posts)
            }).catch(err => { 
                res.json({
                    message: err
                })
            })
        }
    })
   
})

// get users timeline posts
router.get("/timeline", async (req, res) => {
})

module.exports = router