import React from 'react';

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