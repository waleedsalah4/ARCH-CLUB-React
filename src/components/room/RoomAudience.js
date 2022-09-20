import React, { useState } from 'react';
import { limiTitle } from '../utilities/Helpers';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MiniModal from './MiniModal';
import PanToolIcon from '@mui/icons-material/PanTool';
import classes from '../../styles/room/RoomCard.module.css';

function RoomAudience({audience, state}) {

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
                    src={audience.photo}
                    sx={{ width: 56, height: 56 }}
                />
            </IconButton>
            
            {audience.isAsked && <span className={classes.requestHand}>
                <PanToolIcon />
            </span>
            }     
            <MiniModal 
                anchorEl={anchorEl} 
                open={open} 
                isAdmin={state.isAdmin}
                handleClose={handleClose} 
                type='audience'
                userId={audience._id}
            />
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