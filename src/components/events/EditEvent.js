import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal,openModal } from '../../store/reducers/modalSlice';
import { editEvent } from '../../store/reducers/profileEventsSlice';

import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import FeedBack from '../utilities/FeedBack';

const validationSchema = yup.object({
  name: yup
    .string('Enter Title')
    .min(4, 'Title should be of minimum 4 characters length')
    .required('Title is required'),
  description: yup
    .string('Enter your description')
    .min(5, 'description should be of minimum 5 characters length')
    .required('description is required'),
});

const EditEvent = ({event}) => {
    const dispatch = useDispatch();
    const {editLoading, editError} = useSelector(state => state.profileEventsSlice)
    const [date, setDate] = useState(event.date)
    const formik = useFormik({
        initialValues: {
            name: event.name,
            description: event.description,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            getFormData(values)
        },
    });

    const handleChange =(newValue) => {
        setDate(newValue)
    }

    const getFormData = (data) => {
        let eventdata = {
            ...data,
            date: date === event.date ? event.date : date.toISOString()
        }
        dispatch(editEvent({eventdata,id: event._id})).then((res) =>{
            if(res.meta.requestStatus === 'fulfilled'){
                dispatch(openModal({name: 'Success', childrenProps:{
                    message: 'Event has been updated successfully'
                }}))
            }
        })
    }

    const cancelEdit = () => {
        dispatch(closeModal())
    }

    return (
        <div>
            {editError && <FeedBack openStatus={true} message={editError} status='error' /> }
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="title"
                            name="name"
                            label="Title"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="description"
                            name="description"
                            label="Description"
                            type="text"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                label='Date Time Picker'
                                name='dateTime'
                                fullWidth
                                value={date}
                                onChange={handleChange}
                                renderInput={params => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <Button 
                    color="primary" 
                    variant="contained" 
                    fullWidth 
                    type="submit" 
                    sx={{ mt: 3, mb: 3 }}
                    disabled={editLoading}
                >
                    {editLoading ? 'Submit...' : 'Submit'}
                </Button>
                <Button 
                    color="primary" 
                    variant="contained" 
                    fullWidth 
                    onClick={cancelEdit}
                >
                    Close
                </Button>
            </form>
        </div>
    );
};

export default EditEvent;