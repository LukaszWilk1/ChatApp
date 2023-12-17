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

        let ammountIn;

        try {   
            ammountIn = io.sockets.adapter.rooms.get(arg.roomName).size
        } catch(err) {
            ammountIn = 0;
        }
        
        if(ammountIn<2){
            console.log(`User with id ${socket.id} joined room: ${arg.roomName}`);
            socket.emit("ammount", true, ()=>{});
            socket.join(arg.roomName);
        } else if(ammountIn>=2){
            socket.emit("ammount", false, ()=>{});
        }
    })

    socket.on("send_message", data => {
        console.log(data.room)
        socket.to(data.room).emit("recive_message", data);
    })

    socket.on("disconnect", ()=>{
        console.log(`User disconnected on ${socket.id}`)
    })
})

server.listen(port, ()=>{
    console.log(`server is running on port ${port}`);;
})