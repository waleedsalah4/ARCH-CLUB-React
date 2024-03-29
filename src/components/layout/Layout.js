import React, { useState } from 'react';
import NavBar from './NavBar';
import { Outlet ,Navigate, useLocation} from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import FixedComponents from './FixedComponents';
import SideBarListItems from './SideBarListItems';
import { useMediaQuery } from '@mui/material';
import MobileNav from './MobileNav';
import classes from '../../styles/Layout.module.css';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


export default function Layout(props) {
  const theme = useTheme();
  const match = useMediaQuery('(min-width:600px)')
  let location = useLocation();
  const token = JSON.parse(localStorage.getItem('user-token') || false)
  const [open, setOpen] = useState(false);
  const [openMobileNav, setMobileNav] = useState(false)

  const handleDrawerOpen = () => {
    if(match){
      setOpen(true);
    } else {
      setMobileNav(true)
    }
  };

  const handleMobileViewClose = () => {
    setMobileNav(false);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
 
  return (
    <>
    {token ? <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavBar open={open} handleDrawerOpen={handleDrawerOpen}/>
      <Drawer variant="permanent" open={open} sx={{display: {xs:'none', sm: 'block'}}}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <SideBarListItems open={open}/>
        
      </Drawer>
      {openMobileNav && <MobileNav  handleMobileViewClose={handleMobileViewClose}/>}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} className={classes.main}>
        <DrawerHeader />
        <FixedComponents />
        <Outlet />

      </Box>
    </Box> : <Navigate to="/" state={{ from: location }} replace />}
    </>
  );
}
