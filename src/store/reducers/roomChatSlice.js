import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {closeFixedModal} from './fixedModalSlice';

import { url } from '../actions/config';

export const getOldMassegs = createAsyncThunk(
    'roomChat/getOldMassegs', 
      async (data, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
          const response = await fetch(`${url}/api/v1/rooms/${data.id}/chat?page=${data.page}`, {
              method: 'GET',
              headers: {
                  Authorization: `Bearer ${JSON.parse(localStorage.getItem('user-token'))}`,
              },
          });
          const res = await response.json();
          if(res.status !== 'fail'){
            return {res: res,chat: res.data, page: data.page}
          } else {
            return rejectWithValue(res.message);
          }
            
        } catch (error) {
          
          return rejectWithValue(error.message);
        }
      }
);


const initialState = {
    isLoading: false,
    chatError: null, 
    loadMoreVisible: false,
    currPage: 1,
    roomMessages : [],
}
const roomChatSlice = createSlice({
    name: 'roomChat',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.roomMessages.push(action.payload)
        },
        removeMessage: (state, action) => {
            state.roomMessages = state.roomMessages.filter(msg => msg._id !== action.payload._id )
        }
    },
    extraReducers: {
        [getOldMassegs.pending]: (state, action) => {
            state.isLoading= true;
            state.chatError = null;
            state.loadMoreVisible= false
            state.currPage = action.meta.arg.page;
        },
        [getOldMassegs.fulfilled]: (state, action) => {
            state.isLoading= false;
            if(action.meta.arg.page === 1){
                state.roomMessages = []
                action.payload.chat && action.payload.chat.map(res =>{
                    state.roomMessages.unshift(res);
                })
            }else{
                action.payload.chat.map(res => state.roomMessages.unshift(res))
            }
            state.currPage = action.payload.page + 1;
            state.roomMessages.length < action.payload.res.docsCount ? state.loadMoreVisible = true : state.loadMoreVisible = false;
        },
        [getOldMassegs.rejected]: (state, action) => {
            state.isLoading= false;
            state.chatError = action.payload;
            state.currPage = action.meta.arg.page;
        },

        [closeFixedModal] : (state,action) => {
            state.isLoading = false
            state.chatError = false 
            state.loadMoreVisible= false
            state.roomMessages = []
        }
    }
})

export const { addMessage, removeMessage } = roomChatSlice.actions;

export default roomChatSlice.reducer;