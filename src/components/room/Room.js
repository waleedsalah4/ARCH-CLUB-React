import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeFixedModal } from "../../store/reducers/fixedModalSlice";
import { closeModal } from "../../store/reducers/modalSlice";
import { socket } from "../../store/actions";
import FeedBack from '../utilities/FeedBack';
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

let Me = {};
export default function Room(props) {
  const dispatch = useDispatch();
  const [availableRoom, setAvailableRoom] = useState(null);
  // const [Me, setMe] = setState({})
  const [state, setState] = useState({
    isAdmin: false,
    isSpeaker: false,
    isListener: false,
    isMuted: false,
    isAskedState: false,
    isRecording: false,
  });
  const [msg, setMsg] = useState({})
  const [collapse, setCollapse] = useState(true);

  const toggleCollapse = () => setCollapse(!collapse);

  useEffect(() => {
    
    let roomInfo = {};
    let timerCounter = 0;

    let handleUserPublished = async(user, mediaType) => {
      const id = user.uid;
      remoteUsers[id] = user;
      //-------------
      console.log("<============ userJoined ======>");
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
      console.log("AudioTracks ======>", audioTracks);
      console.log("Successfully subscribed.");

      //-----------
      setAvailableRoom((prevState) => ({
        ...prevState,
        brodcasters:  prevState.brodcasters.map(usr => {
          if(usr.uid === user.uid){
            // user.isMuted = evt._audio_muted_;
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
        // console.log(AgoraRTC);
        localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        await client.publish(Object.values(localTracks));
        audioTracks.push(localTracks.audioTrack.getMediaStreamTrack());
        if (ac.state === "suspended") {
            ac.resume();
        }
        console.log('if host add audio track', audioTracks)
      }
    
      client.on("user-published", handleUserPublished);
      client.on("user-left", handleUserLeft);
      client.on("user-mute-updated", function (evt) {
        console.log("mute audio:=====>", evt);
      });
    
      client.on("user-unpublished", function (evt) {
        console.log('user un published ====>', evt)
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
        // console.log(volumes)
        volumes.forEach(volume => {
          if(volume.level > 15){
            // console.log('if ==> runs')
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
            // console.log('else if ==> runs')
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
      // await client.leave();

      leave();
      console.log('roomInfo==>',roomInfo)
      join(roomInfo.appid, token, roomInfo.channelName, roomInfo.uid);
    };


    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });

    socket.on("errorMessage", (msg) => {
      console.log(msg);
      // handleErrorMsg(msg)
    });

    socket.on("disconnect", async (reason) => {
      console.log(reason);
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
            console.log("please check your internet connection");
          }
        }, 3000);
      } else if (reason.includes("io server disconnect")) {
        leave();
        dispatch(closeFixedModal());
        setAvailableRoom(null);
      } else {
        console.log(reason);
        leave();
        dispatch(closeFixedModal());
        setAvailableRoom(null);
      }
    });

    socket.on("createRoomSuccess", async(user, room, token) => {
      console.log(user, room, token);
      user.isMuted = false;
      user.isAdmin = true;
      user.isTalking = false;
      Me = { ...user };
      // roomInfo = {...room}
      room.brodcasters = [user];
      dispatch(closeModal());
      setState((prevState) => ({
        ...prevState,
        isAdmin: true,
        isSpeaker: true,
        isRecording: room.isRecording,
      }));
      setAvailableRoom(room);
      // setMe({...user})

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
      console.log("room => ", room);
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
      console.log("userJoined", user);
      user.isAsked = false;
      user.isMuted = false;
      setAvailableRoom((prevState) => ({
        ...prevState,
        audience: [user, ...prevState.audience],
      }));
    });

    socket.on("userLeft", (user) => {
      console.log("user left", user);
      setAvailableRoom((prevState) => ({
        ...prevState,
        audience: prevState.audience.filter((usr) => usr._id !== user._id),
        brodcasters: prevState.brodcasters.filter(
          (usr) => usr._id !== user._id
        ),
      }));
    });

    socket.on("userAskedForPerms", (user) => {
      console.log("userAskedForPerms", user);
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
      console.log("user changed to Brodcaster", user);
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

      //change his role when adding agora
      if (user._id === Me._id) {
        agoraState.role = "host";
        console.log("host===================>");
      }
      // user._id === Me._id ? agoraState.role = 'host' : '';
    });

    socket.on("brodcasterToken", async (token) => {
      // console.log('brodcaster token when user changed from aud to brod', token)
      //only for user who asked

      await changeRole(token);
    });

    socket.on("userChangedToAudience", (user) => {
      console.log("user back to be aud", user);
      if (user._id === Me._id) {
        setState((prevState) => ({
          ...prevState,
          isListener: true,
          isSpeaker: false,
          isMuted: false,
        }));
      }
      setAvailableRoom((prevState) => ({
        ...prevState,
        brodcasters: prevState.brodcasters.filter(
          (usr) => usr._id !== user._id
        ),
        audience: [...prevState.audience, user],
      }));

      //change his role when adding agora
      if (user._id === Me._id) {
        agoraState.role = "audience";
      }
    });

    socket.on("audienceToken", async (token) => {
      // console.log('aud token', token)

      await changeRole(token);
    }); // will be only for user ho return be an audience

    socket.on("adminReJoinedRoomSuccess", async(user, room,token) => {
      console.log("admin is back");
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
      console.log("admin left");
    });

    socket.on("roomEnded", () => {
      console.log("room ended");
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

  // console.log("room outside the of effect", availableRoom);

  const handleErrorMsg = (msg) => {
    if(msg.includes("tried to join room twice")){
      setMsg({type: 'error', msg : 'tried to join room twice'});
    }
    if(msg.includes('You are already in room')){
      setMsg({type: 'error', msg: 'You are already in room'})
    }
    if(msg.includes("active room you created")){
      setMsg({type: 'error', msg: 'cannot do this action because there is an active room you created'});
    }
    if(msg.includes("Duplicate field value")){
      setMsg({type: 'error', msg: 'there is an active room with this name please check different name'} );
    }
    if(msg.includes("not found")){
      setMsg({type: 'error',msg:'there is no room with this id'});
    }
    if(msg.includes("Invalid input data")){
      setMsg({type: 'error',msg:'Invalid input data. Name must be en-US alphanumeric'});
    }  
    
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

      {/* {msg && <FeedBack openStatus={true} message={msg.msg} status={msg.type}/>} */}
    </>
  );
}

// export const createAfuckenRoom = (data) => {
//   console.log(data)
//   console.log(passedSocket)
// }
