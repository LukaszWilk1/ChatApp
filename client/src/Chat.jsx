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

        if(messageData.message!==""){
            await props.propSocket.emit("send_message", messageData);
            setMessages(prevVal => {
                return [messageData,...prevVal];
            })
        }

        setCurrentMessage("");
    };

    useEffect(() => {

        props.propSocket.on("recive_message", data => {
            setMessages(prevVal => {
                return [data, ...prevVal];
            })
        })

    }, [props.propSocket]);

    return (
        <div id="Chat" style={{height: "90vh"}} className="w-96 flex flex-col max-w-2xl bg-sky-900 items-center relative w-fit rounded-md px-2 pt-9 border border-lime-300">
            <h3 className="text-6xl color-lime-300 mb-9 text-center"> CHAT </h3>
            <hr className="w-full h-0.5 bg-lime-300 mb-2"/>
            <div style={{inlineSize: "280px", overflowWrap: "break-word"}} className="w-full h-full overflow-auto flex flex-col-reverse pr-2">
            {
            messages.map((item, index) => {
                return <li className="bg-sky-950 my-1 rounded-xl py-1 px-1" key={index}>{item.name} : {item.message}</li>
            })}
            </div>
            <div className="flex flex-row w-full my-4">
            <input type="text" name="yourMessage" id="yourMessage" value={currentMessage} onChange={handleChange} className="border border-lime-300 bg-sky-950 text-lime-300 px-2 py-1 focus:outline-none rounded-l-lg h-8 w-full"/>
            <button className="border-y border-r border-lime-300 bg-sky-900 font-bold rounded-r-lg px-6 hover:bg-lime-300 hover:text-sky-900 transition-colors h-8" onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default Chat;