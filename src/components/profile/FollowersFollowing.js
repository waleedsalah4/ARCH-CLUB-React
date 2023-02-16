import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { followUser, unFollowUser } from '../../store/reducers/FollowUsersSlice';
import { closeModal } from '../../store/reducers/modalSlice';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import classes from '../../styles/profile/FollowModal.module.css';

function FollowersFollowing({user}) {
    const getMe = JSON.parse(localStorage.getItem('user-data') || false)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const goTouserPage = () => {
        dispatch(closeModal())
        navigate(`/user-profile/${user._id}`)
    }

    const handleFollowUser = () => {
        if(user.isFollowed){
            dispatch(unFollowUser({id: user._id,type: 'followModal' }))
        } else {
            dispatch(followUser({id: user._id,type: 'followModal' }))
        }
    }
    let userImg = user.photo.includes('herokuapp') ? 'https://audiocomms-podcast-api.onrender.com/img/users/default.jpg': user.photo;
   
    return (
        <div className={classes.userContainer}>
            <div className={classes.userAvatar}>
                <Avatar 
                    alt='user avatar'
                    src={userImg}
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
            {user._id !== getMe._id ? <div>
                <Button 
                    variant={user.isFollowed ? 'contained': 'outlined'}
                    onClick={handleFollowUser}
                    // disabled={followLoading}
                >
                    {user.isFollowed ? 'Following': 'Follow'}
                </Button>
            </div>: ''}
        </div>
    )
}

export default FollowersFollowing