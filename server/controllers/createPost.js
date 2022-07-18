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

module.exports = createPostController