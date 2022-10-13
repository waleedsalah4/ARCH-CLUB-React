import React,{ useState,useRef } from 'react';
import { useDispatch } from 'react-redux';
import { closeFixedModal } from '../../store/reducers/fixedModalSlice';

import PodcastPlayer from './PodcastPlayer';

function PlayerLogic( {item}) {
    const dispatch = useDispatch();

    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [collapse, setCollapse] = useState(true)

    //reference
    const audioPlayer = useRef(); //reference our audio component
    const progressBar = useRef(); //reference our progressBar 
    const volumeBar = useRef();
    const animationRef = useRef(); //reference the animation

    const onLoadedMetadata = () => {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);
        progressBar.current.max = seconds;
        togglePlayPause()
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
        if(progressBar.current) {
            progressBar.current.value = audioPlayer.current?.currentTime;
        }
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying)
    }

    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime()
    }

    const changePlayerCurrentTime = () => {
        if(progressBar.current) {
            progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
            setCurrentTime(progressBar.current.value)
        }
    }

    const forwardTen = () => {
        progressBar.current.value = Number(progressBar.current.value) + 10
        changeRange()
    }
    const backwardTen = () => {
        progressBar.current.value = Number(progressBar.current.value) - 10
        changeRange()
    }

    const changeVolume = () => {
        audioPlayer.current.volume = volumeBar.current.value / 100;
    }

    const resetPlayer = () => {
        audioPlayer.current.currentTime = 0
        progressBar.current.value = 0;
        changePlayerCurrentTime();
        togglePlayPause()
    }
    const replayPodcast = () => {
        audioPlayer.current.currentTime = 0
        progressBar.current.value = 0;
        changePlayerCurrentTime();
        if(!isPlaying){
            togglePlayPause()
        }
    }

    const handleClose = () => dispatch(closeFixedModal());
    const ToggleCollapse = () => setCollapse(!collapse);
    return (
        <PodcastPlayer
            item={item} 
            collapse={collapse}
            ToggleCollapse={ToggleCollapse}
            togglePlayPause={togglePlayPause}
            isPlaying={isPlaying} 
            handleClose={handleClose}
            audioPlayer={audioPlayer}
            onLoadedMetadata={onLoadedMetadata}
            resetPlayer={resetPlayer}
            calculateTime={calculateTime}
            currentTime={currentTime}
            progressBar={progressBar}
            changeRange={changeRange}
            duration={duration}
            volumeBar={volumeBar}
            changeVolume={changeVolume}
            backwardTen={backwardTen}
            forwardTen={forwardTen}
            replayPodcast={replayPodcast}
        />
    )
}

export default PlayerLogic