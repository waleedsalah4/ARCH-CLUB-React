import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const url = 'https://audiocomms-podcast-platform.herokuapp.com';

const token = JSON.parse(localStorage.getItem('user-token'))

export const discoverUsersReq = createAsyncThunk(
  'discoverPodcasts/discoverUsersReq', 
    async (page, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const response = await fetch(`${url}/api/v1/users/discover?page=${page}&limit=10&sort=-followers`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const res = await response.json();
        if(res.status !== 'fail'){

          return {result: res, users: res.data, page: page}
        } else {
          return rejectWithValue(res.message);
        }
          
      } catch (error) {
        
        return rejectWithValue(error.message);
      }
    }
);





const discoverUsersSlice = createSlice({
    name: 'discoverUsers',
    initialState: { 
        discoverUsers: [],
        discoverUsersPage: 1, 
        isLoading: false, 
        disUsersError: null ,
        loadMoreVisible: true,
    },
    reducers: {
    },
    extraReducers: {
      [discoverUsersReq.pending]: (state, action) => {
        state.isLoading = true;
        state.disUsersError = null;
        state.discoverUsersPage = action.meta.arg;
        state.loadMoreVisible = false
      },
      [discoverUsersReq.fulfilled]: (state, action) => {
        state.isLoading = false; 
        if(action.meta.arg === 1){
            state.discoverUsers = [];
            action.payload.users.map(res =>{
                state.discoverUsers.push(res);
            })
        } else {
            action.payload.users.map(res =>{
                state.discoverUsers.push(res);
            })
        }
        state.discoverUsersPage++;
        state.discoverUsers.length < action.payload.result.docsCount ? state.loadMoreVisible = true : state.loadMoreVisible = false
      },
      [discoverUsersReq.rejected]: (state, action) => {
        state.isLoading = false;
        state.disUsersError = action.payload;
        state.discoverUsersPage = action.meta.arg;
        state.loadMoreVisible = false
      },  
    },
});

export default discoverUsersSlice.reducer;