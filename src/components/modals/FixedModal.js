import React from 'react';
import { useSelector } from 'react-redux';
import Room from '../room/Room';
import PodcastPlayer from '../podcasts/PodcastPlayer';

function FixedModal() {
    const {isOpen, componentName, childrenProps} = useSelector((state) => state.fixedModalSlice)

    const componentsLookUp = {
        Room,
        PodcastPlayer
    };
    let renderComponent;
    if(componentName){
        const SelectedComponent = componentsLookUp[componentName];
        if(SelectedComponent){
            renderComponent = <SelectedComponent {...childrenProps} />
        }
    }

    return (
        <>
            {isOpen &&<div style={{position: 'fixed', left: '4.5rem', bottom: '1rem', zIndex: '2'}}>
                {renderComponent}
            </div>}
        </>
    )
}

export default FixedModal