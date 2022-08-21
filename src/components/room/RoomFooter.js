import React from 'react';

import { IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PanToolIcon from '@mui/icons-material/PanTool';

import classes from '../../styles/room/RoomCard.module.css';

function RoomFooter({state}) {
    return (
        <footer>
            <div className={classes.btOptions}>
                {state.isAdmin ? 
                    <button className={classes.allCenter}>
                        <span>✌️</span>
                        <span>End Room</span>
                    </button> :
                    
                    <button className={classes.allCenter}>
                        <span>✌️</span>
                        <span>Leave quietly</span>
                    </button>
                    }
                <div>
                    {state.isSpeaker && state.isMuted && <IconButton aria-label='mic-off'>
                            <MicOffIcon />
                        </IconButton>
                    } 
                    
                    {state.isSpeaker && !state.isMuted && <IconButton aria-label='mic-on'>
                            <MicIcon />
                        </IconButton>
                    }
                    
                    {state.isListener && !state.isAdmin && <IconButton aria-label='hand'>
                        <PanToolIcon />
                    </IconButton>}
                    {!state.isAdmin && !state.isListener && <IconButton aria-label='go-back'>
                        <ArrowDownwardIcon />
                    </IconButton>}
                </div>
            </div> 
        </footer>
    )
}

export default RoomFooter