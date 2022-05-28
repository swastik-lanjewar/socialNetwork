require('dotenv').config()
const express = require("express")
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors")
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const conversationRoutes = require('./routes/conversation')
const messageRoutes = require('./routes/message')
const profilePictureRoute = require('./routes/profilePicture')

// app.use(cors({
//     origin: true,
//     credentials: true
// }))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// database configuration
const db = require("./config/db.config.js")
mongoose.connect(db.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("connected to mongodb"))
    .catch(err => console.log(err))

const http = require('http').Server(app)
const io = require('socket.io')(http)

let users = []
const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) && users.push({
        userId,
        socketId
    })
}
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}
const getUser = (userId) => {
    return users.find(user => user.userId === userId)
}


io.on("connection", (socket) => {

    console.log('a user connected')
    socket.on("addUser", ({userId}) => {
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    })


    socket.on('message', ({senderId, receiverId, message, time}) => {
        const user = getUser(receiverId)
        if(user){
            io.to(user.socketId).emit('message', {senderId, receiverId, message, time})
        }
    })

    socket.on('typing', ({senderId, receiverId, typing}) => {
        const user = getUser(receiverId)
        if (user) { 
            io.to(user.socketId).emit('typing', {senderId, receiverId, typing})
        }
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
        removeUser(socket.id)
        io.emit("getUsers", users)
    })
})

http.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})

// use the routes
app.get("/", (req, res) => {
    res.send("Hello World")
})
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/post', postRoutes)
app.use('/conversation', conversationRoutes)
app.use('/message', messageRoutes)
app.use('/profile-picture', profilePictureRoute)