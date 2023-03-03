import React,{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getMyFollowingPodcasts } from '../../store/reducers/podcastsSlice';
import FeedBack from '../utilities/FeedBack';
import PodcastsCard from './PodcastsCard';
import Button from '@mui/material/Button';
import Loader from '../utilities/Loader';
import classes from '../../styles/podcasts/Podcasts.module.css';
function Podcasts() {
    const dispatch = useDispatch();
    const {podcasts, podsPage, isLoading, podsError, loadMoreVisible} = useSelector(state=> state.podcastsSlice);

    useEffect(()=> {
        dispatch(getMyFollowingPodcasts(1))
    },[dispatch])
    console.log('')

    const handleLoadMorePods = () => {
        dispatch(getMyFollowingPodcasts(podsPage))
    }
    return (
        <>
            <div className={classes.podcastscontainer}>
                {podcasts && podcasts.map(podcast => (
                    <PodcastsCard key={podcast._id} podcast={podcast} otherUser={true} />
                ))}
                {podcasts.length ===0 && !isLoading && <p>your following haven't uploaded any podcasts yet</p>}

                {podsError && <FeedBack openStatus={true} message={podsError} status='error' /> }
            </div>
            {isLoading && <Loader />}
            {loadMoreVisible && <Button 
                    variant='contained'
                    onClick={handleLoadMorePods}
                    sx={{marginTop: '1.5rem'}}
                >
                    Load More
                </Button>
            }
        
        </>
    )
}

export default Podcasts