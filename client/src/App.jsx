import { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat.jsx";

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
    <div>
      <h1>Join a chat</h1>
      <input onChange={handleChange} type="text" name="userName" id="yourName" placeholder="Your Name" value={room.userName}/>
      <input onChange={handleChange} type="text" name="roomName" id="roomName" placeholder="Room Id" value={room.roomName}/>
      <button onClick={joinRoom}>Send</button>
    </div>
  )
}

export default App;
