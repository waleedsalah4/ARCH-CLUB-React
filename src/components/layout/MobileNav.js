import React from 'react';
import SideBarListItems from './SideBarListItems';
import classes from '../../styles/Layout.module.css';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

function MobileNav({handleMobileViewClose}) {
    return (
        <div className={classes.mobileNav}>
            <SideBarListItems open={true}/>
            <div className={classes.closeMobileNav}>
                <IconButton aria-label='close' onClick={handleMobileViewClose}>
                    <Close />
                </IconButton>
            </div>
        </div>
    )
}

export default MobileNav