import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {closeModal} from './modalSlice';
import { followUser, unFollowUser } from './FollowUsersSlice';
const url = 'https://audiocomms-podcast-platform.herokuapp.com';

// const token = JSON.parse(localStorage.getItem('user-token'))

export const getMyFollowers = createAsyncThunk(
  'follow/getMyFollowers', 
    async (page, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const response = await fetch(`${url}/api/v1/users/me/followers?limit=4&page=${page}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user-token'))}`,
            },
        });
        const res = await response.json();
        if(res.status !== 'fail'){
            const {data} = res;
            return {result:res ,users: data, page: page}
        } else {
          return rejectWithValue(res.message);
        }
          
      } catch (error) {
        
        return rejectWithValue(error.message);
      }
    }
);


export const getMyFollowing = createAsyncThunk(
    'follow/getMyFollowing', 
    async (page, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await fetch(`${url}/api/v1/users/me/following?limit=4&page=${page}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user-token'))}`,
                    },
            });
            const res = await response.json();
            if(res.status !== 'fail'){
                    const {data} = res;
                    return {result: res, users: data, page: page}
            } else {
                return rejectWithValue(res.message);
            }
            
        } catch (error) {
          
          return rejectWithValue(error.message);
        }
    }
);

export const getUserFollowing = createAsyncThunk(
    'follow/getUserFollowing', 
    async (data, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await fetch(`${url}/api/v1/users/${data.id}/following?limit=4&page=${data.page}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user-token'))}`,
                    },
            });
            const res = await response.json();
            if(res.status !== 'fail'){
                    const {data} = res;
                    return {result: res, users: data, page: data.page}
            } else {
                return rejectWithValue(res.message);
            }
            
        } catch (error) {
          
          return rejectWithValue(error.message);
        }
    }
);

export const getUserFollowers = createAsyncThunk(
    'follow/getUserFollowers', 
    async (data, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await fetch(`${url}/api/v1/users/${data.id}/followers?limit=4&page=${data.page}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user-token'))}`,
                    },
            });
            const res = await response.json();
            if(res.status !== 'fail'){
                    const {data} = res;
                    return {result: res, users: data, page: data.page}
            } else {
                return rejectWithValue(res.message);
            }
            
        } catch (error) {
          
          return rejectWithValue(error.message);
        }
    }
);




