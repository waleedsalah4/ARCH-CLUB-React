import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { url } from '../actions/config';

export const createEvent = createAsyncThunk(
  'craeteEvents/createEvent', 
    async (data, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const response = await fetch(`${url}/api/v1/events/me`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user-token'))}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });
        const res = await response.json();
        if(res.status !== 'fail'){

          return res
        } else {
          return rejectWithValue(res.message);
        }
          
      } catch (error) {
        
        return rejectWithValue(error.message);
      }
    }
);





const CreateEventSlice = createSlice({
    name: 'craeteEvents',
    initialState: { 
        createMessage: '',
        isLoading: false, 
        createError: null ,
    },
    reducers: {
    },
    extraReducers: {
      [createEvent.pending]: (state, action) => {
        state.isLoading = true;
        state.createError = null;
      },
      [createEvent.fulfilled]: (state, action) => {
        state.isLoading = false; 
        state.createMessage = action.payload
      },
      [createEvent.rejected]: (state, action) => {
        state.isLoading = false;
        state.createError = action.payload;
      },  
    },
});

export default CreateEventSlice.reducer;