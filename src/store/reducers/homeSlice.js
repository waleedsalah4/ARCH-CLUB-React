import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { url } from '../actions/config';


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

export const getPrivateRoom = createAsyncThunk(
  'home/getPrivateRoom', 
    async (id, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const response = await fetch(`${url}/api/v1/rooms/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user-token'))}`,
            },
        });
        const res = await response.json();
        if(res.status !== 'fail'){
          const {data} = res;
          return {res, data}
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

      roomIsLoading: false,
      roomError: null,
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
        if(action.meta.arg === 1){
          state.rooms = [];
          action.payload.rooms.map(res =>{
            state.rooms.push(res);
          })
        } else {
          action.payload.rooms.map(res =>{
              state.rooms.push(res);
          })
        }
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
      [getPrivateRoom.pending]: (state, action) => {
        state.roomIsLoading = true;
        state.roomError = null
      },
      [getPrivateRoom.fulfilled]: (state, action) => {
        state.roomIsLoading = false;
      },
      [getPrivateRoom.rejected]: (state, action) => {
        state.roomIsLoading = false;
        state.roomError = action.payload
      }
    },
});

export default homeSlice.reducer;