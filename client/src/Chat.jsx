import React, {useState} from "react";

const Chat = props =>{
    
    const [currentMessage, setCurrentMessage] = useState("");

    const handleChange = e =>{
        const {value} = e.target;
        setCurrentMessage(value);
    }

    return (
        <div id="Chat">
            <h1>User: {props.propUser} has been successfully connected to a room: {props.propRoom}</h1>
            <input type="text" name="yourMessage" id="yourMessage" value={currentMessage} onChange={handleChange}/>
            <button>Send</button>
        </div>
    )
}

export default Chat;