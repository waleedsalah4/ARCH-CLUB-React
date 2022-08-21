import React, { useState } from 'react';
import { Typography } from '@mui/material';
import RoomFooter from './RoomFooter';
import RoomSpeakers from './RoomSpeakers';
import RoomAudience from './RoomAudience';
import classes from '../../styles/room/RoomCard.module.css';

function RoomCard({room}) {
    const [state, setState] = useState({
        isAdmin: false,
        isSpeaker:true,
        isListener:false,
        isMuted: true,
        isAskedState: false
    })

    return (
        <div className={classes.page}>
            <div className={classes.house}>
                <div className={classes.screen}>
                    <main className={classes.roomsUsers}>
                        <div>
                            {/* <span id="recordRoom-span"></span> */}
                            <Typography variant='h6'>{room.name}</Typography>
                        </div>
                        <div className={classes.roomSpeakers}> 
                            {room.brodcasters.map(speaker => (
                                <RoomSpeakers key={speaker._id} speaker={speaker} />
                            ))}
                        </div>
                        <hr />
    
                        <div className={classes.roomListeners}>
                        {room.brodcasters.map(audience => (
                                <RoomAudience key={audience._id} audience={audience} />
                            ))}
                        </div>
                    </main> 
    
                    <RoomFooter state={state} />
                
                </div>
            </div>
        </div>
    )
}

export default RoomCard