import React from 'react';
import { limiTitle } from '../utilities/Helpers';
import { Avatar, IconButton } from '@mui/material';

import PanToolIcon from '@mui/icons-material/PanTool';
import classes from '../../styles/room/RoomCard.module.css';

function RoomAudience({audience}) {
    return (
        <div className={classes.user}>
            <Avatar
                alt="user avatar"
                src={audience.photo}
                sx={{ width: 56, height: 56 }}
            />
            <span className={classes.RequestHand}>
            {audience.isAsked && <IconButton aria-label='hand'>
                    <PanToolIcon />
                </IconButton>
            }     
            </span>
            <div className={`${classes.userName} ${classes.listener}`}>
                <div>
                    {limiTitle(audience.name)}
                </div>
                <div className={classes.userRole}>listener</div>
            </div>
        </div>
    )
}

export default RoomAudience;