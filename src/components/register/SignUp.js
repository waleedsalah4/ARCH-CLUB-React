import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../store/reducers/signSlice';

import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import FormInput from './FormInput';
import RegisterCard from './RegisterCard';
import FeedBack from '../utilities/FeedBack';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';



function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {userData, isLoading, signupError} = useSelector((state)=> state.signSlice)

  useEffect(()=>{
    if(userData){
      navigate('/home')
    }
  },[userData,navigate])

  const validate = Yup.object({
    name: Yup.string()
      .min(3, 'Must be more that 3 characters')
      .required('Required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    country: Yup.string()
      .required('Password is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 charaters')
      .required('Password is required'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required'),
  })

  return (
    <>
      <RegisterCard>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Signup And Join Us Now!
          </Typography>
          <Box 
            component="div" 
            // onSubmit={handleSubmit} 
            sx={{ mt: 3 }}>
            <Formik 
              initialValues={{
                name: '',
                email: '',
                country: 'Egypt',
                language: 'English',
                password: '',
                passwordConfirm: ''
              }}
              validationSchema={validate}
              onSubmit={values => {
                dispatch(signup( values))
              }}
            >
              {/* {(formik) => ( */}
                
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormInput label='user Name*' name='name' type='text' />
                    </Grid>
                    <Grid item xs={12}>
                      <FormInput label='Email*' name='email' type='email' />
                    </Grid>
                    <Grid item xs={12}>
                      <FormInput label='Password' name='password' type='password' />
                    </Grid>
                    <Grid item xs={12}>
                      <FormInput label='Confirm Password' name='passwordConfirm' type='password' />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isLoading}
                  >
                   {isLoading ? 'Signing...' : 'Sign Up'}
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link to="/signin">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Form>
              {/* )} */}
            </Formik>
        
        </Box>
      </RegisterCard>
      {signupError && <FeedBack openStatus={true} message={signupError} status='error' /> }
    </>
  )
}

export default SignUp
 