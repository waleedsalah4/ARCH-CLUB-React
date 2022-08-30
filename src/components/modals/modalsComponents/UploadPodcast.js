import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateSignature } from '../../../store/reducers/uploadPodcastSlice';
import FormInput from '../../register/FormInput';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


const categories = [
    'just chatting','ai','education','engineering','football','gaming','history','programming','science','storytelling'
]

function UploadPodcast() {

    const dispatch = useDispatch()
    const {isLoading} = useSelector(state => state.uploadPodcastSlice)

    const validate = Yup.object({
        podcastName: Yup.string()
            .min(5, 'podcast name must be at least 5 charaters')
            .required('room name is required'),
        file: Yup.mixed().required()
    })


    const handleSubmit = (values) => {
        dispatch(generateSignature(values))
    }


    return (
        <>
            <Typography component="h1" variant="h5">
                Upload Podcast
            </Typography>
            <Box 
                component="div"  
                sx={{ mt: 3, width: '100%' }}>
                <Formik 
                    initialValues={{
                        podcastName: '',
                        categories: 'just chatting',
                        file: ''
                    }}
                    validationSchema={validate}
                    onSubmit={handleSubmit}
                >
                {(formProps) => (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id='file'
                                    name='file' 
                                    accept="mp3/*"  
                                    type="file" 
                                    onChange={(event) => {
                                        formProps.setFieldValue('file', event.target.files[0])
                                    }} 
                                />
                                <ErrorMessage component='div' name='file' style={{color: 'red'}} />

                                {/* <input name='file' accept='mp3/*' type='file' onChange={(event) => {
                                        formProps.setFieldValue('file', event.target.files[0])
                                    }} 
                                /> */}
                            </Grid>
                            <Grid item xs={12}>
                                <FormInput label='Enter podcast name' name='podcastName' type='text' />
                            </Grid>
                            <Grid container item xs={12} justifyContent='space-between'>
                                
                                <Typography variant='p'>
                                    choose category
                                </Typography>
                                <Field as="select" name='categories'>
                                    {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </Field>
                            </Grid>
                           
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isLoading}
                        >
                           {isLoading ? 'Uploading...' : 'Uploading'}
                        </Button>
                    </Form>)}
                </Formik>
            </Box>
        </>
    )
}

export default UploadPodcast;