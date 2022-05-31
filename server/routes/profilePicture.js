const router = require("express").Router()
const jwt = require("jsonwebtoken")
const upload = require("../middleware/upload")
const User = require("../models/user")
const Grid = require("gridfs-stream")
const mongoose = require("mongoose")


let gfs, gridfsBucket;
const conn = mongoose.connection
conn.once("open", () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "profile_Picture"
    })

    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection("profile_Picture")
})


router.post("/upload", upload.single("profilePicture"), (req, res) => {
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

        if (req.file === undefined) {
            return res.status(400).json({
                message: "No file uploaded"
            })
        }

        // const profilePictureUrl = `http://localhost:3000/profile-picture/${req.file.filename}`
        const profilePictureUrl = `https://letsbug-social-network.herokuapp.com/profile-picture/${req.file.filename}`
        // find the user and update the profile picture url 
        User.findByIdAndUpdate(decoded.id, {
            profilePicture: profilePictureUrl
        }, {
            new: true
        }).then(user => {
            return res.status(200).json({
                message: "Profile picture updated successfully",
                user
            })
        }).catch(err => {
            return res.status(500).json({
                message: "Internal server error"
            })
        })

    })
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
        console.log(error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})

// route for Deleting the profile picture
router.delete("/:filename", (req, res) => {
    if (!req.params.filename) {
        return res.status(400).json({
            message: "No file name provided"
        })
    }
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

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
            User.findByIdAndUpdate(decoded.id, {
                profilePicture: ""
            }, {
                new: true
            }).then(user => {
                return res.status(200).json({
                    message: "Profile picture deleted successfully",
                    user
                })
            }).catch(err => { 
                return res.status(500).json({
                    message: "Internal server error"
                })
            })

            
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Internal server error"
            })
        }
        
    })
})



module.exports = router