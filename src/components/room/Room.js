import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeFixedModal } from '../../store/reducers/fixedModalSlice';
// import io from 'socket.io-client';
import { socket } from '../../store/actions';

import RoomCard from './RoomCard';
import MiniRoom from './MiniRoom';

// let passedSocket = null

export default function Room(props) {
  const dispatch = useDispatch()
  const [availableRoom, setAvailableRoom] = useState(null)
  const [collapse, setCollapse] = useState(true)
  const toggleCollapse = () => setCollapse(!collapse);

  // console.log('socket===>', socket)

  // passedSocket = socket;
  useEffect(()=>{
    console.log('useEffect runs!!')
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });

    
    socket.on('disconnect', (reason)=>{
      console.log(reason)
      dispatch(closeFixedModal())
      setAvailableRoom(null)
    })

    
    socket.on('createRoomSuccess', (user,room,token) => {
      console.log(user,room,token)
      setAvailableRoom(room)
    })

    socket.on('joinRoomSuccess', (user, room, token) => {
      console.log('join room',user,room,token)
      setAvailableRoom(room)
    })
    socket.on('userJoined', (user) => {
      console.log('userJoined', user)
    })

    socket.on('userLeft', (user) => {
      console.log('user left', user)
    })
    
    socket.on('userAskedForPerms', (user) => {
      console.log('userAskedForPerms', user) 
    })

    socket.on('userChangedToBrodcaster', (user)=> {
      console.log('user changed to Brodcaster', user)
    })

    socket.on('brodcasterToken', (token)=>{
      console.log('brodcaster token when user changed from aud to brod', token)
      //only for user who asked
    })

    socket.on('userChangedToAudience', (user)=>{
      console.log('user back to be aud', user)
    })

    socket.on('audienceToken', (token) => {
      console.log('aud token', token)
    }) // will be only for user ho return be an audience

    socket.on('adminReJoinedRoomSuccess', ()=>{
      console.log('admin is back') //on for me
    })

    socket.on('adminLeft', ()=>{
      console.log('admin left')
    })

    socket.on('roomEnded',()=>{
      console.log('room ended')
      setAvailableRoom(null)
    })

    // return () => socket.close()
  },[socket,dispatch])

  return (
    <>
      {availableRoom && <>
      <MiniRoom item={availableRoom} collapse={collapse} toggleCollapse={toggleCollapse} />
      <RoomCard 
        room={availableRoom} 
        collapse={collapse} 
        toggleCollapse={toggleCollapse} 
        socket={socket}
      />
      </>
      }
      tsts
    </>
  );
}


// export const createAfuckenRoom = (data) => {
//   console.log(data)
//   console.log(passedSocket)
// }