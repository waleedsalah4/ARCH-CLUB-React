import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { likePod, disLikePod } from './likeSlice'; 

const url = 'https://audiocomms-podcast-platform.herokuapp.com';

export const getAllPodcasts = createAsyncThunk(
  'discoverPodcasts/getAllPodcasts', 
    async (page, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const response = await fetch(`${url}/api/v1/podcasts/notMe?page=${page}&limit=6`, {
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





const discoverPodcastsSlice = createSlice({
    name: 'discoverPodcasts',
    initialState: { 
        discoverPodcasts: [],
        discoverPodsPage: 1, 
        isLoading: false, 
        disPodError: null ,
        loadMoreVisible: true,
    },
    reducers: {
    },
    extraReducers: {
      [getAllPodcasts.pending]: (state, action) => {
        state.isLoading = true;
        state.disPodError = null;
        state.discoverPodsPage = action.meta.arg;
        state.loadMoreVisible = false
      },
      [getAllPodcasts.fulfilled]: (state, action) => {
        state.isLoading = false; 
        if(action.meta.arg === 1){
          state.discoverPodcasts = [];
          action.payload.podcasts.map(res =>{
              state.discoverPodcasts.push(res);
          })
        } else {
          action.payload.podcasts.map(res =>{
            state.discoverPodcasts.push(res);
          })
        }
        state.discoverPodsPage++;
        state.discoverPodcasts.length < action.payload.result.docsCount ? state.loadMoreVisible = true : state.loadMoreVisible = false
      },
      [getAllPodcasts.rejected]: (state, action) => {
        state.isLoading = false;
        state.disPodError = action.payload;
        state.discoverPodsPage = action.meta.arg;
        state.loadMoreVisible = false
      }, 
      
      
      [likePod.fulfilled]: (state, action) => {
        for (let pod of state.discoverPodcasts) {
          if(pod._id === action.payload.id){
              pod.isLiked = true;
              pod.likes++
              break;
          }
        }
      },
      [disLikePod.fulfilled]: (state, action) => {
        for (let pod of state.discoverPodcasts) {
          if(pod._id === action.payload.id){
              pod.isLiked = false;
              pod.likes--
              break;
          }
        }
      },
    },
});

export default discoverPodcastsSlice.reducer;