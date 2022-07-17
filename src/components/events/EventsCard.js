import React from 'react';
import { getDate } from '../utilities/Helpers';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import classes from '../../styles/events/EventsCard.module.css';


  

const EventsCard = ({evt, otherUser})=> {
    return (
        <div className={classes.eventComponent}>
            <div className={classes.eventHeader}>
                <div className={classes.userData}>
                    <div>
                        <IconButton sx={{ p: 0 }}>
                            <Avatar alt="user avatar" src={evt.createdBy.photo} sx={{ width: 56, height: 56 }}/>
                        </IconButton>
                    </div>
                    <div>
                        <Typography variant="h6">{evt.createdBy.name}</Typography>
                        <Typography>{getDate(evt.createdAt)}</Typography>
                    </div>
                </div>
            {!otherUser &&
                <div className={classes.eventActions}>
                    <div className={classes.updateEvent}>
                        <IconButton aria-label="edit">
                            <EditIcon />
                        </IconButton>
                    </div>
                    <div className={classes.deleteEvent}>
                        <IconButton aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </div>}
            </div>
            <div className={classes.eventDescription}>
                <div>Event Title:  {evt.name}</div>
                About Event:  {evt.description}
            </div>
            <div className={classes.eventComingDate}>
                <h6>comming at:</h6>
                <p>{getDate(evt.date)}</p>
            </div>
        </div>
    )
}

export default EventsCard