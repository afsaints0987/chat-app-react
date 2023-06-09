const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const {createServer} = require('http')
const {Server} = require('socket.io')


const port = process.env.PORT || 5000

const app = express()

const httpServer = createServer(app)

app.use(cors({
    origin: true,
    credentials: true
}))

app.use(express.urlencoded({extended: false}))
app.use(express.json())


const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET','POST']
    }
})

app.get('/', (req, res) => {
    res.send('Hello from the Server')
})

io.on('connection', (socket) => {
    console.log(`A client is connected ${socket.id}`)

    socket.on('join', (userId) => {
        console.log("User joined:", userId)
    })

    socket.on("receive-message", (messageData) => {
        console.log("Received message:", messageData)
        socket.broadcast.emit("send-message", messageData)
    })

    socket.on("disconnect", () => {
        console.log(`A client is disconnected ${socket.id}`)
    })
})

httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

