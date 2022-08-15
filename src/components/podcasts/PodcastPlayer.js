import React
// ,{ useState,useRef }
 from 'react';
// import { useDispatch } from 'react-redux';
// import { closeFixedModal } from '../../store/reducers/fixedModalSlice';

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
                {/* </div>
                <div> */}
                    <IconButton aria-label='play-pause' 
                        onClick={togglePlayPause} 
                        // className={classes.playPause}
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

                    {/* <button 
                        className={classes.forwardBackward} 
                        
                    > */}
                        <IconButton aria-label='backward 10' onClick={backwardTen}>
                            <FastRewindIcon />
                        </IconButton> 10
                    {/* </button> */}

                    <IconButton aria-label='play-pause' 
                        onClick={togglePlayPause} 
                        // className={classes.playPause}
                    >
                        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                    </IconButton>

                    {/* <button 
                        
                        className={classes.forwardBackward}
                    > */}
                        10 
                        <IconButton aria-label='forward 10' onClick={forwardTen} >
                            <FastForwardIcon />
                        </IconButton>
                    {/* </button> */}

                    <IconButton aria-label="replay" onClick={replayPodcast}>
                        <ReplayIcon />
                    </IconButton>
                </div>
            
            </div>
        </div>
    )
}

export default PodcastPlayer

    // ********* that moved to PlayerLogic component *****/

    // const dispatch = useDispatch();

    // const [isPlaying, setIsPlaying] = useState(false);
    // const [duration, setDuration] = useState(0);
    // const [currentTime, setCurrentTime] = useState(0);
    // const [collapse, setCollapse] = useState(true)

    // //reference
    // const audioPlayer = useRef(); //reference our audio component
    // const progressBar = useRef(); //reference our progressBar 
    // const volumeBar = useRef();
    // const animationRef = useRef(); //reference the animation

    // const onLoadedMetadata = () => {
    //     const seconds = Math.floor(audioPlayer.current.duration);
    //     setDuration(seconds);
    //     progressBar.current.max = seconds;
    // };

    // const calculateTime = (secs) => {
    //     const minutes = Math.floor(secs / 60);
    //     const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    //     const seconds = Math.floor(secs % 60);
    //     const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    //     return `${returnedMinutes}:${returnedSeconds}`;
    // }

    // const togglePlayPause = () => {
    //     const prevValue = isPlaying;
    //     setIsPlaying(!prevValue)
    //     if(!prevValue){
    //         audioPlayer.current.play();
    //         animationRef.current = requestAnimationFrame(whilePlaying)
    //     }else {
    //         audioPlayer.current.pause();
    //         cancelAnimationFrame(animationRef.current)
    //     }
    // }

   

    // const whilePlaying = () => {
    //     if(progressBar.current) {
    //         progressBar.current.value = audioPlayer.current?.currentTime;
    //     }
    //     changePlayerCurrentTime();
    //     animationRef.current = requestAnimationFrame(whilePlaying)
    // }

    // const changeRange = () => {
    //     audioPlayer.current.currentTime = progressBar.current.value;
    //     changePlayerCurrentTime()
    // }

    // const changePlayerCurrentTime = () => {
    //     if(progressBar.current) {
    //         progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
    //         setCurrentTime(progressBar.current.value)
    //     }
    // }

    // const forwardTen = () => {
    //     progressBar.current.value = Number(progressBar.current.value) + 10
    //     changeRange()
    // }
    // const backwardTen = () => {
    //     progressBar.current.value = Number(progressBar.current.value) - 10
    //     changeRange()
    // }

    // const changeVolume = () => {
    //     // console.log(volumeBar.current.value)
    //     audioPlayer.current.volume = volumeBar.current.value / 100;
    // }

    // const resetPlayer = () => {
    //     audioPlayer.current.currentTime = 0
    //     progressBar.current.value = 0;
    //     changePlayerCurrentTime();
    //     togglePlayPause()
    // }

    // const handleClose = () => dispatch(closeFixedModal());
    // const ToggleCollapse = () => setCollapse(!collapse);
