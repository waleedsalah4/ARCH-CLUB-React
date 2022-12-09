import { createAsyncThunk } from '@reduxjs/toolkit';
import { url } from '../actions/config';


export const followUser = createAsyncThunk(
    'followUsers/followUser', 
    async (data, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await fetch(`${url}/api/v1/users/${data.id}/following`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user-token'))}`,
                },
            });
            const res = await response.json();
            if(res.status !== 'fail'){
                return {res: res, id: data.id, type: data.type}
            } else {
                return rejectWithValue(res.message);
            }
        } catch (error) {
          
          return rejectWithValue(error.message);
        }
    }
);
  
export const unFollowUser = createAsyncThunk(
    'followUsers/unFollowUser', 
    async (data, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await fetch(`${url}/api/v1/users/${data.id}/following`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user-token'))}`,
                },
            });
            const res = await response.json();
            if(res.status !== 'fail'){
                return {res: res, id: data.id, type: data.type}
            } else {
                return rejectWithValue(res.message);
            }
        } catch (error) {
          
          return rejectWithValue(error.message);
        }
    }
);

/*
const FollowUserSlice = createSlice({
    name: 'followUsers',
    initialState: { 
        follow: null,
        followLoading: false, 
        followError: null ,
    },
    reducers: {
    },
    extraReducers: {
         
      [followUser.pending]: (state, action) => {
        state.followLoading= true;
        state.followError = null
      }
      ,
      [followUser.fulfilled]: (state, action) => {
        state.followLoading= false;

      },

      [followUser.rejected]: (state, action) => {
        state.followLoading= false;
        state.followError = action.payload
          
      },  

      [unFollowUser.pending]: (state, action) => {
        state.followLoading= true;
        state.followError = null
      }
      ,
      [unFollowUser.fulfilled]: (state, action) => {
        state.followLoading= false;
        state.follow = action.payload;
      },

      [unFollowUser.rejected]: (state, action) => {
        state.followLoading= false;
        state.followError = action.payload
          
      }, 
    },
});

export default FollowUserSlice.reducer;*/