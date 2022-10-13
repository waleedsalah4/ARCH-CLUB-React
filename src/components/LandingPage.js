import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Logo from './utilities/Logo';
import mainPageImg from '../assets/mainpage/undrawPodcastReWr88.svg';
import classes from '../styles/LandingPage.module.css';

export default function LandingPage() {

  // temp Auth
  const navigate = useNavigate()
  const token = JSON.parse(localStorage.getItem('user-token') || false)
  useEffect(()=> {
    if(token) {
      navigate('/home')
    }
  },[token,navigate])
  //************************* */
  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color='default'>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              
              <Logo />
            </Typography>
            <Link to='/signin' style={{textDecoration: 'none', marginRight: '0.5rem'}}>
              <Button variant='contained'>SignIn</Button>
            </Link>
            <Link to='signup' style={{textDecoration: 'none', marginRight: '0.5rem'}}>
              <Button variant='contained'>SignUp</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
      <Box component="main" sx={{ p: 1 }}>
        <Toolbar />
          <div className={classes.container}>
            <div className={classes.mainText}>
              <p>
                ClubCast is an audio communications and podcasts platform.<br />
                Join and create public and private recordable rooms.<br />
                Listen to your favourite podcasts everywhere and anytime.
              </p>

              <a 
                href="https://github.com/AhmedHamed-20/club_cast/releases/download/v1.2.2/app-armeabi-v7a-release.apk" 
                download="archclub" 
                className={`${classes.gradientButton} ${classes.gradientButtonEffect}`}>
                GET OUR APP
              </a>

            </div>
            <div className={classes.mainImg}>
              <img src={mainPageImg} alt='main pic' />
            </div>
          </div>
      </Box>
    </Box>

  );
}

