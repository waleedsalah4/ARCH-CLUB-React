import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../store/reducers/forgotPasswordSlice';

import RegisterCard from './RegisterCard';
import FeedBack from '../utilities/FeedBack';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function ForgotPassword() {
    const token = JSON.parse(localStorage.getItem('user-token') || false)
    const emailInput = useRef()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {emailSent, isLoading, forgotError} = useSelector((state)=> state.forgotSlice)
  // console.log(token)
    useEffect(()=> {
        if(token) {
            navigate('/home')
        }
    },[token,navigate])

    const handleSubmit = (event) => {
        event.preventDefault();
        let emailvalue = emailInput.current.value;
        dispatch(forgotPassword({email : emailvalue}))
    }

  return (
    <>
    <RegisterCard>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Forgot Password
        </Typography>
        <Typography style={{marginTop: '1rem'}}>
            Please enter your email address. You will receive a link to create a new password via email.
        </Typography>
        <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ mt: 3 }}
            style={{width: '100%'}}
        >
         
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField 
                        margin='normal'
                        name="email"
                        id="email"
                        label="Email Address"
                        type="email" 
                        required
                        fullWidth
                        inputRef={emailInput}
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
            >
                {isLoading ? 'Sending...' : 'Send Email'}
            </Button>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link to="/signin">
                        remmbered password? 
                    </Link>
                </Grid>
            </Grid>
      </Box>
    </RegisterCard>
    {forgotError && <FeedBack openStatus={true} message={forgotError} status='error' /> }
    {emailSent && <FeedBack openStatus={true} message={emailSent} status='success' /> }
    </>
  )
}

export default ForgotPassword;