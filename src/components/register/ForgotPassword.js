import React, { useRef } from 'react';
import RegisterCard from './RegisterCard';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

function ForgotPassword() {
    const emailInput = useRef()
    const handleSubmit = (event) => {
        event.preventDefault();
        let emailvalue = emailInput.current.value;
        console.log(emailvalue)
    }

  return (
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
            >
                Send Email
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
  )
}

export default ForgotPassword;