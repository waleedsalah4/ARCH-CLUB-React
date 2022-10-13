import React,{ useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMe, getUser } from '../../store/reducers/profileSlice';

// import userAvtar from '../../assets/avatar/avatar2.svg';

import ProfileTabs from './ProfileTabs';
import ProfileHeader from './ProfileHeader';
import FeedBack from '../utilities/FeedBack';
import Loader from '../utilities/Loader';

import classes from '../../styles/profile/Profile.module.css';

function Profile() {
    const params = useParams();
    const navigate = useNavigate()
    const mydata= JSON.parse(localStorage.getItem('user-data'))
    let isMe = params.id ? false : true;
    const dispatch = useDispatch()
    const {userData, isLoading, profileError,
        followUserError} = useSelector(state=> state.profileSlice)
        
    useEffect(()=>{
        if( params.id && params.id === mydata._id){
            navigate('/profile')
        } else{
            if(isMe){
                dispatch(getMe())
            } else {
                dispatch(getUser(params.id))
            }
        }
    },[dispatch, params])

    return (
        <>
            {userData && !isLoading &&  <div className={classes.profileContainer}>
                <div className={classes.profile}>
                    <ProfileHeader userData={userData} isMe={isMe}  />
                    <div className={classes.tabs}>
                        <ProfileTabs isMe={isMe} userData={userData} />
                    </div>
                </div>
            </div>}
            {isLoading && <Loader />}
            {profileError && <FeedBack openStatus={true} message={profileError} status='error' /> }
            {followUserError && <FeedBack openStatus={true} message={followUserError} status='error' /> }
        </>
    )
}

export default Profile