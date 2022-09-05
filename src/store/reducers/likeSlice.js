import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const url = 'https://audiocomms-podcast-platform.herokuapp.com';

const token = JSON.parse(localStorage.getItem('user-token'))

export const likePod = createAsyncThunk(
  'like/likePods', 
    async (id, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const response = await fetch(`${url}/api/v1/podcasts/likes/${id}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const res = await response.json();
        if(res.status !== 'fail'){
          return {res: res, id: id}
        } else {
          return rejectWithValue(res.message);
        }
          
      } catch (error) {
        
        return rejectWithValue(error.message);
      }
    }
);


export const disLikePod = createAsyncThunk(
    'like/disLikePod', 
      async (id, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
          const response = await fetch(`${url}/api/v1/podcasts/likes/${id}`, {
              method: 'DELETE',
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          const res = await response.json();
          if(res.status !== 'fail'){
            return {res: res, id: id}
          } else {
            return rejectWithValue(res.message);
          }
            
        } catch (error) {
          
          return rejectWithValue(error.message);
        }
      }
  );


const likeSlice = createSlice({
    name: 'like',
    initialState: { 
        like: null,
        isLoading: false, 
        likeError: null ,
    },
    reducers: {
    },
    extraReducers: {
      [likePod.pending]: (state, action) => {
        state.isLoading = true;
        state.likeError = null;
      },
      [likePod.fulfilled]: (state, action) => {
        state.isLoading = false; 
        state.like = action.payload;
        // console.log(action.payload)
      },
      [likePod.rejected]: (state, action) => {
        state.isLoading = false;
        state.likeError = action.payload;
        console.log(action.payload)
      },  

      [disLikePod.pending]: (state, action) => {
        state.isLoading = true;
        state.likeError = null;
      },
      [disLikePod.fulfilled]: (state, action) => {
        state.isLoading = false; 
        state.like = action.payload.message;
        // console.log(action.payload)
      },
      [disLikePod.rejected]: (state, action) => {
        state.isLoading = false;
        state.likeError = action.payload.message;
        console.log(action.payload)
      }, 
    },
});

export default likeSlice.reducer;