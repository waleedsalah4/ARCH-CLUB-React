import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyPodcasts, getOtherUserPodcasts } from '../../store/reducers/profilePodcastsSlice';

import PodcastsCard from '../podcasts/PodcastsCard';
import FeedBack from '../utilities/FeedBack';
import Loader from '../utilities/Loader';
import Button from '@mui/material/Button';

function ProfilePodcasts({otherUser, userData}) {
    const dispatch = useDispatch();
    const {profilePodcasts, profilePodsPage, isLoading, profilePodError, loadMoreVisible} = useSelector(state => state.profilePodcastsSlice)

    useEffect(()=>{
        if(otherUser){
            dispatch(getOtherUserPodcasts({id: userData._id, page: 1}))
        } else {
            dispatch(getMyPodcasts(1))
        }
        // console.log('useEffect runs')
    },[dispatch, otherUser,userData._id])

    const handleLoadMorePods = () => {
        if(otherUser){
            dispatch(getOtherUserPodcasts({id: userData._id, page: profilePodsPage}))
        } else {
            dispatch(getMyPodcasts(profilePodsPage))
        }
    }

    return (
        <>
            {profilePodcasts && profilePodcasts.map(podcast => (
                <PodcastsCard key={podcast._id} podcast={podcast} otherUser={otherUser} />
            ))}
            {isLoading && <Loader />}
                {loadMoreVisible && <Button 
                    variant='contained'
                    sx={{mb: 1}}
                    onClick={handleLoadMorePods}
                >
                    Load More</Button>}
                {profilePodcasts.length ===0 && !isLoading && <p>There's no podcasts yet</p>}

            {profilePodError && <FeedBack openStatus={true} message={profilePodError} status='error' /> }
        </>
    )
}

export default ProfilePodcasts