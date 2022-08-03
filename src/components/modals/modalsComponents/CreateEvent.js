import React, { useState } from 'react';
import FormInput from '../../register/FormInput';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function CreateEvent() {

    const [selectedDateTime, setSelectedDateTime] = useState()

    const validate = Yup.object({
        eventTitle: Yup.string()
            .min(3, 'Title must be at least 3 charaters')
            .required('Tilte is required'),
        description: Yup.string()
            .required('description is required'),
    })


    const handleSubmit = (values) => {
        getFormData(values)
    }
    const handleChange = (newValue) => {
        setSelectedDateTime(newValue)
    }

    const getFormData = (data) => {
        let formData = {
            ...data,
            selectedDateTime
        }
        console.log(formData)
    }



    return (
        <>
            <Typography component="h1" variant="h5">
                Create Event
            </Typography>
            <Box 
                component="div"  
                sx={{ mt: 3, width: '100%' }}>
                <Formik 
                    initialValues={{
                        eventTitle: '',
                        description: '',
                    }}
                    validationSchema={validate}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormInput label='Enter event title' name='eventTitle' type='text' />
                            </Grid>

                            <Grid item xs={12}>
                                <FormInput label='Enter event description' name='description' type='text' />
                            </Grid>

                            <Grid  item xs={12} >
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        label='Date Time Picker'
                                        value={selectedDateTime}
                                        onChange={handleChange}
                                        renderInput={params => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            {/* <Grid container item xs={12} justifyContent='space-between'>
                                <Typography variant='p'>
                                    choose time
                                </Typography>
                            </Grid> */}
                           
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Upload
                        </Button>
                    </Form>
                </Formik>
            </Box>
        </>
    )
}

export default CreateEvent;