import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { closeModal } from './modalSlice';
import { followUser,unFollowUser } from './FollowUsersSlice';
const url = 'https://audiocomms-podcast-platform.herokuapp.com';
// const token = JSON.parse(localStorage.getItem('user-token'))

export const getUser = createAsyncThunk(
  'profile/getUser', 
    async (id, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const response = await fetch(`${url}/api/v1/users/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user-token'))}`,
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
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user-token'))}`,
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


export const updateMe = createAsyncThunk(
  'profile/updateMe', 
    async (data, thunkAPI) => {
      const { rejectWithValue,dispatch } = thunkAPI;
      try {
        const response = await fetch(`${url}/api/v1/users/updateMe`, {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('user-token'))}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const res = await response.json();
        if(res.status !== 'fail'){
          localStorage.setItem('user-data', JSON.stringify(res.user))
          dispatch(closeModal())
          return res.user
        } else {
          return rejectWithValue(res.message);
        }
          
      } catch (error) {
        
        return rejectWithValue(error.message);
      }
    }
);

export const changePhoto = createAsyncThunk(
  'profile/changePhoto', 
    async (photo, thunkAPI) => {
      const { rejectWithValue,dispatch } = thunkAPI;
      try {
        const response = await fetch(`${url}/api/v1/users/updateMyPhoto`, {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('user-token'))}`,
            },
            body: photo
        });
        const res = await response.json();
        if(res.status !== 'fail'){
          localStorage.setItem('user-data', JSON.stringify(res.user))
          dispatch(closeModal())
          return res.user
        } else {
          return rejectWithValue(res.message);
        }
          
      } catch (error) {
        
        return rejectWithValue(error.message);
      }
    }
);

export const changePassword = createAsyncThunk(
  'profile/changePassword', 
    async (data, thunkAPI) => {
      const { rejectWithValue,dispatch } = thunkAPI;
      try {
        const response = await fetch(`${url}/api/v1/users/updateMyPassword`, {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('user-token'))}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const res = await response.json();
        if(res.status !== 'fail'){
          dispatch(closeModal())
          return res
        } else {
          return rejectWithValue(res.message);
        }
          
      } catch (error) {
        
        return rejectWithValue(error.message);
      }
    }
);

export const deleteAccount = createAsyncThunk(
  'profile/deleteAccount', 
    async (_, thunkAPI) => {
      const { rejectWithValue,dispatch } = thunkAPI;
      try {
        const response = await fetch(`${url}/api/v1/users/deleteMe`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('user-token'))}`
            }
        });
        // const res = await response.json();
          dispatch(closeModal())
          return 
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
      profileError: null,

      editLoading: false,
      editError: null,

      editPhotoLoading: false,
      editPhotoError: null,

      changePassLoading: false,
      changePassError: null,

      deleteLoading: false,
      deleteError: null,

      followUserLoading: false,
      followUserError: null
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

      //getUser up
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

       //Update me
       [updateMe.pending]: (state, action) => {
        state.editLoading = true;
        state.editError = null;
      },
      [updateMe.fulfilled]: (state, action) => {
        state.editLoading = false;
        state.userData = action.payload;
      },
      [updateMe.rejected]: (state, action) => {
        state.editLoading = false;
        state.editError = action.payload;
      },

        //follow
        [followUser.pending]: (state, action) => {
          state.followUserLoading= true;
          state.followUserError = null
  
        }
        ,
        [followUser.fulfilled]: (state, action) => {
          state.followUserLoading= false;
          // console.log(action.payload)
          if(action.payload.type === 'userData') {
            // console.log('how the fuck i get in')
            let userInfo = state.userData;
            userInfo.isFollowed = true
            state.userData = userInfo;
          }
        },
  
        [followUser.rejected]: (state, action) => {
          state.followUserLoading= false;
          state.followUserError = action.payload  
        },
  
        [unFollowUser.pending]: (state, action) => {
          state.followUserLoading= true;
          state.followError = null
  
        }
        ,
        [unFollowUser.fulfilled]: (state, action) => {
          state.followUserLoading= false;
          if(action.payload.type === 'userData') {
            let userInfo = state.userData;
            userInfo.isFollowed = false
            state.userData = userInfo;
          }
        },
  
        [unFollowUser.rejected]: (state, action) => {
          state.followUserLoading= false;
          state.followError = action.payload
            
        },

        //change photo
        [changePhoto.pending]: (state, action) => {
          state.editPhotoLoading = true;
          state.editPhotoError = null;
        },
        [changePhoto.fulfilled]: (state, action) => {
          state.editPhotoLoading = false;
          state.userData = action.payload;
        },
        [changePhoto.rejected]: (state, action) => {
          state.editPhotoLoading = false;
          state.editPhotoError = action.payload;
        },
      //change password
      [changePassword.pending]: (state, action) => {
        state.changePassLoading = true;
        state.changePassError = null;
      },
      [changePassword.fulfilled]: (state, action) => {
        state.changePassLoading = false;
      },
      [changePassword.rejected]: (state, action) => {
        state.changePassLoading = false;
        state.changePassError = action.payload;
      },

      //delete account
      [deleteAccount.pending]: (state, action) => {
        state.deleteLoading = true;
        state.deleteError = null;
      },
      [deleteAccount.fulfilled]: (state, action) => {
        state.deleteLoading = false;
      },
      [deleteAccount.rejected]: (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload;
      },
  
    },
});

export default profileSlice.reducer;