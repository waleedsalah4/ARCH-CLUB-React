import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const url = 'https://audiocomms-podcast-platform.herokuapp.com';

const token = JSON.parse(localStorage.getItem('user-token'))

export const getMyFollowingEvents = createAsyncThunk(
  'events/getMyFollowingEvents', 
    async (page, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const response = await fetch(`${url}/api/v1/events?limit=4&page=${page}&sort=createdAt`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const res = await response.json();
        if(res.status !== 'fail'){

          return {result: res, events: res.data, page: page}
        } else {
          return rejectWithValue(res.message);
        }
          
      } catch (error) {
        
        return rejectWithValue(error.message);
      }
    }
);





const eventsSlice = createSlice({
    name: 'events',
    initialState: { 
        events: [],
        eventPage: 1, 
        isLoading: false, 
        eventError: null ,
        loadMoreVisible: true,
    },
    reducers: {
    },
    extraReducers: {
      [getMyFollowingEvents.pending]: (state, action) => {
        state.isLoading = true;
        state.eventError = null;
        state.eventPage = action.meta.arg;
        state.loadMoreVisible = false
      },
      [getMyFollowingEvents.fulfilled]: (state, action) => {
        state.isLoading = false; 
        action.payload.events.map(res =>{
            state.events.push(res);
        })
        state.eventPage++;
        state.events.length < action.payload.result.docsCount ? state.loadMoreVisible = true : state.loadMoreVisible = false
      },
      [getMyFollowingEvents.rejected]: (state, action) => {
        state.isLoading = false;
        state.eventError = action.payload;
        // state.eventPage = 1;
        state.eventPage = action.meta.arg;
        state.loadMoreVisible = false
      },  
    },
});

export default eventsSlice.reducer;