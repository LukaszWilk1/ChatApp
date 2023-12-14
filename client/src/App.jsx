import { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat.jsx";
import "./style.css";

const socket = io.connect("http://localhost:3001");

function App() {

  const [room, setRoom] = useState({
    userName: "",
    roomName: "",
  });

  const [isIn, setIsIn] = useState(false);

  const handleChange = e =>{
    const {name, value} = e.target;
    setRoom(prevVal => {
      return {
         ...prevVal,
         [name]: value,
      }
    });
  };

  const joinRoom = () => {
    if(room.userName!=="" && room.roomName!==""){
      socket.emit("join_room", room);
      setIsIn(true);
    }
  };

  return isIn ? (
      <Chat propSocket={socket} propUser = {room.userName} propRoom = {room.roomName}/>
  ) : (
    <div class="flex flex-col max-w-2xl bg-sky-900 items-center relative w-fit rounded-md px-7 py-9 shadow-2xl shadow-lime-300/50 border border-lime-300">
      <h1 class="text-6xl color-lime-300 mb-9">JOIN TO THE ROOM</h1>
      <input class="w-full my-2 bg-sky-950 text-lime-300 px-2 py-1 rounded-lg outline-1 focus:outline-lime-300" onChange={handleChange} type="text" name="userName" id="yourName" placeholder="Your Name" value={room.userName}/>
      <input class="w-full my-2 bg-sky-950 text-lime-300 px-2 py-1 rounded-lg outline-1 focus:outline-lime-300" onChange={handleChange} type="text" name="roomName" id="roomName" placeholder="Room Id" value={room.roomName}/>
      <button class="mt-9 border border-lime-300 bg-sky-900 font-bold rounded-lg px-6 py-1.5 hover:bg-lime-300 hover:text-sky-900 transition-colors" onClick={joinRoom}>SEND</button>
    </div>
  )
}

export default App;
