const multer = require('multer')
const jwt = require('jsonwebtoken')

const {GridFsStorage} = require('multer-gridfs-storage')

const storage = new GridFsStorage({
    url: process.env.mongodb_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => { 
        // check if user is logged in
        if (!req.headers.authorization) { 
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        // get the user if the user has valid token
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Unauthorized"
                })
            }

            const match = ["image/png", "image/jpeg"];
    
            if(match.includes(file.mimetype) === -1) {
                const fileName = `${Date.now()}_${file.originalname}`;
                return fileName
            }
            return {
                bucketName: 'profile_Picture',
                filename: `${Date.now()}_${file.originalname}`
            }

         })
    }
})

module.exports = multer({ storage })