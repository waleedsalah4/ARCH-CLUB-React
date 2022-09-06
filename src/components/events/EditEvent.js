import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { closeModal } from '../../store/reducers/modalSlice';

import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const validationSchema = yup.object({
  title: yup
    .string('Enter Title')
    .min(5, 'Title should be of minimum 5 characters length')
    .required('Title is required'),
  description: yup
    .string('Enter your description')
    .min(5, 'description should be of minimum 5 characters length')
    .required('description is required'),
});

const EditEvent = ({event}) => {
    const dispatch = useDispatch()
    const [date, setDate] = useState(event.date)
    const formik = useFormik({
        initialValues: {
            title: event.name,
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
        let formData = {
            ...data,
            date
        }
        console.log(formData)
    }

    const cancelEdit = () => {
        dispatch(closeModal())
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="title"
                            name="title"
                            label="Title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
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
                >
                    Submit
                </Button>
                <Button 
                    color="primary" 
                    variant="contained" 
                    fullWidth 
                    onClick={cancelEdit}
                >
                    Cancel
                </Button>
            </form>
        </div>
    );
};

export default React.memo(EditEvent);