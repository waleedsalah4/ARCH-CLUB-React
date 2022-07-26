import React from 'react'
// import RegisterCard from '../../register/RegisterCard'
import FormInput from '../../register/FormInput';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';


import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


function JoinPrivateRoom() {
    const validate = Yup.object({
        roomId: Yup.string()
          .required('room id is required'),
    })

    const handleSubmit = (values) => {
        console.log(values)
    }

    return (
        <>
            <Typography component="h1" variant="h5">
                Join Private Room
            </Typography>
            <Box 
                component="div"  
                sx={{ mt: 3, width: '100%' }}>
                <Formik 
                    initialValues={{
                        roomId: '',
                    }}
                    validationSchema={validate}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormInput label='Enter room id' name='roomId' type='text' />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Join
                        </Button>
                    </Form>
                </Formik>
            </Box>
        </>
    )
}

export default JoinPrivateRoom