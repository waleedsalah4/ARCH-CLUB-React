import React, { useEffect, 
    // useState 
} from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { 
    // Link, 
    useNavigate, useSearchParams } from 'react-router-dom';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';

import RegisterCard from './RegisterCard';
import FormInput from './FormInput';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const validate = Yup.object({
    password: Yup.string()
      .min(8, 'Password must be at least 8 charaters')
      .required('Password is required'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required'),
  })

function ResetPassword() {
    const token = JSON.parse(localStorage.getItem('user-token') || false)
    // const [updated, setUpdatad] = useState(false);
//   const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.get('token'))
//   const {userData, isLoading, LogError} = useSelector((state)=> state.signSlice)
  // console.log(LogError)
    useEffect(()=> {
        if(token) {
            navigate('/home')
        }
    },[token,navigate])

    return (
        <RegisterCard>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Reset Password
            </Typography>
            <Box 
                component="div"  
                sx={{ mt: 3 }}>
                <Formik 
                    initialValues={{
                        password: '',
                        passwordConfirm: '',
                    }}
                    validationSchema={validate}
                    onSubmit={values => {
                        // dispatch(login(values))
                        // console.log(values)
                    }}
                >
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormInput label='password' name='password' type='password' />
                            </Grid>
                            <Grid item xs={12}>
                                <FormInput label='confirm password' name='passwordConfirm' type='password' />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            // disabled={isLoading}
                        >
                            {/* {isLoading ? 'Resting...' : 'Rest'} */}
                            reset
                        </Button>
                        {/* {updated && <Grid container justifyContent="flex-end">
                            <Grid item>
                                <p>
                                your password has been rest navigate to sign page to login
                                </p>  
                                <Link to="/signin">
                                    Sign in
                                </Link>
                            </Grid>
                        </Grid>} */}
                    </Form>
                </Formik>
            </Box>
        </RegisterCard>
    )
}

export default ResetPassword