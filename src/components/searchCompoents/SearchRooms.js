import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchForRooms } from '../../store/reducers/SearchSlice';
import FeedBack from '../utilities/FeedBack';
import Loader from '../utilities/Loader';
import RoomCard from '../home/RoomCard';
import classes from '../../styles/home/Home.module.css';

function SearchRooms({value}) {
    const dispatch = useDispatch();
    const {
        rooms,
        roomsError,
        isLoadingRooms,
    } = useSelector(state => state.SearchSlice)

    useEffect(() => {
        dispatch(searchForRooms({page: 1,value}))
    },[dispatch])


    return (
        <div className={classes.rooms}>
            {rooms && rooms.map(room => (
                <RoomCard key={room._id} room={room} />
            ))}

            {isLoadingRooms && <Loader />}
           
            {rooms.length ===0 && !isLoadingRooms && <p>There is no room with this name</p>}

            {roomsError && <FeedBack openStatus={true} message={roomsError} status='error' /> }
        </div>
    )
}

export default SearchRooms