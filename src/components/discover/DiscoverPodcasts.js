import React,{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getAllPodcasts } from '../../store/reducers/discoverPodcastsSlice';
import PodcastsCard from '../podcasts/PodcastsCard';
import FeedBack from '../utilities/FeedBack';
import Button from '@mui/material/Button';
import Loader from '../utilities/Loader';

const DiscoverPodcasts = () => {
    const dispatch = useDispatch();
    const {discoverPodcasts,discoverPodsPage, isLoading, disPodError,loadMoreVisible} = useSelector(state => state.discoverPodcastsSlice)

    useEffect(()=> {
        dispatch(getAllPodcasts(1))
    },[dispatch])


    const handleLoadMorePods = () => {
        dispatch(getAllPodcasts(discoverPodsPage))
    }

    return (
        <>
            {discoverPodcasts && discoverPodcasts.map(podcast => (
                <PodcastsCard key={podcast._id} podcast={podcast} otherUser={true} />
            ))}
           {isLoading && <Loader />}
                {loadMoreVisible && <Button 
                    variant='contained'
                    onClick={handleLoadMorePods}
                >
                    Load More</Button>}
                {discoverPodcasts.length ===0 && !isLoading && <p>There's podcasts to discover</p>}

            {disPodError && <FeedBack openStatus={true} message={disPodError} status='error' /> }
        </>
    )
}

export default DiscoverPodcasts;