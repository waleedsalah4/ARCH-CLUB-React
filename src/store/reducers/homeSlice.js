import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const url = 'https://audiocomms-podcast-platform.herokuapp.com';

// const token = JSON.parse(localStorage.getItem('user-token'))

export const getActiveRooms = createAsyncThunk(
  'home/getActiveRooms', 
    async (page, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const response = await fetch(`${url}/api/v1/rooms?limit=4&page=${page}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user-token'))}`,
            },
        });
        const res = await response.json();
        if(res.status !== 'fail'){

          return {result: res, rooms: res.data, page: page}
        } else {
          return rejectWithValue(res.message);
        }
          
      } catch (error) {
        
        return rejectWithValue(error.message);
      }
    }
);





const homeSlice = createSlice({
    name: 'home',
    initialState: { 
        rooms: [],
        homePage: 1, 
        isLoading: false, 
        homeError: null ,
        loadMoreVisible: true,
    },
    reducers: {
    },
    extraReducers: {
      [getActiveRooms.pending]: (state, action) => {
        state.isLoading = true;
        state.homeError = null;
        state.homePage = action.meta.arg;
        state.loadMoreVisible = false
      },
      [getActiveRooms.fulfilled]: (state, action) => {
        state.isLoading = false; 
        action.payload.rooms.map(res =>{
            state.rooms.push(res);
        })
        state.homePage++;
        state.rooms.length < action.payload.result.docsCount ? state.loadMoreVisible = true : state.loadMoreVisible = false
      },
      [getActiveRooms.rejected]: (state, action) => {
        state.isLoading = false;
        state.homeError = action.payload;
        // state.homePage = 1;
        state.homePage = action.meta.arg;
        state.loadMoreVisible = false
      },  
    },
});

export default homeSlice.reducer;