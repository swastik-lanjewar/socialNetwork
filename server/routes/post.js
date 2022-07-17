const router = require("express").Router()
const Post = require("../models/post")
const User = require("../models/user")
const jwtAuth = require("../middleware/jwtAuth")
//ROUTE IS /post/

// Create a new Post
router.post("/", jwtAuth, async (req, res) => {
    if (req.user) {
        try {
            const newPost = new Post(req.body)
            await newPost.save()
            return res.status(201).json({
                message: "Post created successfully",
                post: newPost
            })
        } catch (error) {
            return res.status(500).json({
                message: "Error creating post"
            })
        }
    }
})

// update the post
router.put("/:id", jwtAuth, async (req, res) => {
    if (req.user) {
        try {
            const post = await Post.findByIdAndUpdate(req.params.id, {
                $set: {
                    title: req.body.title,
                    content: req.body.content
                }
            }, {
                new: true
            })
            return res.status(200).json({
                message: "Post updated successfully",
                post
            })
        } catch (error) {
            return res.status(500).json({
                message: "Error updating post"
            })
        }
    }
})

// delete the post
router.delete("/:id", jwtAuth, async (req, res) => {
    if (req.user) {
        try {
            await Post.findByIdAndDelete(req.params.id)
            return res.status(200).json({
                message: "Post deleted successfully"
            })
        } catch (error) {
            return res.status(500).json({
                message: "Error deleting post"
            })
        }
    }
})

// like the post
router.put("/like/:id", jwtAuth, async (req, res) => {
    if (req.user) {
        try {
            const post = await Post.findByIdAndUpdate(req.params.id, {
                $push: {
                    likes: req.user.id
                }
            }, {
                new: true
            })
            return res.status(200).json({
                message: "Post liked",
                post
            })
        } catch (error) {
            return res.status(500).json({
                message: "Error liking post"
            })
        }
    }
})

// unlike the post
router.put("/unlike/:id", jwtAuth, async (req, res) => {
    if (req.user) {
        try {
            const post = await Post.findByIdAndUpdate(req.params.id, {
                $pull: {
                    likes: req.user.id
                }
            }, {
                new: true
            })
            return res.status(200).json({
                message: "Post disliked",
                post
            })
        } catch (error) {
            return res.status(500).json({
                message: "Error disliking post"
            })
        }
    }
})

// get a users all posts
router.get("/", jwtAuth, async (req, res) => {
    if (req.user) {
        try {
            const posts = await Post.find({userId: req.user.id})
            return res.status(200).json({
                message: "Posts fetched",
                posts
            })
        } catch (error) {
            return res.status(500).json({
                message: "Error fetching posts"
            })
        }
    }
})

// get users timeline posts
router.get("/timeline", jwtAuth, async (req, res) => {
    if (req.user) {
        try {
            const user = await User.findById(req.user.id)
            const posts = await Post.find({
                userId: {
                    $in: user.connections
                }
            })
            res.status(200).json({
                message: "Posts fetched",
                timeline: posts
            })
        } catch (error) {
            return res.status(500).json({
                message: "Error fetching posts"
            })
        }
    }
})

module.exports = router