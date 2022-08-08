import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { closeFixedModal } from '../../store/reducers/fixedModalSlice';
import Room from '../room/Room';
import PodcastPlayer from '../podcasts/PodcastPlayer';

function FixedModal() {
    const dispatch = useDispatch();
    const {isOpen, componentName, childrenProps} = useSelector((state) => state.fixedModalSlice)
    const handleClose = () => dispatch(closeFixedModal());

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
            {isOpen &&<div style={{position: 'fixed', left: '4rem', bottom: '1rem', zIndex: '2'}}>
                <p onClick={handleClose}>X</p>
                {renderComponent}
            </div>}
        </>
    )
}

export default FixedModal