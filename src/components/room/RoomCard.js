import React, { useState } from "react";
import { IconButton, Typography,Button } from "@mui/material";
import RoomFooter from "./RoomFooter";
import RoomSpeakers from "./RoomSpeakers";
import RoomAudience from "./RoomAudience";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import RoomChat from './RoomChat';
import classes from "../../styles/room/RoomCard.module.css";

function RoomCard(props) {
  const {
    room,
    collapse,
    toggleCollapse,
    socket,
    setState,
    state,
    setAvailableRoom,
    Me
  } = props;

  const [chatIsActive, setChatIsActive] = useState(false);
  const handleDisplayChat = () => {
    setChatIsActive(true)
  }
  const handleHideChat = () => {
    setChatIsActive(false)
  }
  return (
    <div className={`${!collapse && classes.displayHidden}`}>
      <div className={classes.page}>
        <div className={classes.house}>
          <div className={classes.headerControls}>
            <Button variant="contained" onClick={handleHideChat}>room</Button>
            <Button variant="contained" onClick={handleDisplayChat}>chat</Button>
            <div className={classes.collapseDiv}>
              <IconButton aria-label="collapse" onClick={toggleCollapse}>
                <KeyboardDoubleArrowDownIcon />
              </IconButton>
            </div>
          </div>

          <div className={`${classes.screen} ${!chatIsActive && classes.displayHidden}`}>
            <RoomChat Me={Me} roomId={room._id} />
          </div>
          <div className={`${classes.screen} ${chatIsActive && classes.displayHidden}`}>
            {room.status === 'private' ? <Typography 
              className={classes.privateId}
              variant="caption"
              >
                room id: {room._id}
              </Typography> : ''}
            <main className={classes.roomsUsers}>
              <div className={classes.roomHeader}>
                <Typography variant="h6">
                  {room.isRecording && (
                    <span className={classes.recordRoom}>🟢</span>
                  )}
                  {room.name}
                </Typography>
                
              </div>
              <div className={classes.roomSpeakers}>
                {/* <RoomSpeakers speaker={room.admin} /> */}
                {room.brodcasters.map((speaker) => (
                  <RoomSpeakers
                    key={speaker._id}
                    state={state}
                    speaker={speaker}
                  />
                ))}
              </div>
              <hr />

              <div className={classes.roomListeners}>
                {room.audience.map((audience) => (
                  <RoomAudience
                    key={audience._id}
                    state={state}
                    audience={audience}
                  />
                ))}
              </div>
            </main>

            <RoomFooter
              setState={setState}
              state={state}
              setAvailableRoom={setAvailableRoom}
              Me={Me}
              socket={socket}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
