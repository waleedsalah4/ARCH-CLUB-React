import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyEvents, getOtherUserEvents } from '../../store/reducers/profileEventsSlice';

import EventsCard from '../events/EventsCard';
import FeedBack from '../utilities/FeedBack';
import Loader from '../utilities/Loader';
import Button from '@mui/material/Button';

function ProfileEvents({otherUser, userData}) {
    const dispatch = useDispatch();
    const {events, profileEventsPage, isLoading, profileEventError, loadMoreVisible} = useSelector(state => state.profileEventsSlice)
    // console.log(events)
    useEffect(()=>{
        if(otherUser){
            dispatch(getOtherUserEvents({id: userData._id, page: 1}))
        } else {
            dispatch(getMyEvents(1))
        }
        console.log('useEffect runs')
    },[dispatch, otherUser,userData._id])

    const handleLoadMoreEvents = () => {
        if(otherUser){
            dispatch(getOtherUserEvents({id: userData._id, page: profileEventsPage}))
        } else {
            dispatch(getMyEvents(profileEventsPage))
        }
    }

    return (
        <>
            {events && events.map(event => (
                <EventsCard key={event._id} evt={event} otherUser={otherUser} />
            ))}
            {isLoading && <Loader />}
                {loadMoreVisible && <Button 
                    variant='contained'
                    sx={{mb: 1}}
                    onClick={handleLoadMoreEvents}
                >
                    Load More</Button>}
                {events.length ===0 && !isLoading && <p>There's no events yet</p>}

            {profileEventError && <FeedBack openStatus={true} message={profileEventError} status='error' /> }
        </>
    )
}

export default ProfileEvents