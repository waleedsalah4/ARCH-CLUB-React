import React from 'react'
import EventsCard from './EventsCard';
// import Button from '@mui/material/Button';
import { eventsList } from '../dummyfile';
import classes from '../../styles/events/Events.module.css';

function Events() {
    return (
        <>
            {/* <div className={classes.createEvent}>
                <Button variant='outlined'>Create Event</Button>
            </div> */}
            <div className={classes.eventsContainer}>
                {eventsList && eventsList.map(evt => (
                    <EventsCard key={evt._id} evt={evt} otherUser={true} />
                ))}
                {eventsList.length ===0 && <p>There's no comming events for now</p>}
            </div>
        </>
    )
}

export default Events