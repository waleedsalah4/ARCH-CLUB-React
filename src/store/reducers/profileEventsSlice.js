import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { closeModal } from './modalSlice';

const url = 'https://audiocomms-podcast-platform.herokuapp.com';

const token = JSON.parse(localStorage.getItem('user-token'))

export const getMyEvents = createAsyncThunk(
  'profileEvents/getMyEvents', 
    async (page, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const response = await fetch(`${url}/api/v1/events/me/?limit=4&page=${page}`, {
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

export const getOtherUserEvents = createAsyncThunk(
    'profileEvents/getOtherUserEvents', 
      async (data, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
          const response = await fetch(`${url}/api/v1/events/?createdBy=${data.id}&limit=4&page=${data.page}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
          });
          const res = await response.json();
          if(res.status !== 'fail'){
            return {result: res, events: res.data, page: data.page}
          } else {
            return rejectWithValue(res.message);
          }
            
        } catch (error) {
          
          return rejectWithValue(error.message);
        }
    }
);

export const deleteEvent = createAsyncThunk(
    'profileEvents/deleteEvent', 
      async (id, thunkAPI) => {
        const { rejectWithValue,dispatch } = thunkAPI;
        try {
          const response = await fetch(`${url}/api/v1/events/${id}`, {
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




const profileEventsSlice = createSlice({
    name: 'profileEvents',
    initialState: { 
        events: [],
        profileEventsPage: 1, 
        isLoading: false, 
        profileEventError: null ,
        loadMoreVisible: true,

        deleteError: null,
        deleteLoading: false
    },
    reducers: {
    },
    extraReducers: {
      [getMyEvents.pending]: (state, action) => {
        state.isLoading = true;
        state.profileEventError = null;
        state.profileEventsPage = action.meta.arg;
        state.loadMoreVisible = false
      },
      [getMyEvents.fulfilled]: (state, action) => {
        state.isLoading = false; 
        if(action.meta.arg === 1){
            state.events = [];
            action.payload.events.map(res =>{
                state.events.push(res);
            })
        } else {
            action.payload.events.map(res =>{
                state.events.push(res);
            })
        }
        state.profileEventsPage = action.payload.page + 1;
        state.events.length < action.payload.result.docsCount ? state.loadMoreVisible = true : state.loadMoreVisible = false
      },
      [getMyEvents.rejected]: (state, action) => {
        state.isLoading = false;
        state.profileEventError = action.payload;
        state.profileEventsPage = action.meta.arg;
        state.loadMoreVisible = false
      }, 

      //get other user podcasts
      [getOtherUserEvents.pending]: (state, action) => {
        state.isLoading = true;
        state.profileEventError = null;
        state.profileEventsPage = action.meta.arg.page;
        state.loadMoreVisible = false
      },
      [getOtherUserEvents.fulfilled]: (state, action) => {
        state.isLoading = false; 
        if(action.meta.arg.page === 1){
            state.events = [];
            action.payload.events.map(res =>{
                state.events.push(res);
            })
        } else {
          action.payload.events.map(res =>{
            state.events.push(res);
          })
        }
        state.profileEventsPage = action.payload.page + 1;
        state.events.length < action.payload.result.docsCount ? state.loadMoreVisible = true : state.loadMoreVisible = false
      },
      [getOtherUserEvents.rejected]: (state, action) => {
        state.isLoading = false;
        state.profileEventError = action.payload;
        console.log(action)
        state.profileEventsPage = action.meta.arg.page;
        state.loadMoreVisible = false
      },

      //delete Podcast
      [deleteEvent.pending]: (state, action) => {
        state.deleteError = null;
        state.deleteLoading = true;
      },
      [deleteEvent.fulfilled]: (state, action) => {
        state.events = state.events.filter(event => event._id !== action.payload.id)
        state.deleteLoading = false
      },
      [deleteEvent.rejected]: (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload.result.message;
      },
      
    },
});

export default profileEventsSlice.reducer;