import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const url = 'https://audiocomms-podcast-platform.herokuapp.com';
const token = JSON.parse(localStorage.getItem('user-token'))

export const getUser = createAsyncThunk(
  'profile/getUser', 
    async (id, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const response = await fetch(`${url}/api/v1/users/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const res = await response.json();
        if(res.status !== 'fail'){
          return res.data;
        } else {
          return rejectWithValue(res.message);
        }
          
      } catch (error) {
        
        return rejectWithValue(error.message);
      }
    }
);


export const getMe = createAsyncThunk(
  'profile/getMe', 
    async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const response = await fetch(`${url}/api/v1/users/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const res = await response.json();
        if(res.status !== 'fail'){
            const {data} = res;

            return data.data
        } else {
          return rejectWithValue(res.message);
        }
          
      } catch (error) {
        
        return rejectWithValue(error.message);
      }
    }
);



const profileSlice = createSlice({
    name: 'profile',
    initialState: { 
      userData: null,
      isLoading: false,
      profileError: null
    },
    reducers: {},
    extraReducers: {
      [getMe.pending]: (state, action) => {
        state.isLoading = true;
        state.profileError = null;
      },
      [getMe.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      },
      [getMe.rejected]: (state, action) => {
        state.isLoading = false;
        state.profileError = action.payload;
        // console.log(action.payload)
      },

      //sign up
      [getUser.pending]: (state, action) => {
        state.isLoading = true;
        state.profileError = null;
      },
      [getUser.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      },
      [getUser.rejected]: (state, action) => {
        state.isLoading = false;
        state.profileError = action.payload;
      },
  
    },
});

export default profileSlice.reducer;