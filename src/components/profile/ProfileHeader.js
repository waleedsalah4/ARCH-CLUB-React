import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/reducers/modalSlice';
import { followUser, unFollowUser } from '../../store/reducers/FollowUsersSlice';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import logoImg from '../../assets/logo/ic_launcher_mdpi.png';
import classes from '../../styles/profile/Profile.module.css';

function ProfileHeader({userData, isMe}) {
    const dispatch = useDispatch()
    const openEditModal = () => {
        dispatch(openModal({
            name: 'EditProfile',
            childrenProps: {
                data: userData
            }
        }))
    }

    const openFollowersModal = () => {
        dispatch(openModal({
            name: 'FollowModal', 
            childrenProps: {
                text: isMe ? 'myFollowers': 'userFollowers',
                type: 'Followers',
                id: userData._id
            }
        }))
    }
    const openFollowingModal = () => {
        dispatch(openModal({
            name: 'FollowModal', 
            childrenProps: {
                text: isMe ? 'myFollowing': 'userFollowing',
                type: 'Following',
                id: userData._id
            }
        }))
    }
    const openPhotoModal = () => {
        dispatch(openModal({
            name: 'UpdatePhoto', 
            childrenProps: {
                pic: userData.photo
            }
        }))
    }

    const handleFollowUser = () => {
        if(userData.isFollowed){
            dispatch(unFollowUser({id: userData._id,type: 'userData' }))
        } else{
            dispatch(followUser({id: userData._id,type: 'userData' }))
        }
    }

    return (
        <div className={classes.header}>
            <div className={classes.background}>
                <img src={logoImg} alt='logo' />
            </div>
            <div className={classes.userInfo}>
                <div className={classes.info}>
                    <div className={classes.userImg}>
                        <div className={classes.avatar} >
                            <Avatar 
                                src={userData.photo} 
                                alt="user avatar" 
                                title='click to preview'
                                onClick={openPhotoModal}
                                sx={{ width: 70, height: 70 }}
                            />
                        </div>
                    </div>
                    <div className={classes.controls}>
                            {isMe ? <Button variant='outlined' onClick={openEditModal}>Edit profile</Button> : <Button 
                            variant={userData.isFollowed ? 'contained': 'outlined'}
                            // disabled={followUserLoading}
                            onClick={handleFollowUser}
                        >{userData.isFollowed ? 'Following' : 'Follow'}</Button>}
                    </div>
                </div>
                {/* <div className={classes.userName}>
                    waleed salah
                </div> */}
                <Typography variant='h6'>{userData.name}</Typography>
                <Typography variant='caption' className={classes.userBio}>
                    {userData.bio}
                </Typography>
                <div className={classes.follow}>
                    <div className={classes.followers} onClick={openFollowersModal}>
                        <span>{userData.followers}</span> followers
                    </div>
                    <div className={classes.following} onClick={openFollowingModal}>
                        <span>{userData.following}</span> following
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader