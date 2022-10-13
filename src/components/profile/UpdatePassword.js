import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { closeModal } from '../../store/reducers/modalSlice';
import { changePassword } from '../../store/reducers/profileSlice';
import {loggingOut} from '../utilities/Helpers';

import FeedBack from '../utilities/FeedBack';
import FormInput from '../register/FormInput';

import {Formik, Form} from 'formik';
import * as Yup from 'yup';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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

function UpdatePassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {changePassLoading,changePassError} = useSelector(state=> state.profileSlice);

    const handelCancelUpdate = () => {
        dispatch(closeModal())
    }

    const handleSubmit = (values) => {
        dispatch(changePassword(values)).then((res)=>{
            if(res.payload.status === 'success'){

                loggingOut()
                navigate('/')
            }
        })
    }

    return (
        <>
        {changePassError && <FeedBack openStatus={true} message={changePassError} status='error' /> }
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
                        <Typography variant='caption'>Note*: if you change your password you will be logged out</Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2 }}
                            disabled={changePassLoading}
                        >
                            {changePassLoading ? 'Saving...' : 'Save'}
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3}}
                            onClick={handelCancelUpdate}
                        >
                            Close
                        </Button>
                    </Form>
                </Formik>
            </Box>
        </>
    )
}

export default UpdatePassword