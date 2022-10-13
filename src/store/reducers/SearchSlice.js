import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { followUser,unFollowUser } from './FollowUsersSlice';
import { likePod,disLikePod } from './likeSlice';
const url = 'https://audiocomms-podcast-platform.herokuapp.com';


export const searchUser = createAsyncThunk(
  'search/searchUser', 
    async (data, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const response = await fetch(`${url}/api/v1/users/search?s=${data.value}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user-token'))}`,
            },
        });
        const res = await response.json();
        if(res.status !== 'fail'){

          return {users: res.data}
        } else {
          return rejectWithValue(res.message);
        }
          
      } catch (error) {
        
        return rejectWithValue(error.message);
      }
    }
);

export const searchForPodcasts = createAsyncThunk(
    'search/searchForPodcasts', 
      async (data, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
          const response = await fetch(`${url}/api/v1/podcasts/search?s=${data.value}`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user-token'))}`,
              },
          });
          const res = await response.json();
          if(res.status !== 'fail'){
  
            return {podcasts: res.data}
          } else {
            return rejectWithValue(res.message);
          }
            
        } catch (error) {
          
          return rejectWithValue(error.message);
        }
    }
);

export const searchForRooms = createAsyncThunk(
    'search/searchForRooms', 
      async (data, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
          const response = await fetch(`${url}/api/v1/rooms/search?s=${data.value}`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user-token'))}`,
              },
          });
          const res = await response.json();
          if(res.status !== 'fail'){
  
            return {rooms: res.data}
          } else {
            return rejectWithValue(res.message);
          }
            
        } catch (error) {
          
          return rejectWithValue(error.message);
        }
    }
);




const SearchSlice = createSlice({
    name: 'search',
    initialState: { 
        users: [],
        isLoadingUsers: false, 
        usersError: null ,
        followUserError: null,

        rooms: [],
        isLoadingRooms: false, 
        roomsError: null ,

        podcasts: [],
        isLoadingPodcasts: false, 
        podcastsError: null ,

    },
    reducers: {
    },
    extraReducers: {
      [searchUser.pending]: (state, action) => {
        state.isLoadingUsers = true;
        state.usersError = null;
      },
      [searchUser.fulfilled]: (state, action) => {
        state.isLoadingUsers = false; 
        if(action.meta.arg.page === 1){
            state.users = [];
            action.payload.users.map(res =>{
                state.users.push(res);
            })
        } else {
            action.payload.users.map(res =>{
                state.users.push(res);
            })
        }
      },
      [searchUser.rejected]: (state, action) => {
        state.isLoadingUsers = false;
        state.usersError = action.payload;
      },  

      //follow
      [followUser.pending]: (state, action) => {
        state.followUserError = null
      }
      ,
      [followUser.fulfilled]: (state, action) => {
        state.followLoading= false;
        // if(action.payload.type === 'search'){
          for (let user of state.users) {
            if(user._id === action.payload.id){
              user.isFollowed = true;
              break;
            }
          }
        // }
      },
      [followUser.rejected]: (state, action) => {
        state.followUserError = action.payload  
      },

      //unfollow
      [unFollowUser.pending]: (state, action) => {
        state.followError = null
      }
      ,
      [unFollowUser.fulfilled]: (state, action) => {
        // if(action.payload.type === 'search'){
          for (let user of state.users) {
            if(user._id === action.payload.id){
              user.isFollowed = false;
              break;
            }
          }
        // }
      },
      [unFollowUser.rejected]: (state, action) => {
            state.followError = action.payload
          
      },

      [searchForPodcasts.pending]: (state, action) => {
            state.isLoadingPodcasts = true;
            state.podcastsError = null;
      },
      [searchForPodcasts.fulfilled]: (state, action) => {
        state.isLoadingPodcasts = false; 
        if(action.meta.arg.page === 1){
            state.podcasts = [];
            action.payload.podcasts.map(res =>{
                state.podcasts.push(res);
            })
        } else {
            action.payload.podcasts.map(res =>{
                state.podcasts.push(res);
            })
        }
      },
      [searchForPodcasts.rejected]: (state, action) => {
            state.isLoadingPodcasts = false;
            state.podcastsError = action.payload;
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

      [searchForRooms.pending]: (state, action) => {
          state.isLoadingRooms = true;
          state.roomsError = null;
      },
      [searchForRooms.fulfilled]: (state, action) => {
          state.isLoadingRooms = false; 
          if(action.meta.arg.page === 1){
              state.rooms = [];
              action.payload.rooms.map(res =>{
                  state.rooms.push(res);
              })
          } else {
              action.payload.rooms.map(res =>{
                  state.rooms.push(res);
              })
          }
      },
      [searchForRooms.rejected]: (state, action) => {
          state.isLoadingRooms = false;
          state.roomsError = action.payload;
      },

    },


});

export default SearchSlice.reducer;