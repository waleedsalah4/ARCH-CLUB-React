import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/reducers/modalSlice';
import { IconButton, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import classes from '../../styles/room/RoomChat.module.css';

function ChatBox(props) {
    const {msg, Me, lastMessage, setRef} = props;
    const dispatch = useDispatch()
    const handelDeleteMessage = (id) => {
        dispatch(openModal({
            name: 'DeleteMessage',
            childrenProps: {
                messageId: id
            }
        }))
    }
    return (
        <div 
            ref={lastMessage ? setRef : null}
            className={`${msg.user._id === Me._id ? classes.myMessage : classes.usersMessage}`}
            
        >
            <header className={classes.messageHeader}>
                <Link to='/home' className={classes.userName}>
                    <Typography variant='caption'>{msg.user.name}</Typography>
                </Link>
                {msg.user._id === Me._id ? <IconButton onClick={() => handelDeleteMessage(msg._id)}>
                    <CloseIcon fontSize='small' />
                </IconButton> : ''}
            </header>
            <Typography variant='caption'>
                {msg.message}
            </Typography>
        </div>
    )
}

export default ChatBox