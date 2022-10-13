import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from "../../store/actions";
import { addMessage,removeMessage,getOldMassegs } from '../../store/reducers/roomChatSlice';
import { openModal } from '../../store/reducers/modalSlice';

import ChatBox from './ChatBox';
import Loader from '../utilities/Loader';
import FeedBack from '../utilities/FeedBack';

import { TextField, IconButton} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import classes from '../../styles/room/RoomChat.module.css';

function RoomChat({roomId, Me}) {
    const dispatch = useDispatch()
    const [message, setMessage] = useState('');
    const {roomMessages,isLoading,chatError,loadMoreVisible,currPage} = useSelector(state => state.roomChatSlice)
   
    useEffect(() => {
        dispatch(getOldMassegs({id: roomId, page: 1}))
    },[dispatch, roomId])
    useEffect(()=>{
        //Message Created Successfully User that Create the message will listen on
        socket.on("sendMessageSuccess", (messageData) => { 
            dispatch(addMessage(messageData))
        })
                
        //another user or users will listen on
        socket.on('message',(messageData) => {
            dispatch(addMessage(messageData))
        })   
        
        //Message Removed Successfully:
        //User that Remove his message will listen on
        socket.on('removeMessageSuccess',(messageData) => {
            dispatch(removeMessage(messageData))
            dispatch(openModal({name: 'Success', childrenProps:{
                message: 'message has been deleted successfully'
            }}))
        })
                
        //another user or users will listen on
        socket.on('messageRemoved',(messageData)=>{
            dispatch(removeMessage(messageData))
        })
        return () => {
            socket.off("sendMessageSuccess");
            socket.off("message");
            socket.off("removeMessageSuccess");
            socket.off("messageRemoved");
        };
    },[dispatch])

    const setRef = useCallback(node => {
        if (node) {
            node.scrollIntoView({ 
                behavior: "smooth",
                block: "end",
            })
        }
    }, [])

    const handleOnChange = (e) => {
        setMessage(e.target.value)
    }

    const handelSendMessage = (e) => {
        e.preventDefault();
        if(message !== ''){
            socket.emit("sendMessage", {
                status: 'public',
                message: message,
            })
        }
        setMessage('')
    }

    const loadMoreOldMessage = () =>{
        dispatch(getOldMassegs({id: roomId, page: currPage}))
    }
    
    
    return (
        <>
            <main>
                <div className={classes.chatBox}>
                    <div className={classes.load}>
                        {isLoading && <Loader />}
                        {loadMoreVisible && <IconButton onClick={loadMoreOldMessage}>
                                <ArrowUpwardIcon fontSize='small' />
                            </IconButton>
                        }
                        {roomMessages && roomMessages.length === 0 && <span>
                            no messages yet
                        </span>}
                    </div>
                    {roomMessages && roomMessages.map((msg, index) => {
                        const lastMessage = roomMessages.length - 1 === index
                        return(
                        <ChatBox 
                            key={msg._id} 
                            msg={msg} Me={Me} 
                            lastMessage={lastMessage} 
                            setRef={setRef} 
                        />
                    )})}
                </div>
                {chatError && <FeedBack openStatus={true} message={chatError} status='error' /> }
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