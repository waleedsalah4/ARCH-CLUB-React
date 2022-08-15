import React from 'react';
// import classes from '../../styles/podcasts/WaveLoader.module.css';

function WaveLoader(props) {
    const {waveLoader, waveLoaderHeight, stroke, strokeWidth} = props;
    return (
        <div className={`${waveLoader} ${waveLoaderHeight}`}>
            <span className={`${stroke} ${strokeWidth}`}></span>
            <span className={`${stroke} ${strokeWidth}`}></span>
            <span className={`${stroke} ${strokeWidth}`}></span>
            <span className={`${stroke} ${strokeWidth}`}></span>
            <span className={`${stroke} ${strokeWidth}`}></span>
            <span className={`${stroke} ${strokeWidth}`}></span>
            <span className={`${stroke} ${strokeWidth}`}></span>
        </div>
    )
}

export default WaveLoader