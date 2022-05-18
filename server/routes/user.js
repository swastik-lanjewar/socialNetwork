const router = require("express").Router()
// const user = require("../models/user")
// const jwt = require("jsonwebtoken")

router.get("/", (req, res) => {
    res.json({
        message: "Hello World"
    })
})


module.exports = router