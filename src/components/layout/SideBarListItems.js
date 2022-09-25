import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../../store/reducers/signSlice';
import { loggingOut } from '../utilities/Helpers';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import classes from '../../styles/Layout.module.css';


const menuItem = [
    {
        text: 'Home',
        icon: <HomeIcon />,
        path: '/home'
    },
    {
        text: 'Podcasts',
        icon: <PodcastsIcon />,
        path: '/podcasts'
    },
    {
        text: 'Discover',
        icon: <PersonSearchIcon />,
        path: '/discover'
    },
    {
        text: 'Events',
        icon: <EventIcon />,
        path: '/events'
    },
    {
        text: 'Profile',
        icon: <PersonIcon />,
        path: '/profile'
    },
   
]

function SideBarListItems({open}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userLeave = () => {
        dispatch(logOut())
        loggingOut()
        navigate('/')
    }

    return (
    <>
        <List>
          {menuItem.map((item) => (
            <ListItem 
              key={item.text} 
              disablePadding 
              sx={{ display: 'block' }}
              onClick={() => navigate(item.path)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} className={classes.listItem}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List style={{ marginTop: `auto` }}>
          <ListItem 
            disablePadding 
            sx={{ display: 'block' }} 
            onClick={userLeave}
          >
            <ListItemButton
                sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary='Logout' sx={{ opacity: open ? 1 : 0 }} className={classes.listItem}/>
            </ListItemButton>
          </ListItem>
        </List>
        {/* <Divider /> */}
    </>
  )
}

export default SideBarListItems