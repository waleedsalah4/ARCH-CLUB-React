import React from 'react';
import { useDispatch } from 'react-redux';
import { closeFixedModal } from '../../store/reducers/fixedModalSlice';
// import {roomList} from '../dummyfile';
import RoomCard from './RoomCard';
import { IconButton } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

// const room = roomList[1];

export default function Room({item}) {
  const dispatch = useDispatch()
  const handleClose = () => dispatch(closeFixedModal());

  return (
    <>
      <IconButton 
        aria-label='close' 
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton> 
      <RoomCard room={item} />
    </>
  );
}
