import React,{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getMyFollowingPodcasts } from '../../store/reducers/podcastsSlice';
import FeedBack from '../utilities/FeedBack';
import PodcastsCard from './PodcastsCard';
import Button from '@mui/material/Button';
import classes from '../../styles/podcasts/Podcasts.module.css';
function Podcasts() {
    const dispatch = useDispatch();
    const {podcasts, podsPage, isLoading, podsError, loadMoreVisible} = useSelector(state=> state.podcastsSlice);

    useEffect(()=> {
        dispatch(getMyFollowingPodcasts(1))
        // console.log('useEffect runs')
    },[dispatch])


    const handleLoadMorePods = () => {
        dispatch(getMyFollowingPodcasts(podsPage))
    }
    return (
        <div className={classes.podcastscontainer}>
            {podcasts && podcasts.map(podcast => (
                <PodcastsCard key={podcast._id} podcast={podcast} otherUser={true} />
            ))}
            {isLoading && <div>Loading...</div>}
                {loadMoreVisible && <Button 
                    variant='contained'
                    onClick={handleLoadMorePods}
                >
                    Load More</Button>}
                {podcasts.length ===0 && !isLoading && <p>your following haven't uploaded any podcasts yet</p>}

            {podsError && <FeedBack openStatus={true} message={podsError} status='error' /> }
        </div>
    )
}

export default Podcasts