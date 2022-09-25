import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { followUser, unFollowUser } from '../../store/reducers/FollowUsersSlice';

import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import classes from '../../styles/discover/Discover.module.css';

function UsersCard({user}) {
    
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const goToUserPage = (id) => {
        navigate(`/user-profile/${id}`)
    }

    const handleFollowUser = (user) => {
        if(user.isFollowed){
            dispatch(unFollowUser({id: user._id,type: 'discover' }))
        } else{
            dispatch(followUser({id: user._id,type: 'discover' }))
        }
    }

    return (
        <div className={classes.userContainer}>
            <div className={classes.userAvatar}>
                <Avatar 
                    alt='user avatar'
                    src={user.photo}
                    sx={{ width: 50, height: 50, cursor: 'pointer'}}
                    onClick={() =>goToUserPage(user._id)}
                />
                <div className={classes.userName}>
                    <ListItemText
                        primary={user.name}
                        onClick ={()=> goToUserPage(user._id)}
                        secondary={`${user.followers >= 1? user.followers : '0'} follower`}
                        
                    />
                </div>
            </div>
            <div>
                <Button 
                    variant={user.isFollowed ? 'contained': 'outlined'}
                    onClick={()=> handleFollowUser(user)}
                >
                    {user.isFollowed ? 'Following': 'Follow'}
                </Button>
            </div>
        </div>
    )
}

export default UsersCard