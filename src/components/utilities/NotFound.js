import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import wow from '../../assets/notfound/wow.png'
import classes from '../../styles/utilities/NotFound.module.css';

function NotFound() {
    const navigate = useNavigate()
    const goHome = () =>{
        navigate('/home')
    }
    return (
        <div className={classes.container}>
            <div className={classes.header}>
                4
                <img src={wow} alt='wow emoji' className={classes.wowImg}/>
                4
            </div>
            <div>
                The page you were looking for doesn't exist.
            </div>
            <div className={classes.line}>
                --------
            </div>
            <div>
                Let's get you back
            </div>
            <div className={classes.line}>
                ------
            </div>
            <div>
                <Button 
                    variant='contained'
                    onClick={goHome}
                >
                    back to home
                </Button>
            </div>
        </div>
    )
}

export default NotFound;