const FollowSlice = createSlice({
    name: 'follow',
    initialState: { 
        followList: [],
        followPage: 1, 
        isLoading: false, 
        followError: null ,
        loadMoreVisible: true,

        followLoading: false,
        followUserError : null
    },
    reducers: {
    },
    extraReducers: {
        [getMyFollowers.pending]: (state, action) => {
            state.isLoading = true;
            state.followError = null;
            state.followPage = action.meta.arg;
            state.loadMoreVisible = false
        }
        ,
        [getMyFollowers.fulfilled]: (state, action) => {
            state.isLoading = false; 
            if(action.meta.arg === 1){
              state.followList = [];
              action.payload.users.map(res =>{
                  state.followList.push(res);
              })
            } else {
              action.payload.users.map(res =>{
                state.followList.push(res);
              })
            }
            state.followPage++;
            state.followList.length < action.payload.result.docsCount ? state.loadMoreVisible = true : state.loadMoreVisible = false
        },

        [getMyFollowers.rejected]: (state, action) => {
            state.isLoading = false;
            state.followError = action.payload;
            state.followPage = action.meta.arg;
            state.loadMoreVisible = false
        },   

        //getMyFollowing
        [getMyFollowing.pending]: (state, action) => {
            state.isLoading = true;
            state.followError = null;
            state.followPage = action.meta.arg;
            state.loadMoreVisible = false
        }
        ,
        [getMyFollowing.fulfilled]: (state, action) => {
            state.isLoading = false; 
            if(action.meta.arg === 1){
              state.followList = [];
              action.payload.users.map(res =>{
                  state.followList.push(res);
              })
            } else {
              action.payload.users.map(res =>{
                state.followList.push(res);
              })
            }
            state.followPage++;
            state.followList.length < action.payload.result.docsCount ? state.loadMoreVisible = true : state.loadMoreVisible = false
        },

        [getMyFollowing.rejected]: (state, action) => {
            state.isLoading = false;
            state.followError = action.payload;
            state.followPage = action.meta.arg;
            state.loadMoreVisible = false
        },

        //getUserFollowing
        [getUserFollowing.pending]: (state, action) => {
            state.isLoading = true;
            state.followError = null;
            state.followPage = action.meta.arg.page;
            state.loadMoreVisible = false
        }
        ,
        [getUserFollowing.fulfilled]: (state, action) => {
            state.isLoading = false; 
            if(action.meta.arg.page === 1){
              state.followList = [];
              action.payload.users.map(res =>{
                  state.followList.push(res);
              })
            } else {
              action.payload.users.map(res =>{
                state.followList.push(res);
              })
            }
            state.followPage++;
            state.followList.length < action.payload.result.docsCount ? state.loadMoreVisible = true : state.loadMoreVisible = false
        },

        [getUserFollowing.rejected]: (state, action) => {
            state.isLoading = false;
            state.followError = action.payload;
            state.followPage = action.meta.arg.page;
            state.loadMoreVisible = false
        },

        //getUserFollowers
        [getUserFollowers.pending]: (state, action) => {
            state.isLoading = true;
            state.followError = null;
            state.followPage = action.meta.arg.page;
            state.loadMoreVisible = false
        }
        ,
        [getUserFollowers.fulfilled]: (state, action) => {
            state.isLoading = false; 
            if(action.meta.arg.page === 1){
              state.followList = [];
              action.payload.users.map(res =>{
                  state.followList.push(res);
              })
            } else {
              action.payload.users.map(res =>{
                state.followList.push(res);
              })
            }
            state.followPage++;
            state.followList.length < action.payload.result.docsCount ? state.loadMoreVisible = true : state.loadMoreVisible = false
        },

        [getUserFollowers.rejected]: (state, action) => {
            state.isLoading = false;
            state.followError = action.payload;
            state.followPage = action.meta.arg.page;
            state.loadMoreVisible = false;
            
        },

        //follow
      [followUser.pending]: (state, action) => {
        state.followLoading= true;
        state.followUserError = null

      }
      ,
      [followUser.fulfilled]: (state, action) => {
        state.followLoading= false;
        if(action.payload.type === 'followModal'){
          for (let user of state.followList) {
            if(user.follower?._id === action.payload.id){
              user.follower.isFollowed = true;
              break;
            } else if (user.following?._id === action.payload.id){
              user.following.isFollowed = true;
              break;
            } 
          }
        }
      },

      [followUser.rejected]: (state, action) => {
        state.followLoading= false;
        state.followUserError = action.payload  
      },

      [unFollowUser.pending]: (state, action) => {
        state.followLoading= true;
        state.followError = null

      }
      ,
      [unFollowUser.fulfilled]: (state, action) => {
        state.followLoading= false;
        if(action.payload.type === 'followModal'){
          // console.log('how the fuck i get in')
          for (let user of state.followList) {
            if(user.follower?._id === action.payload.id){
                user.follower.isFollowed = false;
                break;
            } else if (user.following?._id === action.payload.id){
              user.following.isFollowed = false;
                break;
            }
          }
        }
      },

      [unFollowUser.rejected]: (state, action) => {
        state.followLoading= false;
        state.followError = action.payload
          
      },

      [closeModal]: (state, action)=>{
            state.isLoading = false;
            state.followError = null;
            state.followList = [];
            state.followPage = 1;
            state.loadMoreVisible = false;

            state.followError = null;
            state.followLoading = false
      }
    },
});

export default FollowSlice.reducer;