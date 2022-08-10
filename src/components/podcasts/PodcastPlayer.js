import React,{ useState,useRef } from 'react';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import classes from '../../styles/podcasts/PodcastPlayer.module.css';

function PodcastPlayer({item}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0)

    //reference
    const audioPlayer = useRef(); //reference our audio component
    const progressBar = useRef(); //reference our progressBar 
    const animationRef = useRef(); //reference the animation

    const onLoadedMetadata = () => {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);
        progressBar.current.max = seconds;
    };

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    }

    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue)
        if(!prevValue){
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying)
        }else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current)
        }
    }

   

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying)
    }

    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime()
    }

    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
        setCurrentTime(progressBar.current.value)
    }

    const forwardTen = () => {
        progressBar.current.value = Number(progressBar.current.value) + 10
        changeRange()
    }
    const backwardTen = () => {
        progressBar.current.value = Number(progressBar.current.value) - 10
        changeRange()
    }

    return (
        <div className={classes.audioPlayer}>
            <audio ref={audioPlayer} src={item.audio.url} preload="metadata" onLoadedMetadata={onLoadedMetadata}></audio>

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

            <div className={classes.controls}>
                <button className={classes.forwardBackward} onClick={backwardTen}>
                    <FastRewindIcon /> 10
                </button>
                <button onClick={togglePlayPause} className={classes.playPause}>
                    {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </button>
                <button onClick={forwardTen} className={classes.forwardBackward}>
                10 <FastForwardIcon />
                </button>
            </div>
            
        </div>
    )
}

export default PodcastPlayer


