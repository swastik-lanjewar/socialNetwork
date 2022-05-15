const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
    const io = req.app.get('socketio')
    io.on("connection", () => {
        io.emit("message", {hi:"hi"})
    })
    res.send("hi");
})

module.exports = router