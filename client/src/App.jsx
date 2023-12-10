import { useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {

  const [room, setRoom] = useState({
    userName: "",
    roomName: "",
  });

  const handleChange = e =>{
    const {name, value} = e.target;
    setRoom(prevVal => {
      return {
         ...prevVal,
         [name]: value,
      }
    })
  }

  return (
    <div>
      <h1>Join a chat</h1>
      <input onChange={handleChange} type="text" name="userName" id="yourName" placeholder="Your Name" value={room.userName}/>
      <input onChange={handleChange} type="text" name="roomName" id="roomName" placeholder="Room Id" value={room.roomName}/>
    </div>
  );
}

export default App;
