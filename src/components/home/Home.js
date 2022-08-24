import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { roomList } from '../dummyfile';
import RoomCard from './RoomCard';
import classes from '../../styles/home/Home.module.css';


const categories = [
  'all','ai','education','engineering','football','gaming','history','just chatting','programming','science','storytelling'
]


const Home = () => {
  // const  {userData} = useSelector(state => state.signSlice);
  // console.log(userData)
  const [category, setCategory] = useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
    console.log(event.target.value)
  };

  return (
    <div>
      {/* <div className={classes.actionBtns}>
        <Button variant='outlined'>Join private room</Button>
        <Button variant='outlined'>Create room</Button>
      </div> */}
      <div className={classes.header}>
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
      </div>
      <div className={classes.rooms}>
        {roomList && roomList.map(room => (
          <RoomCard key={room._id} room={room} />
        ))}
        {roomList.length === 0 && <p>Theres no active rooms now</p>}
      </div>
    </div>
  );
}

export default Home;