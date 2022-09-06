import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../../store/reducers/modalSlice';
import { deleteEvent } from '../../store/reducers/profileEventsSlice';
import FeedBack from '../utilities/FeedBack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function DeleteEvent(props) {
    const dispatch = useDispatch()
    const {deleteError, deleteLoading} = useSelector(state => state.profileEventsSlice)

    const handleDeleteEvent = () => {
        dispatch(deleteEvent(props._id)).then((results)=>{
            if(results.payload.result.status === 'success'){
                dispatch(openModal({name: 'Success', childrenProps:{
                    message: 'Podcast has been deleted successfully'
                }}))
            }
        })
    }
    const cancelDelete = () => {
        dispatch(closeModal())
    }

    return (
        <>
            <Typography variant='h6' gutterBottom>
                Are you sure want to this Event ?
            </Typography>
            <Grid container>
                <Grid item xs={6}>
                    <Button 
                        variant='contained' 
                        onClick={cancelDelete}
                    >
                        Cancel
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button 
                        variant='contained'
                        onClick={handleDeleteEvent}
                        color='error'
                        disabled={deleteLoading}
                    >
                        {deleteLoading ? 'Deleting' : 'Delete'}
                    </Button>
                </Grid>
            </Grid>

            {deleteError && <FeedBack openStatus={true} message={deleteError} status='error' /> }
        </>
    )
}

export default DeleteEvent