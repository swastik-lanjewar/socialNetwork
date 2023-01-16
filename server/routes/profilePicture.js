const router = require("express").Router()
const upload = require("../middleware/upload")
const User = require("../models/user")
const Grid = require("gridfs-stream")
const mongoose = require("mongoose")
const jwtAuth = require("../middleware/jwtAuth")

let gfs, gridfsBucket;
const conn = mongoose.connection
conn.once("open", () => {

    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "profile_Picture"
    })

    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection("profile_Picture")
})

router.post("/upload", jwtAuth, upload.single("profilePicture"), async (req, res) => {
    if (req.user) {
        try {
            const profilePictureUrl = `http://localhost:3000/profile-picture/${req.file.filename}`
            const updatedProfile = await User.findByIdAndUpdate(req.user.id, {
                profilePicture: profilePictureUrl
            }, { new: true })
            const {
                password,
                updatedAt, 
                ...userData
            } = updatedProfile._doc
            return res.status(200).json({
                message: "Profile picture updated successfully",
                user:userData
            })

        } catch (error) {
            return res.status(500).json({
                message:"Internal server error"
            })
        }
    }
})

// route for streaming the profile picture 
router.get("/:filename", async (req, res) => {
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
})

// route for Deleting the profile picture
router.delete("/:filename", jwtAuth, async (req, res) => {
    if (req.user) {
        try {
            // find the file and delete it
            const file = await gfs.files.findOne({ filename: req.params.filename })
            if (!file) {
                return res.status(404).json({
                    message: "No file found"
                })
            }

            // delete the profile picture from db
            await gridfsBucket.delete(file._id)

            // find the user and update the profile picture url
            const deletedProfilePicture = await User.findByIdAndUpdate(req.user.id, {
                profilePicture: ""
            }, {
                new: true
            })

            const {
                password,
                updatedAt,
                ...userData
            } = deletedProfilePicture._doc

            return res.status(200).json({
                message: "Profile picture deleted successfully",
                user: userData
            })

        } catch (error) {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }
})

module.exports = router