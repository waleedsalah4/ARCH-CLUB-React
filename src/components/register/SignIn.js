import React from 'react';
import RegisterCard from './RegisterCard';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import FormInput from './FormInput';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';

function SignIn() {
  const validate = Yup.object({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 charaters')
      .required('Password is required'),
  })

  return (
    <RegisterCard>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign In 
      </Typography>
        <Box 
          component="div"  
          sx={{ mt: 3 }}>
            <Formik 
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={validate}
              onSubmit={values => {
                console.log(values)
              }}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormInput label='Email*' name='email' type='email' />
                  </Grid>
                  <Grid item xs={12}>
                      <FormInput label='Password' name='password' type='password' />
                  </Grid>
                </Grid>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/forgot-password">
                      forgot password?
                    </Link>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  >
                  Sign In
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/signup">
                      Don't have an account? Sign up
                    </Link>
                  </Grid>
                </Grid>
              </Form>
              {/* )} */}
            </Formik>
      </Box>
    </RegisterCard>
  )
}

export default SignIn