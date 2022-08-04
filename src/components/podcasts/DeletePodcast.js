import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/reducers/modalSlice';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function DeletePodcast(props) {
    const dispatch = useDispatch()

    const deletePodcast = () => {
        console.log(props.name)
        //disptch delete action
    }
    const cancelDelete = () => {
        dispatch(closeModal())
    }

    return (
        <>
            <Typography variant='h6' gutterBottom>
                Are you sure want to this podcast ?
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
                        onClick={deletePodcast}
                        color='error'
                    >
                        Delete
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default DeletePodcast