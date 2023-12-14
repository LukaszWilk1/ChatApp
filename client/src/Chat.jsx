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
            name: props.propUser,
        }

        await props.propSocket.emit("send_message", messageData);
        if(messageData.message!==""){
            setMessages(prevVal => {
                return [...prevVal, messageData];
            })
        }

        setCurrentMessage("");
    };

    useEffect(() => {

        props.propSocket.on("recive_message", data => {
            setMessages(prevVal => {
                return [...prevVal, data];
            })
        })

    }, [props.propSocket]);

    return (
        <div id="Chat" style={{height: "90vh"}} class="w-96 flex flex-col max-w-2xl bg-sky-900 items-center relative w-fit rounded-md px-2 pt-9 border border-lime-300">
            <h3 class="text-6xl color-lime-300 mb-9 text-center"> CHAT </h3>
            <hr class="w-full h-0.5 bg-lime-300 mb-2"/>
            <div class="w-full h-full overflow-auto">
            {messages.map(item => {
                return <li>{item.name} : {item.message}</li>
            })}
            </div>
            <div class="flex flex-row w-full my-4">
            <input type="text" name="yourMessage" id="yourMessage" value={currentMessage} onChange={handleChange} class="border border-lime-300 bg-sky-950 text-lime-300 px-2 py-1 rounded-l-lg outline-1 focus:outline-lime-300 h-8 w-full"/>
            <button class="border-y border-r border-lime-300 bg-sky-900 font-bold rounded-r-lg px-6 hover:bg-lime-300 hover:text-sky-900 transition-colors h-8" onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default Chat;