import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { likePod, disLikePod } from './likeSlice'; 
import { closeModal } from './modalSlice';

const url = 'https://audiocomms-podcast-platform.herokuapp.com';

const token = JSON.parse(localStorage.getItem('user-token'))

export const getMyPodcasts = createAsyncThunk(
  'profilePodcasts/getMyPodcasts', 
    async (page, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const response = await fetch(`${url}/api/v1/podcasts/me?limit=4&page=${page}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
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

export const getOtherUserPodcasts = createAsyncThunk(
    'profilePodcasts/getOtherUserPodcasts', 
      async (data, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
          const response = await fetch(`${url}/api/v1/podcasts?createdBy=${data.id}&limit=4&page=${data.page}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
          });
          const res = await response.json();
          if(res.status !== 'fail'){
            return {result: res, podcasts: res.data, page: data.page}
          } else {
            return rejectWithValue(res.message);
          }
            
        } catch (error) {
          
          return rejectWithValue(error.message);
        }
    }
);

export const deletePodcast = createAsyncThunk(
    'profilePodcasts/deletePodcast', 
      async (id, thunkAPI) => {
        const { rejectWithValue,dispatch } = thunkAPI;
        try {
          const response = await fetch(`${url}/api/v1/podcasts/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
          });
          const res = await response.json();
          if(res.status !== 'fail'){
            dispatch(closeModal())
            return {result: res, id: id}
          } else {
            return rejectWithValue(res.message);
          }
            
        } catch (error) {
          
          return rejectWithValue(error.message);
        }
    }
);




const profilePodcastsSlice = createSlice({
    name: 'profilePodcasts',
    initialState: { 
        profilePodcasts: [],
        profilePodsPage: 1, 
        isLoading: false, 
        profilePodError: null ,
        loadMoreVisible: true,

        deleteError: null,
        deleteLoading: false
    },
    reducers: {
    },
    extraReducers: {
      [getMyPodcasts.pending]: (state, action) => {
        state.isLoading = true;
        state.profilePodError = null;
        state.profilePodsPage = action.meta.arg;
        state.loadMoreVisible = false
      },
      [getMyPodcasts.fulfilled]: (state, action) => {
        state.isLoading = false; 
        if(action.meta.arg === 1){
            state.profilePodcasts = [];
            action.payload.podcasts.map(res =>{
                state.profilePodcasts.push(res);
            })
        } else {
            action.payload.podcasts.map(res =>{
                state.profilePodcasts.push(res);
            })
        }
        state.profilePodsPage = action.payload.page + 1;
        state.profilePodcasts.length < action.payload.result.docsCount ? state.loadMoreVisible = true : state.loadMoreVisible = false
      },
      [getMyPodcasts.rejected]: (state, action) => {
        state.isLoading = false;
        state.profilePodError = action.payload;
        state.profilePodsPage = action.meta.arg;
        state.loadMoreVisible = false
      }, 

      //get other user podcasts
      [getOtherUserPodcasts.pending]: (state, action) => {
        state.isLoading = true;
        state.profilePodError = null;
        state.profilePodsPage = action.meta.arg.page;
        state.loadMoreVisible = false
      },
      [getOtherUserPodcasts.fulfilled]: (state, action) => {
        state.isLoading = false; 
        if(action.meta.arg.page === 1){
            state.profilePodcasts = [];
            action.payload.podcasts.map(res =>{
                state.profilePodcasts.push(res);
            })
        } else {
          action.payload.podcasts.map(res =>{
            state.profilePodcasts.push(res);
          })
        }
        state.profilePodsPage = action.payload.page + 1;
        state.profilePodcasts.length < action.payload.result.docsCount ? state.loadMoreVisible = true : state.loadMoreVisible = false
      },
      [getOtherUserPodcasts.rejected]: (state, action) => {
        state.isLoading = false;
        state.profilePodError = action.payload;
        console.log(action)
        state.profilePodsPage = action.meta.arg.page;
        state.loadMoreVisible = false
      },

      //delete Podcast
      [deletePodcast.pending]: (state, action) => {
        state.deleteError = null;
        state.deleteLoading = true;
      },
      [deletePodcast.fulfilled]: (state, action) => {
        state.profilePodcasts = state.profilePodcasts.filter(pod => pod._id !== action.payload.id)
        state.deleteLoading = false
      },
      [deletePodcast.rejected]: (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload.result.message;
      },
      
      [likePod.fulfilled]: (state, action) => {
        for (let pod of state.profilePodcasts) {
            if(pod._id === action.payload.id){
                pod.isLiked = true;
                pod.likes++
                break;
            }
        }
      },
      [disLikePod.fulfilled]: (state, action) => {
        for (let pod of state.profilePodcasts) {
            if(pod._id === action.payload.id){
                pod.isLiked = false;
                pod.likes--
                break;
            }
        }
      },
    },
});

export default profilePodcastsSlice.reducer;