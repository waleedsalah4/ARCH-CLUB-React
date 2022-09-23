import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { openFixedModal } from '../../../store/reducers/fixedModalSlice';
import { getPrivateRoom } from '../../../store/reducers/homeSlice';
import { socket } from '../../../store/actions';
import FormInput from '../../register/FormInput';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';


import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FeedBack from '../../utilities/FeedBack';

const validate = Yup.object({
    roomId: Yup.string()
      .required('room id is required'),
})

function JoinPrivateRoom() {
    const dispatch = useDispatch()
    const {isPlayerOpen} = useSelector((state) => state.fixedModalSlice)
    const {roomIsLoading, roomError} = useSelector(state => state.homeSlice)
    const handleSubmit = (values) => {
        dispatch(getPrivateRoom(values.roomId)).then((result) => {
            if(result.payload.res.status === 'success') {
                if(!isPlayerOpen) {
                    if(socket.connected){
                        socket.emit('joinRoom', result.payload.res.data.name);
                    } else {
                        socket.connect();
                        socket.emit('joinRoom', result.payload.res.data.name);
                    }
                    dispatch(openFixedModal({
                        name: 'Room',
                        isRoomOpen: true,
                        isPlayerOpen: false
                    }))
                } else{
                    console.log('can not create room as there is podcasts running')
                }
            }
        })
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
                            disabled={roomIsLoading}
                        >
                            {roomIsLoading ? 'Joining' : 'Join'}
                        </Button>
                    </Form>
                </Formik>
            </Box>

            {roomError && <FeedBack openStatus={true} message={roomError} status='error'/>}
        </>
    )
}

export default JoinPrivateRoom