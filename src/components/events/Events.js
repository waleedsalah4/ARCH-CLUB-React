import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyFollowingEvents } from '../../store/reducers/eventsSlice';
import EventsCard from './EventsCard';
import Button from '@mui/material/Button';
import FeedBack from '../utilities/FeedBack';
import Loader from '../utilities/Loader';
import classes from '../../styles/events/Events.module.css';

function Events() {
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getMyFollowingEvents(1))

    },[])
    
    const {isLoading, events,eventPage, eventError, loadMoreVisible} = useSelector(state => state.eventsSlice)


    const handleLoadMoreEvents = () => {
        dispatch(getMyFollowingEvents(eventPage))
    }

    return (
        <>
            <div className={classes.eventsContainer}>
                {events && events.map(evt => (
                    <EventsCard key={evt._id} evt={evt} otherUser={true} />
                ))}
                {isLoading && <Loader />}
                {loadMoreVisible && <Button 
                    variant='contained'
                    onClick={handleLoadMoreEvents}
                >
                    Load More</Button>}
                {events.length ===0 && !isLoading && <p>There's no comming events for now</p>}
            </div>

            {eventError && <FeedBack openStatus={true} message={eventError} status='error' /> }
        </>
    )
}

export default Events