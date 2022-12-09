import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { url } from '../actions/config';


export const forgotPassword = createAsyncThunk(
  'forgotPass/forgotPassword', 
    async (data, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const response = await fetch(`${url}/api/v1/users/forgotPassword`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
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



const forgotSlice = createSlice({
    name: 'forgotPass',
    initialState: { emailSent: null, isLoading: false, forgotError: null },
    reducers: {},
    extraReducers: {
      [forgotPassword.pending]: (state, action) => {
        state.isLoading = true;
        state.forgotError = null;
        state.emailSent  = null
      },
      [forgotPassword.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.emailSent = action.payload.message;
      },
      [forgotPassword.rejected]: (state, action) => {
        state.isLoading = false;
        state.forgotError = action.payload;
      }
    },
});

export default forgotSlice.reducer;