const multer = require('multer')

const { GridFsStorage } = require('multer-gridfs-storage')

const storage = new GridFsStorage({
    url: process.env.MONGODB_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.includes(file.mimetype) === -1) {
            const fileName = `${Date.now()}_${file.originalname}`;
            return fileName
        }
        return {
            bucketName: 'profile_Picture',
            filename: `${Date.now()}_${file.originalname}`
        }
    }
})

module.exports = multer({ storage }) 