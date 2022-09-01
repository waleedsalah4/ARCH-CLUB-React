import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/reducers/modalSlice';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import logoImg from '../../assets/logo/ic_launcher_mdpi.png';
import classes from '../../styles/profile/Profile.module.css';

function ProfileHeader({userData, isMe}) {
    const dispatch = useDispatch()
    const openEditModal = () => {
        dispatch(openModal({name: 'EditProfile'}))
    }

    const openFollowersModal = () => {
        dispatch(openModal({
            name: 'FollowModal', 
            childrenProps: {text: isMe ? 'myFollowers': 'userFollowers',
           type: 'Followers'}
        }))
    }
    const openFollowingModal = () => {
        dispatch(openModal({
            name: 'FollowModal', 
            childrenProps: {text: isMe ? 'myFollowing': 'userFollowing',
           type: 'Following'}
        }))
    }

    return (
        <div className={classes.header}>
            <div className={classes.background}>
                <img src={logoImg} alt='logo' />
            </div>
            <div className={classes.userInfo}>
                <div className={classes.info}>
                    <div className={classes.userImg}>
                        <img src={userData.photo} alt="user avatar" className={classes.avatar} />
                    </div>
                    <div className={classes.controls}>
                        {isMe ? <Button variant='outlined' onClick={openEditModal}>Edit profile</Button> : <Button variant='outlined'>Following</Button>}
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