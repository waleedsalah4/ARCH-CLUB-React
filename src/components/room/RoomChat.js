import React, { useEffect, useState } from 'react';
import { socket } from "../../store/actions";
import { Link } from 'react-router-dom';
import { TextField, IconButton, Typography} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import classes from '../../styles/room/RoomChat.module.css';
// import {messages} from '../dummyfile';

function RoomChat({Me}) {
    const [message, setMessage] = useState('');
    const [roomMessages, setRoomMessages] = useState([]);

    useEffect(()=>{
        //Message Created Successfully User that Create the message will listen on
        socket.on("sendMessageSuccess", (messageData) => { 
            console.log('sendMessageSuccess')
            // console.log(messageData)
            messageData.isMe = true;
            setRoomMessages(roomMessages => [...roomMessages, messageData])
        })
                
        //another user or users will listen on
        socket.on('message',(messageData) => {
            messageData.isMe = false;
            setRoomMessages(roomMessages => [...roomMessages, messageData])
        })   
        
        //Message Removed Successfully:
        //User that Remove his message will listen on
        socket.on('removeMessageSuccess',(messageData) => {
            console.log(messageData) // ???????????
        })
                
        //another user or users will listen on
        socket.on('messageRemoved',(messageData)=>{
            console.log(messageData) // ???????????
        })
        return () => {
            socket.off("sendMessageSuccess");
            socket.off("message");
            socket.off("removeMessageSuccess");
            socket.off("messageRemoved");
        };
    },[])

    const handleOnChange = (e) => {
        setMessage(e.target.value)
    }

    const handelSendMessage = (e) => {
        e.preventDefault();
        if(message !== ''){
            // console.log(message)
            socket.emit("sendMessage", {
                status: 'public',
                message: message,
            })
        }
        setMessage('')
    }

    // console.log(roomMessages)
    return (
        <>
            <main>
                <div className={classes.chatBox}>
                    {roomMessages && roomMessages.map((msg) => (
                        <div 
                            className={`${msg.isMe ? classes.myMessage : classes.usersMessage}`}
                            key={msg._id}
                        >
                            <Link to='/home' className={classes.userName}>
                                <Typography variant='caption'>{msg.user.name}</Typography>
                            </Link>
                            <Typography variant='caption'>
                                {msg.message}
                            </Typography>
                        </div>
                    )) }
                </div>
            </main>
            <footer>
                <form onSubmit={handelSendMessage} className={classes.roomFooter}>
                    <TextField 
                        id="standard-basic" 
                        variant="standard" 
                        fullWidth
                        autoComplete='off'
                        placeholder='type message here'
                        value={message}
                        onChange={handleOnChange}
                    />
                    <IconButton type='submit'>
                        <SendIcon color='primary'/>
                    </IconButton>
                </form>
            </footer>
        </>
    )
}

export default RoomChat;


/**
{
    createdAt: "2022-10-02T12:06:29.159Z",
    message: "hi",
    room: {
        category: "ai"
        name: "test"
        _id: "633974cdabce330016ae9954"
    }
    status: "public",
    updatedAt: "2022-10-02T12:06:29.159Z",
    user: {
        name: "waleed salah",
        photo: "https://res.cloudinary.com/dnpol9y6s/image/upload/v1662582809/userPhotos/kxrhhoa5z7ppuuibg9ed.webp",
        uid: 1863996551,
        _id: "6231c44cd7a78d001683345b",
    }
    __v: 0,
    _id: "63397ec5abce330016ae99ab",
}

*/