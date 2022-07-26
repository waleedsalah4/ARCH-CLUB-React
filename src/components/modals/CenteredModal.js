import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { closeModal } from '../../store/reducers/modalSlice';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import CreateEvent from './modalsComponents/CreateEvent';
import CreateRoom from './modalsComponents/CreateRoom';
import JoinPrivateRoom from './modalsComponents/JoinPrivateRoom';
import UploadPodcast from './modalsComponents/UploadPodcast';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
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

const CenteredModal = () => {
    const dispatch = useDispatch()
    const {isOpen, componentName, childrenProps} = useSelector((state) => state.modal)
    const handleClose = () => dispatch(closeModal());

    const componentsLookUp = {
        CreateEvent, 
        CreateRoom,
        JoinPrivateRoom,
        UploadPodcast,
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
                <Box sx={style}>
                    {renderComponent}
                </Box>
            </Modal>
        </div>
    );
}

export default CenteredModal