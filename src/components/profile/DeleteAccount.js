import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeModal } from '../../store/reducers/modalSlice';
import { deleteAccount } from '../../store/reducers/profileSlice';
import {loggingOut} from '../utilities/Helpers';
import FeedBack from '../utilities/FeedBack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function DeleteAcount() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {deleteError,deleteLoading} = useSelector(state => state.profileSlice)

    const handleDeleteAcount = () => {
        dispatch(deleteAccount()).then(res=>{
            if(res.meta.requestStatus === "fulfilled"){
                loggingOut()
                navigate('/')
            }
        })
    }
    const cancelDelete = () => {
        dispatch(closeModal())
    }
    return (
        <>
        {deleteError && <FeedBack openStatus={true} message={deleteError} status='error' /> }
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
                        onClick={handleDeleteAcount}
                        color='error'
                        disabled={deleteLoading}
                    >
                        {deleteLoading ? 'Deleting' : 'Delete'}
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default DeleteAcount