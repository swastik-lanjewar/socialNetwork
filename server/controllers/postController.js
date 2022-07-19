const Post = require("../models/post")
const Grid = require("gridfs-stream")
const mongoose = require("mongoose")


let gfs, gridfsBucket;
const conn = mongoose.connection
conn.once("open", () => {

    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "post_Image"
    })

    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection("post_Image")
})

const createPostController = async (req, res) => {
    if (req.user) {
        try {
            let postImageUrl = ""
            if (req.file) {
                postImageUrl = `https://letsbug-social-network.herokuapp.com/post/image/${req.file.filename}`
            }
            
            const post = await Post.create({
                ...req.body,
                image: postImageUrl
            })

            return res.status(201).json({
                message: "Post created successfully",
                post
            })
        } catch (error) {
            return res.status(500).json({
                error:error.message,
                message: "Internal server error"
            })
        }
    }
}

const streamPostImageController = async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename })
        if (!file) {
            return res.status(404).json({
                message: "No file found"
            })
        }
        const readstream = gridfsBucket.openDownloadStream(file._id)
        readstream.pipe(res)
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

const deletePostController = async (req, res) => { 
    if (req.user) {
        try {
            // check if the post has an image
            const post = await Post.findById(req.params.id)
            if (post.image !== "") {
                // find the file and delete it
                const file = await gfs.files.findOne({ filename: post.image.split("/").pop() })
                if (!file) {
                    return res.status(404).json({
                        message: "No file found"
                    })
                }
                // delete the profile picture from db
                await gridfsBucket.delete(file._id)
            }
            // delete the post
            await Post.findByIdAndDelete(req.params.id)
            return res.status(200).json({
                message: "Post deleted successfully"
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }
}

module.exports = {
    createPostController,
    streamPostImageController,
    deletePostController
}