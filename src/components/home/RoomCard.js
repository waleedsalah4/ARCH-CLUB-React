import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { openFixedModal } from '../../store/reducers/fixedModalSlice';
import { Button } from '@mui/material';
import classes from '../../styles/home/RoomCard.module.css';

function RoomCard({room}) {
    const dispatch = useDispatch();
    
    const {isPlayerOpen} = useSelector((state) => state.fixedModalSlice)

    const handleJoinRoomModal = () => {
        console.log('joined')
        if(!isPlayerOpen) {
            dispatch(openFixedModal({
                name: 'Room',
                childrenProps: {item: room},
                isRoomOpen: true,
                isPlayerOpen: false
            }))
        } else{
            console.log('can not open the room as there is a podcast running')
        }
        
    }

    return (
        <div className={classes.room}>
            <div className={classes.roomCard}>
                <div className={classes.roomTitle}>
                    <div>
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
                        <img className={classes.userImg} src={room.admin.photo} title={`${room.admin.name} (host)`} alt="user-img" />

                        {room.brodcasters[0] && <img 
                            className={classes.userImg} 
                            title={room.brodcasters[0].name} 
                            src={room.brodcasters[0].photo}
                            alt="brodcaster-img"
                            /> 
                        }
                        {room.brodcasters[1] && <img 
                            className={classes.userImg} 
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