import React, { useState } from 'react';
import RoomCard from './RoomCard';
import WaveLoader from '../podcasts/WaveLoader';
import { IconButton,Typography } from '@mui/material';

import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import classes from '../../styles/podcasts/PodcastPlayer.module.css';
import styles from '../../styles/room/Room.module.css';
export default function Room({item}) {
  const [collapse, setCollapse] = useState(true)
  const toggleCollapse = () => setCollapse(!collapse);

  return (
    <>
      <div className={`${collapse && classes.displayHidden}`}>
        <div className={styles.miniRoom}>
          <IconButton 
            aria-label='collapse' 
            onClick={toggleCollapse}
            >
            <KeyboardDoubleArrowUpIcon />
          </IconButton>
            <Typography variant='p'>{item.name}</Typography>    
              <WaveLoader 
                waveLoader={classes.waveLoader}
                waveLoaderHeight={classes.miniPlayerWaveLoaderHeight}
                stroke={classes.stroke}
                strokeWidth={classes.miniPlayerStrokeWidth}
              />
        </div>
      </div>
      <RoomCard room={item} collapse={collapse} toggleCollapse={toggleCollapse} />
    </>
  );
}
