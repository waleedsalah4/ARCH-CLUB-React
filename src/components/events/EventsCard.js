import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/reducers/modalSlice';

import { getDate } from '../utilities/Helpers';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import classes from '../../styles/events/EventsCard.module.css';


  

const EventsCard = ({evt, otherUser})=> {
    const dispatch = useDispatch()
    const handleEditModal = () => {
        dispatch(openModal({name: 'EditEvent', childrenProps:{
            event: evt
        }}))
    }

    const handleDeletePodcast = () => {
        dispatch(openModal({
            name: 'DeleteEvent',
            childrenProps: evt
        }))
    }

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
                        <Typography variant='caption'>{getDate(evt.createdAt)}</Typography>
                    </div>
                </div>
            {!otherUser &&
                <div className={classes.eventActions}>
                    <div className={classes.updateEvent}>
                        <IconButton aria-label="edit" onClick={handleEditModal}>
                            <EditIcon />
                        </IconButton>
                    </div>
                    <div className={classes.deleteEvent}>
                        <IconButton aria-label="delete" onClick={handleDeletePodcast}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </div>}
            </div>
            <div className={classes.eventDescription}>
                <div>
                    <Typography variant='p'>Event Title: </Typography>
                    <Typography variant='caption'> {evt.name}</Typography>
                </div>
                <div>
                    <Typography variant='p'>About Event:  </Typography>
                    <Typography variant='caption'> {evt.description}</Typography>
                </div> 
                
            </div>
            <div className={classes.eventComingDate}>
                <Typography variant='p' display='block'>comming at:</Typography>
                <Typography variant='caption'>{getDate(evt.date)}</Typography>
            </div>
        </div>
    )
}

export default EventsCard