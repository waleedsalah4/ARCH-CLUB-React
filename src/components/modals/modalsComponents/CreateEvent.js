import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { createEvent } from '../../../store/reducers/CreateEventSlice';
import { openModal } from '../../../store/reducers/modalSlice';
import FormInput from '../../register/FormInput';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';

import FeedBack from '../../utilities/FeedBack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function CreateEvent() {
    const dispatch = useDispatch()
    const {isLoading,createError} = useSelector(state=> state.CreateEventSlice)
    const [selectedDateTime, setSelectedDateTime] = useState(new Date())

    const validate = Yup.object({
        name: Yup.string()
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
            date: selectedDateTime.toISOString()
        }
        dispatch(createEvent(formData)).then((results) => {
            // handle result here
            if(results.payload.status === 'success'){
                dispatch(openModal({name: 'Success', childrenProps:{
                    message: 'Event has been created successfully'
                }}))
            }
        })
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
                        name: '',
                        description: '',
                    }}
                    validationSchema={validate}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormInput label='Enter event title' name='name' type='text' />
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
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating...' : 'Create'}
                        </Button>
                    </Form>
                </Formik>
            </Box>
            {createError && <FeedBack openStatus={true} message={createError} status='error'/>}
        
        </>
    )
}

export default CreateEvent;