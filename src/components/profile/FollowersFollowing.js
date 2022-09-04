import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/reducers/modalSlice';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import classes from '../../styles/profile/FollowModal.module.css';

function FollowersFollowing({user}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const goTouserPage = () => {
        dispatch(closeModal())
        navigate(`/user-profile/${user._id}`)
    }
    return (
        <div className={classes.userContainer}>
            <div className={classes.userAvatar}>
                <Avatar 
                    alt='user avatar'
                    src={user.photo}
                    sx={{ width: 50, height: 50 }}
                    onClick={goTouserPage}
                />
                <div >
                    <ListItemText
                        primary={user.name}
                        secondary={`${user.followers >= 1? user.followers : '0'} follower`}        
                    />
                </div>
            </div>
            <div>
                <Button variant={user.isFollowed ? 'contained': 'outlined'}>
                    {user.isFollowed ? 'Following': 'Follow'}
                </Button>
            </div>
        </div>
    )
}

export default FollowersFollowing