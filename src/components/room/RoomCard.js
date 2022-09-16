import React, { useState } from 'react';
import { IconButton, Typography } from '@mui/material';
import RoomFooter from './RoomFooter';
import RoomSpeakers from './RoomSpeakers';
import RoomAudience from './RoomAudience';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import classes from '../../styles/room/RoomCard.module.css';

function RoomCard({room, collapse, toggleCollapse, socket}) {
    const [state, setState] = useState({
        isAdmin: false,
        isSpeaker:true,
        isListener:false,
        isMuted: true,
        isAskedState: false
    })

    return (
        <div className={`${!collapse && classes.displayHidden}`}>
            <div className={classes.page}>
                <div className={classes.house}>
                    <div className={classes.screen}>
                        <main className={classes.roomsUsers}>
                            <div className={classes.roomHeader}>
                                <Typography variant='h6'>
                                    {room.isRecording && <span className={classes.recordRoom}>🟢</span>}
                                    {room.name}
                                    </Typography>
                                <IconButton aria-label='collapse' onClick={toggleCollapse}>
                                    <KeyboardDoubleArrowDownIcon />
                                </IconButton>
                            </div>
                            <div className={classes.roomSpeakers}> 
                                <RoomSpeakers speaker={room.admin} />
                                {room.brodcasters.map(speaker => (
                                    <RoomSpeakers key={speaker._id} speaker={speaker} />
                                ))}
                            </div>
                            <hr />
        
                            <div className={classes.roomListeners}>
                            {room.audience.map(audience => (
                                    <RoomAudience key={audience._id} audience={audience} />
                                ))}
                            </div>
                        </main> 
        
                        <RoomFooter state={state} socket={socket} />
                    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomCard