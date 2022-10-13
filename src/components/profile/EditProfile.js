import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { openModal, closeModal } from '../../store/reducers/modalSlice';
import { updateMe } from '../../store/reducers/profileSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import FeedBack from '../utilities/FeedBack';


const validate = Yup.object({
    name: Yup.string()
        .min(3, 'Name must be at least 3 charaters')
        .required('name is required'),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
})

function EditProfile({data}) {
    const dispatch = useDispatch();
    const {editLoading, editError} = useSelector(state => state.profileSlice);

    const formik = useFormik({
        initialValues: {
            name: data.name,
            email: data.email,
            bio: data.bio
        },
        validationSchema: validate,
        onSubmit: (values) =>{
            dispatch(updateMe(values))
        },
    })

    const handleChangePasswordModal = () => {
        dispatch(closeModal())
        dispatch(openModal({name: 'UpdatePassword'}))
    }
    const handleDeleteAccountModal = () => {
        dispatch(closeModal())
        dispatch(openModal({name: 'DeleteAccount'}))
    }

    

    return (
        <>
        {editError && <FeedBack openStatus={true} message={editError} status='error' /> }
            <Typography component="h1" variant="h5">
                Edit Profile
            </Typography>
            <Box 
                component="div"  
                sx={{ mt: 3, width: '100%' }}
            >
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth
                                label='Name' 
                                type='text' 
                                name='name' 
                                value={formik.values.name} 
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                fullWidth
                                label='Email' 
                                type='email' 
                                name='email' 
                                value={formik.values.email} 
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth
                                label='Bio' 
                                type='text' 
                                name='bio' 
                                value={formik.values.bio} 
                                onChange={formik.handleChange}
                                error={formik.touched.bio && Boolean(formik.errors.bio)}
                                helperText={formik.touched.bio && formik.errors.bio}
                            />
                        </Grid>
                            
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 3 }}
                        disabled={editLoading}
                    >
                        {editLoading ? 'Saving...': 'Save'}
                    </Button>
                </form>

                <Grid container>
                    <Grid item xs={12}>
                        <Button variant='text' onClick={handleChangePasswordModal}>Update password</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant='text' onClick={handleDeleteAccountModal}>Delete Account</Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default EditProfile;