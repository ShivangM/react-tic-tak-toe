/*IMPORTS*/
import React, { useState, useEffect, useContext } from 'react'
import Input from './Input'
import Message from './Message'
import { UserContext } from "../../../UserContext"

const Chat = ({ socket, room_id }) => {

    const { user } = useContext(UserContext);
    //to store in input FORM
    const [message, setMessage] = useState('');
    //array to store message
    const [messages, setMessages] = useState([]);

    //function that sends message to server
    const sendMessage = (e) => {
        e.preventDefault();
        console.log(message);
        //emit messsage to sokcet server
        const msg = {
            message,
            name: user.name,
            user_id: user.id,
            room_id
        };

        // console.log(msg);
        socket.emit('sendMessage', msg);
        setMessage('')
    }

    useEffect(() => {
        socket.on('messageReceived', message => {
            setMessages(msgs => [...msgs, message]);
        });
    }, [])

    return (
        <div className='flex flex-col space-y-4 px-4 py-10'>
            <Message Messages={messages} user={user} />
            <Input
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
            />
        </div>
    )
}

export default Chat
