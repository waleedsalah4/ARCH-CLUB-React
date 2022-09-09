import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyFollowers, getMyFollowing, getUserFollowers, getUserFollowing } from '../../store/reducers/FollowSlice';

import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import FeedBack from '../utilities/FeedBack';
import Loader from '../utilities/Loader';
import FollowersFollowing from './FollowersFollowing';
import classes from '../../styles/profile/FollowModal.module.css';




function FollowModal(props) {
    const dispatch = useDispatch();

    const FetchData = useCallback((text, data) => {
        switch (text){
            case 'myFollowers':
                dispatch(getMyFollowers(data.page))
                break;
    
            case 'myFollowing':
                dispatch(getMyFollowing(data.page))
                break;
    
            case 'userFollowers':
                // console.log(data)
                dispatch(getUserFollowers({id: data.id, page: data.page}))
                break;
    
            case 'userFollowing':
                dispatch(getUserFollowing({id: data.id, page: data.page}))
                break;
    
            default:
                console.log('closeModal');                 
        }
    },[dispatch])

    const {
        followList,followPage,isLoading,followError,loadMoreVisible,
        followUserError
    } = useSelector((state) => state.FollowSlice)

    // console.log(followList)

    useEffect(()=>{
        FetchData(props.text,{page: 1, id: props.id});
        // console.log('useEffect runs')
    },[FetchData,props.text,props.id])

    const fetchMoreData = () =>{
        FetchData(props.text,{page: followPage, id: props.id});
    }
    return (
        <div className={classes.followContainer}>
            <Typography variant='h5'>{props.type} list</Typography>

            {followList && followList.map(user=> (
                <FollowersFollowing 
                    key={user._id} 
                    user={user.follower ? user.follower : user.following} 
                />
            )) }
            
            {isLoading && <div className={classes.loader}><Loader /></div>}
            {loadMoreVisible && <Button 
                variant='contained'
                onClick={fetchMoreData}
            >
                Load More</Button>}
            {followList.length ===0 && !isLoading &&<p>you have no followers yet</p>}

            {followError && <FeedBack openStatus={true} message={followError} status='error' /> }
            {followUserError && <FeedBack openStatus={true} message={followUserError} status='error' /> }
        </div>

    )
}

export default FollowModal