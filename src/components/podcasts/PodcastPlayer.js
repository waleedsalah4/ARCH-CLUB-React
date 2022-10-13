import React from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { IconButton, Typography } from '@mui/material';
import WaveLoader from './WaveLoader';
import classes from '../../styles/podcasts/PodcastPlayer.module.css';


function PodcastPlayer(props) {

    const { collapse,ToggleCollapse, item,togglePlayPause, isPlaying, handleClose, audioPlayer, onLoadedMetadata ,resetPlayer,calculateTime, currentTime, progressBar, changeRange, duration,volumeBar,changeVolume,backwardTen, forwardTen, replayPodcast } = props

    return (
        <div className={classes.podcastPlayer}>
            <div className={`${collapse && classes.displayHidden}`}>
                <div className={classes.miniPlayer}>
                    <IconButton 
                        aria-label='collapse' 
                        onClick={ToggleCollapse}
                    >
                        <KeyboardDoubleArrowUpIcon />
                    </IconButton>
                    <Typography variant='p'>{item.name}</Typography>

                    <IconButton aria-label='play-pause' 
                        onClick={togglePlayPause} 
                    >
                        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                    </IconButton>
                    {isPlaying && <WaveLoader 
                    waveLoader={classes.waveLoader}
                    waveLoaderHeight={classes.miniPlayerWaveLoaderHeight}
                    stroke={classes.stroke}
                    strokeWidth={classes.miniPlayerStrokeWidth}
                />}
                </div>
            </div>
            <div className={`${!collapse && classes.displayHidden}`}>
                <div>
                    <IconButton 
                        aria-label='collapse' 
                        onClick={ToggleCollapse}
                        className={classes.collapse}
                    >
                        <KeyboardDoubleArrowDownIcon />
                    </IconButton>
                    <IconButton 
                        aria-label='close' 
                        onClick={handleClose}
                        className={classes.closeModal}
                    >
                        <CloseIcon />
                    </IconButton>              
                </div>
                <div className={classes.userInfo}>
                    <div className={classes.userImg}>
                        <img 
                            src={item.createdBy.photo} 
                            className={`${isPlaying && classes.rotate }`} 
                            alt="user avatar" 
                        />
                    </div>
                    <div className={classes.userName}>
                        <h3>{item.createdBy.name}</h3>
                        <p>{item.name}</p>
                    </div>
                </div>
                {isPlaying && <WaveLoader 
                    waveLoader={classes.waveLoader}
                    waveLoaderHeight={classes.waveLoaderHeight}
                    stroke={classes.stroke}
                    strokeWidth={classes.strokeWidth}
                /> }
                <div className={classes.playerContainer}>
                    <audio 
                        ref={audioPlayer} 
                        src={item.audio.url}
                        preload="metadata"
                        onLoadedMetadata={onLoadedMetadata}
                        onEnded={resetPlayer}
                    ></audio>

                    <div className={classes.audio}>

                        {/* current time */}
                        <div className={classes.currentTime}>
                            {calculateTime(currentTime)}
                        </div>

                        {/* progeress bar */}
                        <div>
                            <input 
                                type='range' 
                                defaultValue='0' 
                                ref={progressBar}
                                onChange={changeRange}
                                className={classes.progressBar}
                            />
                        </div>
                        {/* duration */}
                        <div className={classes.duration}>
                            {(duration && !isNaN(duration)) && calculateTime(duration)}
                        </div>
                    </div>
                </div>

                <div className={classes.playerContainer}>
                    <VolumeMuteIcon />
                    <input 
                        type='range' 
                        ref={volumeBar}
                        defaultValue='99'
                        onChange={changeVolume}
                        className={classes.volumeBar}
                    />
                    <VolumeUpIcon />
                </div>
                <div className={classes.playerButtons}>
                    <div 
                        className={`${classes.likeTrack} ${item.isLiked ? classes.liked : ''}`}
                    >
                        <FavoriteIcon />
                    </div>
                        <IconButton aria-label='backward 10' onClick={backwardTen}>
                            <FastRewindIcon />
                        </IconButton> 10

                    <IconButton aria-label='play-pause' 
                        onClick={togglePlayPause} 
                    >
                        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                    </IconButton>

                        10 
                        <IconButton aria-label='forward 10' onClick={forwardTen} >
                            <FastForwardIcon />
                        </IconButton>

                    <IconButton aria-label="replay" onClick={replayPodcast}>
                        <ReplayIcon />
                    </IconButton>
                </div>
            
            </div>
        </div>
    )
}

export default PodcastPlayer
