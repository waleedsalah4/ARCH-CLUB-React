import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/reducers/modalSlice';
import { Button, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import classes from '../../styles/utilities/Success.module.css';

function Success({message}) {
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        dispatch(closeModal())
    }
    return (
        <div className={classes.success}>
            <div className={classes.iconColor}>
                <CheckCircleIcon className={classes.icon} />

            </div>
            <Typography variant='p'>{message}</Typography>
            <Button 
                variant='contained' 
                size="medium"
                onClick={handleCloseModal}
            >
                Ok
            </Button>
        </div>
    )
}

export default Success