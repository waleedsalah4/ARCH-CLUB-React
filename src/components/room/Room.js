import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeFixedModal } from '../../store/reducers/fixedModalSlice';
import { closeModal } from '../../store/reducers/modalSlice';
import { socket } from '../../store/actions';

import RoomCard from './RoomCard';
import MiniRoom from './MiniRoom';


export default function Room(props) {
  const dispatch = useDispatch()
  const [availableRoom, setAvailableRoom] = useState(null)
  const [state, setState] = useState({
    isAdmin: false,
    isSpeaker: false,
    isListener:false,
    isMuted: false,
    isAskedState: false
  })
  // const [me, setMe] = useState({})
  // let Me = {}

  const [collapse, setCollapse] = useState(true)

  const toggleCollapse = () => setCollapse(!collapse);

  // console.log('socket===>', socket)

  // passedSocket = socket;
  useEffect(()=>{
    let Me = {}
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
      user.isMuted = false;
      user.isAdmin = true;
      Me = {...user}
      room.brodcasters = [user]
      dispatch(closeModal())
      setState((prevState)=> ({
        ...prevState,
        isAdmin: true,
        isSpeaker: true
      }))
      setAvailableRoom(room)
      // setMe({...user})
    })

    socket.on('joinRoomSuccess', (user, room, token) => {
      // console.log('join room',user,room,token)
      // console.log('*************************')
      user.isMuted = false;
      user.isAdmin = false;
      room.admin.isAdmin = true;
      room.brodcasters = [room.admin,...room.brodcasters];
      room.brodcasters.map(bro => bro.isMuted = true);
      console.log('room => ',room)
      // setMe({...user})
      Me = {...user}
      setState((prevState)=> ({
        ...prevState,
        isListener: true,
      }))
      setAvailableRoom(room)
      // console.log('me => ',me)
    })

    socket.on('userJoined', (user) => {
      console.log('userJoined', user)
      user.isAsked = false;
      user.isMuted = false;
      setAvailableRoom(prevState => ({
        ...prevState,
        audience: [user,...prevState.audience]
      }))
      // console.log(availableRoom)
    })

    socket.on('userLeft', (user) => {
      console.log('user left', user)
      setAvailableRoom(prevState => ({
        ...prevState,
        audience: prevState.audience.filter(usr => usr._id !== user._id),
        brodcasters: prevState.brodcasters.filter(usr => usr._id !== user._id)
      }))
    })
    
    socket.on('userAskedForPerms', (user) => {
      console.log('userAskedForPerms', user) 
      setAvailableRoom(prevState => ({
        ...prevState,
        audience: prevState.audience.map(aud =>{
            if(aud._id === user._id){
              return {...aud, isAsked: !aud.isAsked}
            }
            return aud;
          })
      }))
    })

    socket.on('userChangedToBrodcaster', (user)=> {
      console.log('user changed to Brodcaster', user)
      user.isAsked = false;
      if(user._id === Me._id){
        setState((prevState)=> ({
          ...prevState,
          isListener: false,
          isSpeaker: true
        }))
      }
      setAvailableRoom(prevState => ({
        ...prevState,
        audience: prevState.audience.filter(usr => usr._id !== user._id),
        brodcasters: [...prevState.brodcasters,user]
      }))

      //change his role when adding agora
    })

    socket.on('brodcasterToken', (token)=>{
      console.log('brodcaster token when user changed from aud to brod', token)
      //only for user who asked
    })

    socket.on('userChangedToAudience', (user)=>{
      console.log('user back to be aud', user)
      if(user._id === Me._id){
        setState((prevState)=> ({
          ...prevState,
          isListener: true,
          isSpeaker: false,
          isMuted: false
        }))
      }
      setAvailableRoom(prevState => ({
        ...prevState,
        brodcasters: prevState.brodcasters.filter(usr => usr._id !== user._id),
        audience: [...prevState.audience,user]
      }))

      //change his role when adding agora
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

      //close modal
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('createRoomSuccess')
      socket.off('joinRoomSuccess')
      socket.off('userJoined')
      socket.off('userLeft')
      socket.off('userAskedForPerms')
      socket.off('userChangedToBrodcaster')
      socket.off('brodcasterToken')
      socket.off('userChangedToAudience')
      socket.off('audienceToken')
      socket.off('adminReJoinedRoomSuccess')
      socket.off('adminLeft')
      socket.off('roomEnded')
    }
  },[dispatch])

  console.log('room outside the of effect',availableRoom)

  return (
    <>
      {availableRoom && <>
      <MiniRoom item={availableRoom} collapse={collapse} toggleCollapse={toggleCollapse} />
      <RoomCard 
        room={availableRoom} 
        collapse={collapse} 
        toggleCollapse={toggleCollapse} 
        socket={socket}
        state={state}
      />
      </>
      }
    </>
  );
}


// export const createAfuckenRoom = (data) => {
//   console.log(data)
//   console.log(passedSocket)
// }