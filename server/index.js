require('dotenv').config()
const express = require("express")
const app = express();
const PORT = 3000 || process.env.PORT
const cors = require("cors")
const mongoose = require('mongoose')


const corsOptions = {
    origin:"https://localhost:8080/"
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// database configuration
// const db = require("./config/db.config.js")
// mongoose.connect(db.mongoURI, {
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
// })
// .then(()=>console.log("connected to mongodb"))
// .catch(err=>console.log(err))

// login route
app.get("/", (req, res) => {
    res.json({message:"hi"})
})

// create-account route
app.post("/", (req, res) =>{
    registerNewUser()
})
// dashboard

// chat


app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
    console.log(`https://localhost:3000`)
})