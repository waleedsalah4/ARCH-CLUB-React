import React from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../store/actions';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function MiniModal(props) {
    const {anchorEl,open, handleClose, type,isAdmin, userId,typeAdmin} = props;
    const navigate = useNavigate()
    const changeUserToSpeaker = () => {
        // console.log('changeUserToSpeaker')
        socket.emit('givePermsTo', {
            _id: userId // user id 
        })
        handleClose()
    }
    const changeUserToListener = () => {
        // console.log('changeUserToListener')
        socket.emit('takeAwayPermsFrom', {
            _id: userId  // id for user who you want to change
        })
        handleClose()
    }

    const goUserProfile = () => {
        navigate(`/user-profile/${userId}`)
    }

    return (
        <div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={goUserProfile}>Profile</MenuItem>
                {isAdmin && type === 'audience' ? <MenuItem onClick={changeUserToSpeaker}>
                         change to speaker
                    </MenuItem> : ''}
                {isAdmin && type !== 'audience' && !typeAdmin ? <MenuItem onClick={changeUserToListener}>
                        change to audience
                    </MenuItem> : ''}
                
            </Menu>
        </div>
    );
}
