import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeFixedModal } from "../../store/reducers/fixedModalSlice";
import { closeModal } from "../../store/reducers/modalSlice";
import { socket } from "../../store/actions";
import { Toast } from '../utilities/sweetAlert';
import AgoraRTC from "agora-rtc-sdk-ng";

import {
  client,
  ac,
  handleUserLeft,
  leave,
  agoraState,
  localTracks,
  audioTracks,
  remoteUsers,

  recording,
  sources,
  dest,
  toggleMic,
  startRecording,
  recorder,
} from "./agoraSetting";
import RoomCard from "./RoomCard";
import MiniRoom from "./MiniRoom";

import adminLeftAudio from '../../assets/audio/adminLeft.wav';
import userBecomeAudiencAudio from '../../assets/audio/userBecomeAudienc.wav';
import userBecomeSpeakerAudio from '../../assets/audio/userBecomeSpeaker.wav';
import userEnterAudio from '../../assets/audio/userEnter.wav';
import userLeftAudio from '../../assets/audio/userLeft.wav';


let Me = {};
let roomInfo = {};
export default function Room(props) {
  const dispatch = useDispatch();
  const [availableRoom, setAvailableRoom] = useState(null);
  const [state, setState] = useState({
    isAdmin: false,
    isSpeaker: false,
    isListener: false,
    isMuted: false,
    isAskedState: false,
    isRecording: false,
  });
  const [collapse, setCollapse] = useState(true);

  const toggleCollapse = () => setCollapse(!collapse);

  useEffect(() => {
    
    
    let timerCounter = 0;

    let handleUserPublished = async(user, mediaType) => {
      const id = user.uid;
      remoteUsers[id] = user;
      //-------------
      await client.subscribe(user, "audio");
      user.audioTrack.play();

      if (recording) {
        sources.push(
          ac.createMediaStreamSource(
            new MediaStream([user.audioTrack.getMediaStreamTrack()])
          )
        );
        sources[sources.length - 1].connect(dest);
      } else {
        audioTracks.push(user.audioTrack.getMediaStreamTrack());
      }
      

      //-----------
      setAvailableRoom((prevState) => ({
        ...prevState,
        brodcasters:  prevState.brodcasters.map(usr => {
          if(usr.uid === user.uid){
            return {...usr, isMuted: user._audio_muted_}
          }
          return usr
        })
      }))
      
    }

    let join = async (appid, token, channel, uid) => {
      // create Agora client
      roomInfo.channelName = channel;
      roomInfo.appid = appid;
      roomInfo.uid = uid;
    
      client.setClientRole(agoraState.role);
      client.enableAudioVolumeIndicator();
    
      await client.join(appid, channel, token, uid);
    
    
      // join the channel
      if (agoraState.role === "host") {
        // create local audio and video tracks
        localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        await client.publish(Object.values(localTracks));
        audioTracks.push(localTracks.audioTrack.getMediaStreamTrack());
        if (ac.state === "suspended") {
            ac.resume();
        }
      }
    
      client.on("user-published", handleUserPublished);
      client.on("user-left", handleUserLeft);
      client.on("user-mute-updated", function (evt) {
        // console.log("mute audio:=====>", evt);
      });
    
      client.on("user-unpublished", function (evt) {
        setAvailableRoom((prevState) => ({
          ...prevState,
          brodcasters:  prevState.brodcasters.map(user => {
            if(user.uid === evt.uid){
              // user.isMuted = evt._audio_muted_;
              return {...user, isMuted: evt._audio_muted_}
            }
            return user
          })
        }))
      });
    
      client.on("volume-indicator", (volumes) => {
        volumes.forEach(volume => {
          if(volume.level > 15){
            setAvailableRoom((prevState) => ({
              ...prevState,
              brodcasters: prevState.brodcasters.map((brod) => {
                if (brod.uid === volume.uid) {
                  return { ...brod, isTalking: true };
                }
                return brod;
              }),
            }));

          }
          else if(volume.level < 15){
            setAvailableRoom((prevState) => ({
              ...prevState,
              brodcasters: prevState.brodcasters.map((brod) => {
                if (brod.uid === volume.uid) {
                  return { ...brod, isTalking: false};
                }
                return brod;
              }),
            }));

          }
      })
        
      });
    };

   

    let changeRole = async (token) => {
      await client.leave();

      // leave();
      join(roomInfo.appid, token, roomInfo.channelName, roomInfo.uid);
    };


    socket.on("connect", () => {
    });

    socket.on("errorMessage", (msg) => {
      handleErrorMsg(msg)
    });

    socket.on("disconnect", async (reason) => {
      if (reason === "transport close" && state.isAdmin) {
        if (state.isRecording) {
          await recorder.stop();
        }
        leave();
        const reconnectTimer = setInterval(() => {
          if (socket.connected) {
            socket.emit("adminReJoinRoom");
            clearInterval(reconnectTimer);
            timerCounter = 0;
          } else {
            if (timerCounter >= 60) {
              dispatch(closeFixedModal());
            }
            timerCounter += 3;
            Toast.fire({
              icon: 'info',
              title: 'please check your internet connection'
            })
          }
        }, 3000);
      } else if (reason.includes("io server disconnect") || reason.includes("io client disconnect") ) {
        leave();
        dispatch(closeFixedModal());
        setAvailableRoom(null);
      } else {
        Toast.fire({
          icon: 'info',
          title: reason
        })
        leave();
        dispatch(closeFixedModal());
        setAvailableRoom(null);
      }
    });

    socket.on("createRoomSuccess", async(user, room, token) => {
      user.isMuted = false;
      user.isAdmin = true;
      user.isTalking = false;
      Me = { ...user };
      room.brodcasters = [user];
      dispatch(closeModal());
      setState((prevState) => ({
        ...prevState,
        isAdmin: true,
        isSpeaker: true,
        isRecording: room.isRecording,
      }));
      setAvailableRoom(room);

      agoraState.role = "host";
      await join(room.APP_ID, token, room.name, user.uid);
      if (room.isRecording) {
        startRecording(room.name);
      }
    });

    socket.on("joinRoomSuccess", (user, room, token) => {
      user.isMuted = false;
      user.isAdmin = false;
      room.admin.isAdmin = true;
      room.brodcasters = [room.admin, ...room.brodcasters];
      room.brodcasters.map(bro => bro.isMuted = true);
      Me = { ...user };
      if(room.status === 'private'){
        dispatch(closeModal());
      }
      // roomInfo = {...room}
      setState((prevState) => ({
        ...prevState,
        isListener: true,
      }));
      setAvailableRoom(room);
      //agora
      agoraState.role = "audience";
      join(room.APP_ID, token, room.name, user.uid);
    });

    socket.on("userJoined", (user) => {
      user.isAsked = false;
      user.isMuted = false;
      setAvailableRoom((prevState) => ({
        ...prevState,
        audience: [user, ...prevState.audience],
      }));
      playAudio(userEnterAudio)
    });

    socket.on("userLeft", (user) => {
      setAvailableRoom((prevState) => ({
        ...prevState,
        audience: prevState.audience.filter((usr) => usr._id !== user._id),
        brodcasters: prevState.brodcasters.filter(
          (usr) => usr._id !== user._id
        ),
      }));
      playAudio(userLeftAudio)
    });

    socket.on("userAskedForPerms", (user) => {
      setAvailableRoom((prevState) => ({
        ...prevState,
        audience: prevState.audience.map((aud) => {
          if (aud._id === user._id) {
            return { ...aud, isAsked: !aud.isAsked };
          }
          return aud;
        }),
      }));
    });

    socket.on("userChangedToBrodcaster", (user) => {
      user.isAsked = false;
      user.isMuted = false;
      user.isTalking = false;
      if (user._id === Me._id) {
        setState((prevState) => ({
          ...prevState,
          isListener: false,
          isSpeaker: true,
        }));
      }
      setAvailableRoom((prevState) => ({
        ...prevState,
        audience: prevState.audience.filter((usr) => usr._id !== user._id),
        brodcasters: [...prevState.brodcasters, user],
      }));
      playAudio(userBecomeSpeakerAudio)
      //change his role when adding agora
      if (user._id === Me._id) {
        agoraState.role = "host";
      }
    });

    socket.on("brodcasterToken", async (token) => {
      //only for user who asked

      await changeRole(token);
    });

    socket.on("userChangedToAudience", (user) => {
      if (user._id === Me._id) {
        setState((prevState) => ({
          ...prevState,
          isListener: true,
          isSpeaker: false,
          isMuted: false,
          isAskedState: false
        }));
      }
      setAvailableRoom((prevState) => ({
        ...prevState,
        brodcasters: prevState.brodcasters.filter(
          (usr) => usr._id !== user._id
        ),
        audience: [...prevState.audience, user],
      }));

      playAudio(userBecomeAudiencAudio)

      //change his role when adding agora
      if (user._id === Me._id) {
        agoraState.role = "audience";
      }
    });

    socket.on("audienceToken", async (token) => {

      await changeRole(token);
    }); // will be only for user ho return be an audience

    socket.on("adminReJoinedRoomSuccess", async(user, room,token) => {
      roomInfo = {...room}
      user.isMuted = state.isMuted;
      room.admin.isAdmin = true;
      room.brodcasters = [room.admin, ...room.brodcasters];
      room.brodcasters.map(bro => bro.isMuted = true);
      toggleMic(state.isMuted);
      setAvailableRoom(room)

        //agora
      agoraState.role = 'host';
      await join(room.APP_ID,token,room.name,user.uid)

      //record when rejoin
      let roomName = `${room.name}1`;
      if(room.isRecording) {
        startRecording(roomName) 
      }
    });

    socket.on("adminLeft", () => {
      playAudio(adminLeftAudio)
      Toast.fire({
        icon: 'info',
        title: 'admin left the room the room will be ended in one minute if add admin did not join back to room'
      })
    });

    socket.on("roomEnded", () => {
      Toast.fire({
        icon: 'info',
        title: 'room ended'
      })
      audioTracks = []
      leave();
      setAvailableRoom(null);

      //close modal
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("createRoomSuccess");
      socket.off("joinRoomSuccess");
      socket.off("userJoined");
      socket.off("userLeft");
      socket.off("userAskedForPerms");
      socket.off("userChangedToBrodcaster");
      socket.off("brodcasterToken");
      socket.off("userChangedToAudience");
      socket.off("audienceToken");
      socket.off("adminReJoinedRoomSuccess");
      socket.off("adminLeft");
      socket.off("roomEnded");
    };
  }, [dispatch, state.isAdmin,state.isMuted, state.isRecording]);

  const handleErrorMsg = (msg) => {
    if(msg.includes("tried to join room twice")){
      Toast.fire({
        icon: 'error',
        title: 'you tried to join room twice'
      })
    }
    else if(msg.includes('You are already in room')){
      Toast.fire({
        icon: 'error',
        title: 'You are already in room'
      })
    }
    else if(msg.includes("active room you created")){
      Toast.fire({
        icon: 'error',
        title: 'cannot do this action because there is an active room you created'
      })
    }
    else if(msg.includes("Duplicate field value")){
      Toast.fire({
        icon: 'error',
        title: 'there is an active room with this name please check different name'
      })
    }
    else if(msg.includes("not found")){
      Toast.fire({
        icon: 'error',
        title: 'there is no room with this id'
      })
    }
    else if(msg.includes("Invalid input data")){
      Toast.fire({
        icon: 'error',
        title: 'Invalid input data. Name must be en-US alphanumeric'
      })
    }  
    // else {
    //   Toast.fire({
    //     icon: 'error',
    //     title: msg
    //   })
    // } 
  }

  const playAudio = (src) =>{
    let audio = new Audio(src);
    audio.play();
    
  }
  return (
    <>
      {availableRoom && (
        <>
          <MiniRoom
            item={availableRoom}
            collapse={collapse}
            toggleCollapse={toggleCollapse}
          />
          <RoomCard
            room={availableRoom}
            setAvailableRoom={setAvailableRoom}
            collapse={collapse}
            toggleCollapse={toggleCollapse}
            socket={socket}
            state={state}
            setState={setState}
            Me={Me}
          />
        </>
      )}
    </>
  );
}
