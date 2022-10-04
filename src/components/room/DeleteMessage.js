import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/reducers/modalSlice';
import { socket } from '../../store/actions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function DeleteMessage(props) {
    const dispatch = useDispatch();

    const handelDeleteMessage = () => {
        socket.emit('removeMessage',props.messageId)
        dispatch(closeModal())
    }
    const cancelDelete = () => {
        dispatch(closeModal())
    }

    return (
        <>
            <Typography variant='h6' gutterBottom>
                Are you sure want to this message ?
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
                        onClick={handelDeleteMessage}
                        color='error'
                    >
                        Delete
                    </Button>
                </Grid>
            </Grid>

        </>
    )
}

export default DeleteMessage;