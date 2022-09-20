import React, { useState } from 'react';
import { limiTitle } from '../utilities/Helpers';
import Avatar from '@mui/material/Avatar';
import MicOffIcon from '@mui/icons-material/MicOff';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';
import MiniModal from './MiniModal';
import classes from '../../styles/room/RoomCard.module.css';

function RoomSpeakers({speaker, state}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) =>{
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () =>{
        setAnchorEl(null)
    }

    return (
        <div className={classes.user}>
            <IconButton 
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Avatar
                    alt="user avatar"
                    src={speaker.photo}
                    sx={{ width: 56, height: 56 }}
                />
            </IconButton>
            
            {speaker.isMuted && <span className={classes.mic}>
                <MicOffIcon />
                </span>
            }
            <MiniModal 
                anchorEl={anchorEl} 
                open={open} 
                handleClose={handleClose} 
                type='speaker'
                isAdmin={state.isAdmin}
                userId={speaker._id}
            />
            <div className={`${classes.userName} ${ !speaker.isAdmin && classes.speaker}`}>
                {speaker.isAdmin && <StarIcon sx={{fontSize: '1rem'}} />}
                 <div>
                    {limiTitle(speaker.name)}
                </div>
                {!speaker.isAdmin && <div className={classes.userRole}>speaker</div>}
            </div>
        </div>
    )
}

export default RoomSpeakers