import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { likePod, disLikePod } from './likeSlice'; 

import { url } from '../actions/config';

export const getMyFollowingPodcasts = createAsyncThunk(
  'podcasts/getMyFollowingPodcasts', 
    async (page, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const response = await fetch(`${url}/api/v1/podcasts/following/me?limit=6&page=${page}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user-token'))}`,
            },
        });
        const res = await response.json();
        if(res.status !== 'fail'){

          return {result: res, podcasts: res.data, page: page}
        } else {
          return rejectWithValue(res.message);
        }
          
      } catch (error) {
        
        return rejectWithValue(error.message);
      }
    }
);





const podcastsSlice = createSlice({
    name: 'podcasts',
    initialState: { 
        podcasts: [],
        podsPage: 1, 
        isLoading: false, 
        podsError: null ,
        loadMoreVisible: true,
    },
    reducers: {
    },
    extraReducers: {
      [getMyFollowingPodcasts.pending]: (state, action) => {
        state.isLoading = true;
        state.podsError = null;
        state.podsPage = action.meta.arg;
        state.loadMoreVisible = false
      },
      [getMyFollowingPodcasts.fulfilled]: (state, action) => {
        state.isLoading = false;
        if(action.meta.arg === 1){
          state.podcasts = []
          action.payload.podcasts.map(res =>{
            state.podcasts.push(res);
        })
        }else{
          action.payload.podcasts.map(res =>{
              state.podcasts.push(res);
          })
        }
        state.podsPage++;
        state.podcasts.length < action.payload.result.docsCount ? state.loadMoreVisible = true : state.loadMoreVisible = false
      },
      [getMyFollowingPodcasts.rejected]: (state, action) => {
        state.isLoading = false;
        state.podsError = action.payload;
        state.podsPage = action.meta.arg;
        state.loadMoreVisible = false
      }, 
      
      
      [likePod.fulfilled]: (state, action) => {
        for (let pod of state.podcasts) {
          if(pod._id === action.payload.id){
              pod.isLiked = true;
              pod.likes++
              break;
          }
        }
      },
      [disLikePod.fulfilled]: (state, action) => {
        for (let pod of state.podcasts) {
          if(pod._id === action.payload.id){
              pod.isLiked = false;
              pod.likes--
              break;
          }
        }
      },
    },
});

export default podcastsSlice.reducer;