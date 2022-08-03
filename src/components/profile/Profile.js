import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/reducers/modalSlice';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import logoImg from '../../assets/logo/ic_launcher_mdpi.png';
import userAvtar from '../../assets/avatar/avatar2.svg';

import classes from '../../styles/profile/Profile.module.css';
import ProfileTabs from './ProfileTabs';


function Profile() {
    const params = useParams();
    const isMe = params.id ? false : true;
    // console.log(isMe)
    const dispatch = useDispatch()
    const openEditModal = () => {
        dispatch(openModal({name: 'EditProfile'}))
    }
    return (
        <div className={classes.profileContainer}>
            <div className={classes.profile}>
                <div className={classes.header}>
                    <div className={classes.background}>
                        <img src={logoImg} alt='logo' />
                    </div>
                    <div className={classes.userInfo}>
                        <div className={classes.info}>
                            <div className={classes.userImg}>
                                <img src={userAvtar} alt="user avatar" className={classes.avatar} />
                            </div>
                            <div className={classes.controls}>
                                {isMe ? <Button variant='outlined' onClick={openEditModal}>Edit profile</Button> : <Button variant='outlined'>Following</Button>}
                            </div>
                        </div>
                        {/* <div className={classes.userName}>
                            waleed salah
                        </div> */}
                        <Typography variant='h6'>Waleed Salah</Typography>
                        <Typography variant='caption' className={classes.userBio}>
                            If you tell the truth, you don't have to remember anything
                        </Typography>
                        <div className={classes.follow}>
                            <div className={classes.followers}>
                                <span>2</span> followers
                            </div>
                            <div className={classes.following}>
                                <span>653</span> following
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.tabs}>
                    <ProfileTabs isMe={isMe} />
                </div>
            </div>
        </div>
    )
}

export default Profile