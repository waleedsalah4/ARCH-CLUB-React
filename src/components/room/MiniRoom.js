import React from 'react';
import WaveLoader from '../podcasts/WaveLoader';
import { IconButton,Typography } from '@mui/material';

import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import classes from '../../styles/podcasts/PodcastPlayer.module.css';
import styles from '../../styles/room/Room.module.css';

function MiniRoom({item,collapse,toggleCollapse}) {
    return (
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
    )
}

export default MiniRoom