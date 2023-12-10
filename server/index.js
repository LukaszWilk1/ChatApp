import express from "express";
import {Server} from "socket.io";
import cors from "cors";
import http from "http";

const app = express();
app.use(cors());

const port = 3001;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ['GET','POST']
    }
  })

io.on("connection", socket=>{
    console.log(`User connected on ${socket.id}`)
    socket.on("join_room", arg => {
        console.log(arg);
    })
    socket.on("disconnect", ()=>{
        console.log(`User disconnected on ${socket.id}`)
    })
})

server.listen(port, ()=>{
    console.log(`server is running on port ${port}`);;
})