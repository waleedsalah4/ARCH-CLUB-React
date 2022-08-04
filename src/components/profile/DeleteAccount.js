import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/reducers/modalSlice';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function DeleteAcount() {
    const dispatch = useDispatch()

    const deleteAcount = () => {
        console.log('delete')
        //disptch delete action and path callback function
        //to forward user to landpage screen when deleting request is done
    }
    const cancelDelete = () => {
        dispatch(closeModal())
    }
    return (
        <>
            <Typography variant='h6' display='block'>
                Are you sure want to delete your acount ?
            </Typography>
            <Typography variant='caption' mb={2}>
                You will lose all your data if you decided to delete account 
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
                        onClick={deleteAcount}
                        color='error'
                    >
                        Delete
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default DeleteAcount