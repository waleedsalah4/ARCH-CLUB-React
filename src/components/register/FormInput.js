import React from 'react';
import TextField from '@mui/material/TextField';
import classes from '../../styles/FormInput.module.css'
import { ErrorMessage, useField } from 'formik';


function FormInput(props) {
    const [field, meta] = useField(props)
    const {label, onChange, errorMessage, ...inputProps} = props
    return (
        <>
            <TextField 
                fullWidth 
                label={label}
                {...field}
                {...inputProps}
            />
            <ErrorMessage component='div' name={field.name} className={classes.errorMsg} />
        </>
    )
}

export default FormInput