import React, { useState } from 'react';
import FormInput from '../../register/FormInput';
import {Formik, Form,} from 'formik';
import * as Yup from 'yup';


import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';



const categories = [
    'ai','education','engineering','football','gaming','history','just chatting','programming','science','storytelling'
  ]

function CreateRoom() {
    const [category, setCategory] = useState('');
    const [toggleStatus, setToggleStatus] = useState(false);
    const [toggleRecord, setToggleRecord] = useState(false)

    const handleChange = (event) => {
        setCategory(event.target.value);
        console.log(event.target.value)
    };


    const handleToggleStatus = (e) => {
        setToggleStatus(e.target.checked);
    }
    const handleToggleRecord = (e) => {
        setToggleRecord(e.target.checked);
        console.log(toggleRecord)
    }

    const validate = Yup.object({
        roomName: Yup.string()
            .min(3, 'room name must be at least 3 charaters')
            .required('room id is required'),
    })


    const handleSubmit = (values) => {
        console.log(values)
    }

    return (
        <>
            <Typography component="h1" variant="h5">
                Create Room
            </Typography>
            <Box 
                component="div"  
                sx={{ mt: 3, width: '100%' }}>
                <Formik 
                    initialValues={{
                        roomName: '',
                        categories: '',
                        switchStatus: false,
                        switchRecord: false,
                    }}
                    validationSchema={validate}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormInput label='Enter room name' name='roomName' type='text' />
                            </Grid>
                            <Grid container item xs={12} justifyContent='space-between'>
                                
                                <Typography variant='p'>
                                    choose category
                                </Typography>
                                <select name="categories"
                                    value={category}
                                    onChange={handleChange}
                                >
                                    {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </Grid>
                            <Grid container item xs={12} justifyContent='space-between'>
                                <div>
                                    <Typography variant='p' display='block'>Public</Typography>
                                    <Typography variant='caption'>
                                        Any one can join this room
                                    </Typography>
                                </div>
                                <Switch 
                                    name='switchStatus'
                                    checked={toggleStatus}
                                    onChange={handleToggleStatus}
                                    inputProps={{ 'aria-label': 'controlled' }}  
                                />
                            </Grid>
                            <Grid container item xs={12} justifyContent='space-between'>
                                <div>
                                    <Typography variant='p' display='block'>Record room</Typography>
                                    <Typography variant='caption'>
                                        Room will not be recorded
                                    </Typography>
                                </div>
                                <Switch 
                                    name='switchRecord'
                                    checked={toggleRecord}
                                    onChange={handleToggleRecord}
                                    inputProps={{ 'aria-label': 'controlled' }}  
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create
                        </Button>
                    </Form>
                </Formik>
            </Box>
        </>
    )
}

export default CreateRoom