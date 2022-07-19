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

module.exports = streamPostImageController