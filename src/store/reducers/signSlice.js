import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const url = 'https://audiocomms-podcast-platform.herokuapp.com';


export const login = createAsyncThunk(
  'sign/logIn', 
    async (data, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const response = await fetch(`${url}/api/v1/users/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const res = await response.json();
        if(res.status !== 'fail'){

          const {data} = res;
          const {token} = res;
          const obj = {
            token,
            userData: data.user
          }
  
          localStorage.setItem('user-data', JSON.stringify(data.user));
          localStorage.setItem('user-token', JSON.stringify(token));
          localStorage.setItem('isLoggedIn', true);

          return obj
        } else {
          return rejectWithValue(res.message);
        }
          
      } catch (error) {
        
        return rejectWithValue(error.message);
      }
    }
);


export const signup = createAsyncThunk(
  'sign/signup', 
    async (data, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const response = await fetch(`${url}/api/v1/users/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const res = await response.json();
        if(res.status !== 'fail'){

          const {data} = res;
          const {token} = res;
          const obj = {
            token,
            userData: data.user
          }
  
          localStorage.setItem('user-data', JSON.stringify(data.user));
          localStorage.setItem('user-token', JSON.stringify(token));
          localStorage.setItem('isLoggedIn', true);

          return obj
        } else {
          return rejectWithValue(res.message);
        }
          
      } catch (error) {
        
        return rejectWithValue(error.message);
      }
    }
);



const sign = createSlice({
    name: 'sign',
    initialState: { 
      userData: JSON.parse(localStorage.getItem('user-data')) || null,
      isLoading: false,
      isLogged: false,
      LogError: null,
      signupError: null
    },
    reducers: {
      logOut: (state, action)=>{
        state.userData = null;
      }
    },
    extraReducers: {
      [login.pending]: (state, action) => {
        state.isLoading = true;
        state.LogError = null;
      },
      [login.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.isLogged= true;
        state.userData = action.payload.userData;
      },
      [login.rejected]: (state, action) => {
        state.isLoading = false;
        state.LogError = action.payload;
      },

      //sign up
      [signup.pending]: (state, action) => {
        state.isLoading = true;
        state.signupError = null;
      },
      [signup.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.isLogged= true;
        state.userData = action.payload.userData;
      },
      [signup.rejected]: (state, action) => {
        state.isLoading = false;
        state.signupError = action.payload;
      },
  
    },
  });

export const {logOut} = sign.actions;
export default sign.reducer;