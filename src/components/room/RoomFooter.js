import React from "react";
import { recorder, toggleMic } from "./agoraSetting";
import { Button, IconButton } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import PanToolIcon from "@mui/icons-material/PanTool";

import classes from "../../styles/room/RoomCard.module.css";
// import { useDispatch } from 'react-redux';
// import {closeFixedModal} from '../../store/reducers/fixedModalSlice';

function RoomFooter({ state, setState, socket, setAvailableRoom,Me }) {
  // const dispatch = useDispatch()
  // console.log("state =>", state);
  const handleLeaveroom = () => {
    socket.disconnect();
    // dispatch(closeFixedModal())
  };

  const handleEndroom = () => {
    if (state.isRecording) {
      recorder.stop();
    }
    // console.log('==>recordState====>',state.isRecording)
    socket.emit("endRoom");
  };

  const handleGoBack = () => {
    socket.emit("weHaveToGoBack"); //user want to go back to audience
  };
  const handleAskForPerms = () => {
    socket.emit("askForPerms");
  };
  const handleMute = () => {
    toggleMic(state.isMuted);
    setState((prevState) => ({
      ...prevState,
      isMuted: !state.isMuted,
    }));
    setAvailableRoom((prevState) => ({
      ...prevState,
      brodcasters:  prevState.brodcasters.map(brod => {
          if(brod._id === Me._id){
            return {...brod, isMuted: !brod.isMuted}
          }
          return brod
      })
    }))
  };

  // const changeMutestate = (obj) => {
  //     setAvailableRoom((prevState) => ({
  //         ...prevState,
  //         brodcasters:  prevState.brodcasters.map(user => {
  //             if(user.uid === obj.uid){
  //                 user.isMuted = obj._audio_muted_;
  //                 return {...user, isMuted: obj._audio_muted_}
  //             }
  //             return user
  //         })
  //     }))
  // }
  return (
    <footer>
      <div className={classes.btOptions}>
        {state.isAdmin ? (
          <Button
            variant="contained"
            className={classes.allCenter}
            onClick={handleEndroom}
          >
            <span>✌️</span>
            <span>End Room</span>
          </Button>
        ) : (
          <Button
            variant="contained"
            className={classes.allCenter}
            onClick={handleLeaveroom}
          >
            <span>✌️</span>
            <span>Leave quietly</span>
          </Button>
        )}
        <div>
          {state.isSpeaker && state.isMuted && (
            <IconButton aria-label="mic-off" onClick={handleMute}>
              <MicOffIcon />
            </IconButton>
          )}

          {state.isSpeaker && !state.isMuted && (
            <IconButton aria-label="mic-on" onClick={handleMute}>
              <MicIcon />
            </IconButton>
          )}

          {state.isListener && !state.isAdmin && (
            <IconButton aria-label="hand" onClick={handleAskForPerms}>
              <PanToolIcon />
            </IconButton>
          )}
          {!state.isAdmin && !state.isListener && (
            <IconButton aria-label="go-back" onClick={handleGoBack}>
              <ArrowDownwardIcon />
            </IconButton>
          )}
        </div>
      </div>
    </footer>
  );
}

export default RoomFooter;
