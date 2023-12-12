import React, {useState, useEffect} from "react";

const Chat = props =>{
    
    const [currentMessage, setCurrentMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const handleChange = e =>{
        const {value} = e.target;
        setCurrentMessage(value);
    }

    const sendMessage = async() => {
        const messageData = {
            message: currentMessage,
            room: props.propRoom,
        }

        setMessages(prevVal => {
            return [...prevVal, currentMessage];
        })

        await props.propSocket.emit("send_message", messageData);
    };

    useEffect(() => {

        props.propSocket.on("recive_message", data => {
            console.log(data);
            setMessages(prevVal => {
                return [...prevVal, data.message];
            })
        })

    }, [props.propSocket])

    return (
        <div id="Chat">
            <h1>User: {props.propUser} has been successfully connected to a room: {props.propRoom}</h1>
            <input type="text" name="yourMessage" id="yourMessage" value={currentMessage} onChange={handleChange}/>
            <button onClick={sendMessage}>Send</button>
            {messages.map(item => {
                return item;
            })}
        </div>
    )
}

export default Chat;