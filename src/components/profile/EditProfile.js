import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '../../store/reducers/modalSlice';
import FormInput from '../register/FormInput';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// const profileData = {
//     name: 'waleed',
//     email: 'waleed@gmail.com',
//     bio: 'test bio'
// }

function EditProfile() {
    const dispatch = useDispatch()

    const validate = Yup.object({
        userName: Yup.string()
            .min(3, 'Name must be at least 3 charaters')
            .required('name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
    })


    const handleChangePasswordModal = () => {
        dispatch(closeModal())
        dispatch(openModal({name: 'UpdatePassword'}))
    }

    const handleSubmit = (values) => {
        console.log(values)
    }

    return (
        <>
            <Typography component="h1" variant="h5">
                Edit Profile
            </Typography>
            <Box 
                component="div"  
                sx={{ mt: 3, width: '100%' }}>
                <Formik 
                    initialValues={{
                        userName: '',
                        email: '',
                        bio: ''
                    }}
                    validationSchema={validate}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormInput label='Name' type='text' name='userName'  />
                            </Grid>

                            <Grid item xs={12}>
                                <FormInput label='Email' type='email' name='email'  />
                            </Grid>
                            <Grid item xs={12}>
                                <FormInput label='Bio' type='text' name='bio'  />
                            </Grid>
                            
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 3 }}
                        >
                            Save
                        </Button>
                    </Form>
                </Formik>

                <Grid container>
                    <Grid item xs={12}>
                        <Button variant='text' onClick={handleChangePasswordModal}>Update password</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant='text'>Delete Account</Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default EditProfile;