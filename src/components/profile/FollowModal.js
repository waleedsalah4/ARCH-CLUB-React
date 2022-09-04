import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyFollowers, getMyFollowing } from '../../store/reducers/FollowSlice';

import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import FeedBack from '../utilities/FeedBack';
import Loader from '../utilities/Loader';
import FollowersFollowing from './FollowersFollowing';
import classes from '../../styles/profile/FollowModal.module.css';




function FollowModal(props) {
    const dispatch = useDispatch();

    const FetchData = (text, data) => {
        switch (text){
            case 'myFollowers':
                dispatch(getMyFollowers(data.page))
                break;
    
            case 'myFollowing':
                dispatch(getMyFollowing(data.page))
                break;
    
            case 'userFollowers':
                console.log('userFollowers');
                break;
    
            case 'userFollowing':
                console.log('userFollowing');
                break;
    
            default:
                console.log('closeModal');                 
        }
    }

    const {followList,followPage,isLoading,followError,loadMoreVisible} = useSelector((state) => state.FollowSlice)
    console.log(followList)

    useEffect(()=>{
        FetchData(props.text,{page: 1});
        console.log('useEffect runs')
    },[])

    const fetchMoreData = () =>{
        FetchData(props.text,{page: followPage});
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
        </div>
    )
}

export default FollowModal