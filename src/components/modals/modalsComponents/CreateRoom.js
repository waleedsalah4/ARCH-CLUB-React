import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { openFixedModal } from '../../../store/reducers/fixedModalSlice';
import FormInput from '../../register/FormInput';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import { socket } from '../../../store/actions';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
// import { createAfuckenRoom } from '../../room/Room';


const categories = [
    'ai','education','engineering','football','gaming','history','just chatting','programming','science','storytelling'
  ]

function CreateRoom() {
    
    const [toggleStatus, setToggleStatus] = useState(false)
    const [statustype, setStatusType] = useState('public')
    const [toggleRecord, setToggleRecord] = useState(false)

    const dispatch = useDispatch();
    
    const {isPlayerOpen} = useSelector((state) => state.fixedModalSlice)

    const handleToggleStatus = (e) => {
        setToggleStatus(e.target.checked);
        e.target.checked ? setStatusType('private') : setStatusType('public');
    }
    const handleToggleRecord = (e) => {
        setToggleRecord(e.target.checked);
    }

    const validate = Yup.object({
        name: Yup.string()
            .min(2, 'room name must be at least 2 charaters')
            .required('room name is required'),
    })


    const handleSubmit = (values) => {
        getFormData(values)
    }

    const getFormData = (data) => {
        if(!isPlayerOpen) {
            if(socket.connected){
                socket.emit('createRoom', { 
                    ...data,
                    status: statustype,
                    isRecording: toggleRecord
                });
            } else {
                socket.connect();
                socket.emit('createRoom', { 
                    ...data,
                    status: statustype,
                    isRecording: toggleRecord
                });
            }
            dispatch(openFixedModal({
                name: 'Room',
                isRoomOpen: true,
                isPlayerOpen: false
            }))
        } else{
            console.log('can not create room as there is podcasts running')
        }
        
        // console.log({ 
        //     ...data,
        //     status: statustype,
        //     isRocording: toggleRecord
        // })

    }

    let toggleText = {
        primaryStatus: toggleStatus ? 'Private' : 'Public',
        secondaryStatus: toggleStatus ? 'only people have the room id will join' : 'Any one can join this room',
        secondaryRecord: toggleRecord ? 'Record Room to listen as podcast later' : 'Room will not be recorded',

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
                        name: '',
                        category: 'ai',
                        // switchStatus: false,
                        // switchRecord: false,
                    }}
                    validationSchema={validate}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormInput label='Enter room name' name='name' type='text' />
                            </Grid>
                            <Grid container item xs={12} justifyContent='space-between'>
                                
                                <Typography variant='p'>
                                    choose category
                                </Typography>
                                {/* <select name="categories"
                                    value={category}
                                    onChange={handleChange}
                                >
                                    {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select> */}
                                <Field as="select" name='category'>
                                    {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </Field>
                            </Grid>
                            <Grid container item xs={12} justifyContent='space-between'>
                                <div>
                                    <Typography variant='p' display='block'>{toggleText.primaryStatus}</Typography>
                                    <Typography variant='caption'>
                                        {toggleText.secondaryStatus}
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
                                        {toggleText.secondaryRecord}
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