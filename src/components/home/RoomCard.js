import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { openFixedModal } from '../../store/reducers/fixedModalSlice';
import { Button,Avatar } from '@mui/material';
import { socket } from '../../store/actions';
import { Toast } from '../utilities/sweetAlert';
import classes from '../../styles/home/RoomCard.module.css';

function RoomCard({room}) {
    const dispatch = useDispatch();
    let socketio = socket;
    const {isPlayerOpen} = useSelector((state) => state.fixedModalSlice)

    const handleJoinRoomModal = () => {
        if(!isPlayerOpen) {
            if(socketio.connected){
                socketio.emit('joinRoom', room.name);
            } else {
                socketio.connect();
                socketio.emit('joinRoom', room.name);
            }
            dispatch(openFixedModal({
                name: 'Room',
                // childrenProps: {socket: socketio},
                isRoomOpen: true,
                isPlayerOpen: false
            }))
            
        } else{
            Toast.fire({
                icon: 'info',
                title: 'can not open the room as there is a podcast running'
            })
        }
        
    }

    let userImg = room.admin.photo.includes('herokuapp') ? 'https://audiocomms-podcast-api.onrender.com/img/users/default.jpg': room.admin.photo;

    return (
        <div className={classes.room}>
            <div className={classes.roomCard}>
                <div className={classes.roomTitle}>
                    <div className={classes.roomHeader}>
                        <span className={classes.roomName}>{room.name}</span>
                        <span className={classes.roomCategory}>{room.category}</span>
                    </div>
                    <div>
                        <Button 
                            variant='outlined' 
                            className={classes.joinRublicRoom}
                            onClick={handleJoinRoomModal}
                        >
                            Join
                        </Button>
                    </div>
                </div>
                <div className={classes.roomInfo}>
                    <div className={classes.people}>
                        <Avatar 
                            // className={classes.userImg} 
                            src={userImg} 
                            title={`${room.admin.name} (host)`} 
                            alt="user-img" />

                        {room.brodcasters[0] && <Avatar 
                            // className={classes.userImg} 
                            title={room.brodcasters[0].name} 
                            src={room.brodcasters[0].photo}
                            alt="brodcaster-img"
                            /> 
                        }
                        {room.brodcasters[1] && <Avatar 
                            // className={classes.userImg} 
                            title={room.brodcasters[1].name} 
                            src={room.brodcasters[1].photo}
                            alt="brodcaster-img"
                            /> 
                        }
                    </div>
                    <div className={classes.speakers}>
                        <span className={classes.speakersCount}>{room.brodcasters.length + 1}</span>
                        <span className={classes.speakersText}>Speakers</span>
                    </div>
                    <div className={classes.listeners}>
                        <span className={classes.listenersCount}>{room.audience.length}</span>
                        <span className={classes.listenersText}>listeners</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomCard