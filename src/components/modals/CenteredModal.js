import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { closeModal } from '../../store/reducers/modalSlice';
// import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import CreateEvent from './modalsComponents/CreateEvent';
import CreateRoom from './modalsComponents/CreateRoom';
import JoinPrivateRoom from './modalsComponents/JoinPrivateRoom';
import UploadPodcast from './modalsComponents/UploadPodcast';

import DeletePodcast from '../podcasts/DeletePodcast';
import DeleteEvent from '../events/DeleteEvent';

import EditProfile from '../profile/EditProfile';
import EditEvent from '../events/EditEvent';
import UpdatePhoto from '../profile/UpdatePhoto';
import UpdatePassword from '../profile/UpdatePassword';
import DeleteAccount from '../profile/DeleteAccount';
import FollowModal from '../profile/FollowModal';
import Success from '../utilities/Success';
import DeleteMessage from '../room/DeleteMessage';
import classes from '../../styles/centeredModal/CenteredModal.module.css';
/*
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    // flexBasis: '600px',
    maxHeight: 400,
    overflow: 'auto',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,

    //---- by me
    // maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    
};
*/
const CenteredModal = () => {
    const dispatch = useDispatch()
    const {isOpen, componentName, childrenProps} = useSelector((state) => state.modal)
    const handleClose = () => dispatch(closeModal());

    const componentsLookUp = {
        CreateEvent, 
        CreateRoom,
        JoinPrivateRoom,
        UploadPodcast,

        DeletePodcast,
        DeleteEvent,
        EditEvent,

        FollowModal,

        EditProfile,
        UpdatePhoto,
        UpdatePassword,
        DeleteAccount,
        
        Success,
        DeleteMessage
    };

    let renderComponent;
    if(componentName){
        const SelectedComponent = componentsLookUp[componentName];
        if(SelectedComponent){
            renderComponent = <SelectedComponent {...childrenProps} />
        }
    }

    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={classes.centeredModal}>
                    {renderComponent}
                </div>
            </Modal>
        </div>
    );
}

export default CenteredModal

//when adding new component to centeredModal
//add name of component to the componentsLookUp obj

//and adding on click to open model 
/* dispatch(openModal({
    name: 'ComponentName',
    //add props to component igf you want =>
    childrenProps: {name: 'lol', email: 'lol@lol.com'}
}))
*/