import React, {useState, useEffect} from "react";

const Chat = props =>{
    
    const [currentMessage, setCurrentMessage] = useState("");

    const handleChange = e =>{
        const {value} = e.target;
        setCurrentMessage(value);
    }

    const sendMessage = async() => {
        const messageData = {
            message: currentMessage,
            room: props.propRoom,
        }

        await props.propSocket.emit("send_message", messageData);
    };

    useEffect(() => {

        props.propSocket.on("recive_message", data => {
            console.log(data);
        })

    }, [props.propSocket])

    return (
        <div id="Chat">
            <h1>User: {props.propUser} has been successfully connected to a room: {props.propRoom}</h1>
            <input type="text" name="yourMessage" id="yourMessage" value={currentMessage} onChange={handleChange}/>
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}

export default Chat;