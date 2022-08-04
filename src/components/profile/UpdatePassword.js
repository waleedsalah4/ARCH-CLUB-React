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

function UpdatePassword() {
    const dispatch = useDispatch()

    const validate = Yup.object({
        passwordCurrent: Yup.string()
            .required('Password is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 charaters')
            .required('Password is required'),
        passwordConfirm: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Password must match')
            .required('Confirm password is required'),
    })

    const handleChangePasswordModal = () => {
        dispatch(closeModal())
        dispatch(openModal({name: 'UpdatePassword'}))
    }
    const handelCancelUpdate = () => {
        dispatch(closeModal())
        dispatch(openModal({name: 'EditProfile'}))
    }

    const handleSubmit = (values) => {
        console.log(values)
    }

    return (
        <>
            <Typography component="h1" variant="h5">
                Update Password
            </Typography>
            <Box 
                component="div"  
                sx={{ mt: 3, width: '100%' }}>
                <Formik 
                    initialValues={{
                        passwordCurrent: '',
                        password: '',
                        passwordConfirm: ''
                    }}
                    validationSchema={validate}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormInput label='Current Password' type='password' name='passwordCurrent'  />
                            </Grid>

                            <Grid item xs={12}>
                                <FormInput label='New Password' type='password' name='password'  />
                            </Grid>
                            <Grid item xs={12}>
                                <FormInput label='Confirm New Password' type='password' name='passwordConfirm'  />
                            </Grid>
                            
                        </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3 }}
                            >
                                Save
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3}}
                                onClick={handelCancelUpdate}
                            >
                                Cancel
                            </Button>
                    </Form>
                </Formik>
            </Box>
        </>
    )
}

export default UpdatePassword