import React from 'react';
import { limiTitle } from '../utilities/Helpers';
import { Avatar, IconButton } from '@mui/material';
// import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import StarIcon from '@mui/icons-material/Star';

import classes from '../../styles/room/RoomCard.module.css';

function RoomSpeakers({speaker}) {
    return (
        <div className={classes.user}>
            <Avatar
                alt="user avatar"
                src={speaker.photo}
                sx={{ width: 56, height: 56 }}
            />
            {speaker.isMuted && <IconButton aria-label='mic=off'>
                <MicOffIcon />
            </IconButton>}
            <div className={`${classes.userName} ${ !speaker.isAdmin && classes.speaker}`}>
                {speaker.isAdmin && <StarIcon />}
                 <div>
                    {limiTitle(speaker.name)}
                </div>
                {!speaker.isAdmin && <div className={classes.userRole}>speaker</div>}
            </div>
        </div>
    )
}

export default RoomSpeakers