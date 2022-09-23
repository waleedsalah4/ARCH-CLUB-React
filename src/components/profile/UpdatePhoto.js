import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/reducers/modalSlice';
import { changePhoto } from '../../store/reducers/profileSlice';
import Button from '@mui/material/Button';
import FeedBack from '../utilities/FeedBack';
import classes from '../../styles/profile/UpdatePhoto.module.css'

function UpdatePhoto({pic, isMe}) {
    const dispatch = useDispatch();
    const {editPhotoLoading,editPhotoError} = useSelector(state => state.profileSlice)
    const [photo, setPhoto] = useState(pic);
    const [photoChange, setPhotoChanged] = useState(false)
    const [newPic, setNewPic] = useState(null)

    const handleChangeImg = (e) => {
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            setPhoto(reader.result)
            setPhotoChanged(true);
            setNewPic(e.target.files[0])
        } 
        reader.readAsDataURL(file);
    }
    const handleClose = () => {
        dispatch(closeModal())
    }
    const submitPhoto = ()=> {
        if(newPic){
            const photoData = new FormData();
            photoData.append("photo",newPic);
            dispatch(changePhoto(photoData))
        }

    }
    return (
        <>
        {editPhotoError && <FeedBack openStatus={true} message={editPhotoError} status='error' /> }
        
        <div className={classes.container}>
            <img src={photo} className={classes.img} alt='user-avatar'/>
            <div className={classes.controls}>
                <Button onClick={handleClose}>close</Button>
                {isMe && <Button component="label"  disabled={editPhotoLoading}>
                    Change
                    <input 
                        hidden 
                        accept="image/*" 
                        type="file" 
                        onChange={handleChangeImg}
                    />
                </Button>}
                {photoChange && <Button 
                    onClick={submitPhoto}
                    disabled={editPhotoLoading}
                >
                    {editPhotoLoading ? 'Saving...' : 'Save'}
                </Button>}
            </div>
        </div>
        </>
    )
}

export default UpdatePhoto;