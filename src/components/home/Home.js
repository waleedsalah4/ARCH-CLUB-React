import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveRooms } from '../../store/reducers/homeSlice';
import RoomCard from './RoomCard';
import FeedBack from '../utilities/FeedBack';
import Loader from '../utilities/Loader';
import Button from '@mui/material/Button';
import classes from '../../styles/home/Home.module.css';



const Home = () => {
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(getActiveRooms(1))
  },[])
    
   const {isLoading, rooms,homePage, homeError, loadMoreVisible} = useSelector(state => state.homeSlice)


  const handleLoadMoreRooms = () => {
    dispatch(getActiveRooms(homePage))
  }

  return (
    <div>
      <div className={classes.rooms}>
        {rooms && rooms.map(room => (
          <RoomCard   
            key={room._id} 
            room={room} 
          />
        ))}
      </div>

      {isLoading && <Loader />}
          {loadMoreVisible && <Button 
          variant='contained'
          onClick={handleLoadMoreRooms}
        >
          Load More
      </Button>}
      {rooms.length ===0 && !isLoading && <p>There's no active rooms now</p>}

      {homeError && <FeedBack openStatus={true} message={homeError} status='error' /> }
    </div>
  );
}

export default Home;