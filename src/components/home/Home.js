import React
//, { useState }
,{useEffect}
from 'react';
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getActiveRooms } from '../../store/reducers/homeSlice';
// import { useSelector } from 'react-redux';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import Typography from '@mui/material/Typography';
// import { roomList } from '../dummyfile';
import RoomCard from './RoomCard';
import FeedBack from '../utilities/FeedBack';
import Loader from '../utilities/Loader';
import Button from '@mui/material/Button';
import classes from '../../styles/home/Home.module.css';


// const categories = [
//   'all','ai','education','engineering','football','gaming','history','just chatting','programming','science','storytelling'
// ]


const Home = () => {
  // const  {userData} = useSelector(state => state.signSlice);
  // console.log(userData)
  // const [category, setCategory] = useState('');

  // const handleChange = (event) => {
  //   setCategory(event.target.value);
  //   console.log(event.target.value)
  // };
  // const socket = useOutletContext();
  // console.log(socket)

  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(getActiveRooms(1))
  },[])
    
   const {isLoading, rooms,homePage, homeError, loadMoreVisible} = useSelector(state => state.homeSlice)
    // console.log(events, eventPage)

  const handleLoadMoreRooms = () => {
    dispatch(getActiveRooms(homePage))
  }

  return (
    <div>
      {/* <div className={classes.actionBtns}>
        <Button variant='outlined'>Join private room</Button>
        <Button variant='outlined'>Create room</Button>
      </div> */}
      {/* <div className={classes.header}>
        <FormControl sx={{ m: 1, minWidth: 180 }}>
          <InputLabel id="filter-label" >Filter by Category</InputLabel>
          <Select
            labelId="filter-label"
            id="filter-select-helper"
            value={category}
            label="Filter by Category"
            onChange={handleChange}
            size='large'
          >
            {categories.map(cat => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography gutterBottom>All Rooms</Typography>
      </div> */}
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