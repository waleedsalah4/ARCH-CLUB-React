import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchForPodcasts } from '../../store/reducers/SearchSlice';
import PodcastsCard from '../podcasts/PodcastsCard';
import FeedBack from '../utilities/FeedBack';
import Loader from '../utilities/Loader';
import classes from '../../styles/podcasts/Podcasts.module.css';

function SearchPodcasts({value}) {
    const dispatch = useDispatch();
    const {
        podcasts,
        isLoadingPodcasts,
        podcastsError,
    } = useSelector(state => state.SearchSlice)
    
    useEffect(() => {
        dispatch(searchForPodcasts({page: 1,value}))
    },[dispatch])
    return (
        <div className={classes.podcastscontainer}>
            {podcasts && podcasts.map(podcast => (
                <PodcastsCard key={podcast._id} podcast={podcast} otherUser={true} />
            ))}

            {isLoadingPodcasts && <Loader />}
           
            {podcasts.length ===0 && !isLoadingPodcasts && <p>There is no podcast with this name</p>}

            {podcastsError && <FeedBack openStatus={true} message={podcastsError} status='error' /> }
        </div>
    )
}

export default SearchPodcasts