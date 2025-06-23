import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { WebSocketServer } from "ws"
import http from "http"

const app = express()
const port = process.env.PORT

const whiteListedPaths = [process.env.FRONTEND_URL, process.env.DEPLOYMENT_FRONTEND_URL]

app.use(bodyParser.json())
app.use(cors({
    origin(requestOrigin, callback) {
        if (whiteListedPaths.indexOf(requestOrigin) != -1) {
            callback(null, true)
        } else {
            callback(new Error('requested path is protected by CORS'))
        }
    },
}))

app.get('/', (_, res) => {
    res.status(200).json("Welcome to the homepage!!")
})

// Creating a web socket connection
const httpServer = http.createServer(app)
const wss = new WebSocketServer({ server: httpServer })

wss.on('connection', (ws) => {
    ws.onopen = () => {console.log("New client connected successfully")}

    ws.onerror = (err) => { console.error(err) }

    ws.onmessage = (msg) => {
        wss.clients.forEach((client) => {
            if(client !== ws && client.readyState == WebSocket.OPEN){
                client.send(msg.data)
            }
        })
    }

    ws.onclose = () => console.log("Socket connection closed")
})

httpServer.listen(port, () => {
    console.log(`HTTP and WebSocket server running on port ${port}`);
});