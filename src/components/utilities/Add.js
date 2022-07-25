import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/reducers/modalSlice';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import Typography from '@mui/material/Typography';

const actions = [
  { 
    icon: <AddCircleOutlineOutlinedIcon />,
    name: 'CreateRoom', 
    componentName: {name:  'CreateRoom' }},
  { 
    icon: <MobileScreenShareIcon />, 
    name: 'JoinPrivateRoom',
    componentName: {name:  'JoinPrivateRoom' }
  },
  { 
    icon: <AddCircleOutlinedIcon />,
    name: 'AddPodcasts', 
    componentName: {name:  'UploadPodcast'}  
  },
  { 
    icon: <NoteAddOutlinedIcon />,
    name: 'AddEvent', 
    componentName: {
      name:  'CreateEvent',
      //add props to component igf you want =>
      childrenProps: {name: 'lol', email: 'lol@lol.com'}
    }
  },
];

export default function Add() {
  const dispatch = useDispatch()
  return (
    <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        // sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={<Typography variant='caption'>{action.name}</Typography>}
            tooltipOpen
            onClick={() => dispatch(openModal(action.componentName))}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
