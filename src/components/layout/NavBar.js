import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import SearchBar from './SearchBar';

const drawerWidth = 240;


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}));



function NavBar(props) {
    const {open, handleDrawerOpen} = props;
    const userAvatar = JSON.parse(localStorage.getItem('user-data'))
    const navigate = useNavigate()
    return (
        <AppBar position="fixed"  open={open}>
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
                }}
            >
                <MenuIcon />
            </IconButton>

            <SearchBar />

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { 
                md: 'flex' } 
            }}>
              <IconButton sx={{ p: 0 }} onClick={() => navigate('/profile')}>
                <Avatar alt="user avatar" src={userAvatar.photo} />
              </IconButton>
          </Box>
            </Toolbar>
      </AppBar>
    )
}

export default NavBar