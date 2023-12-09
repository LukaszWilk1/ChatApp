import express from "express";
import {Server} from "socket.io";
import cors from "cors";
import http from "http";

const app = express();
app.use(cors());

const port = 3001;

const httpServer = http.createServer(app);
/*
const io = new Server(httpServer, () => {
    cors: {
        origin: "http://localhost:3000",
        methods:  ["GET", "POST"],
    },
})
*/

const io = new Server(httpServer);

io.on("connection", socket=>{
    console.log(`User connected on ${socket.id}`)
    client.on("disconnect", ()=>{
        console.log(`User disconnected on ${socket.id}`)
    })
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);;
})