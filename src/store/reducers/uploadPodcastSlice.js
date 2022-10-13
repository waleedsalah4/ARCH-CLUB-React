import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { closeModal,openModal } from './modalSlice';
const url = 'https://audiocomms-podcast-platform.herokuapp.com';


//req 1
export const generateSignature = createAsyncThunk(
  'uploadPodcast/generateSignature', 
    async (data, thunkAPI) => {
      const { rejectWithValue, dispatch } = thunkAPI;
      try {
        const response = await fetch(`${url}/api/v1/podcasts/generateSignature`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user-token'))}`
            }
        });
        const res = await response.json();
        if(response.ok){
            //dispatch upload to cloudinary
            const dataObj = {
              ...data,
              ...res
            }
            dispatch(uploadToCloudinary(dataObj))
          return res
        } else {
          return rejectWithValue(res.message);
        }
          
      } catch (error) {
        
        return rejectWithValue(error.message);
      }
    }
);

//req 2
export const uploadToCloudinary = createAsyncThunk(
    'uploadPodcast/uploadToCloudinary', 
      async (data, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI;
        try {

            let formdata = new FormData();
            formdata.append('file', data.file);
            formdata.append('folder',"podcasts");
            formdata.append("resource_type", "audio");

            const response = await fetch(`https://api.cloudinary.com/v1_1/${data.cloudName}/video/upload?api_key=${data.apiKey}&timestamp=${data.timestamp}&signature=${data.signature}`, {
                method: 'POST',
                body: formdata,
            });
          const res = await response.json();
          if(response.ok){
            //dispatch create podcasts (data, publicKey)
            const dataObj = {
              name: data.podcastName,
              category: data.categories,
              ...res
            }
            dispatch(createPodcast(dataObj))
            return res
          } else {
            return rejectWithValue(res.message);
          }
            
        } catch (error) {
          
          return rejectWithValue(error.message);
        }
    }
);

//req 3
export const createPodcast = createAsyncThunk(
    'uploadPodcast/createPodcast', 
      async (data, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI;
        try {
            const podcastBody = {
                name: data.name,
                category: data.category,
                audio: {
                    public_id: data.public_id,
                }
            }
            const response = await fetch(`${url}/api/v1/podcasts`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user-token'))}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(podcastBody),
            });
          const res = await response.json();
          if(res.status !== 'fail'){
            if(res.status === 'success'){
              dispatch(closeModal())
              dispatch(openModal({name: 'Success', childrenProps:{
                  message: 'podcasts has been uploaded successfully'
              }}))
            }
            return res
          } else {
            return rejectWithValue(res.message);
          }
            
        } catch (error) {
          
          return rejectWithValue(error.message);
        }
    }
);




const uploadPodcastSlice = createSlice({
    name: 'uploadPodcast',
    initialState: { 
        uploadedPodcast: '',
        isLoading: false, 
        createPodError: null ,
    },
    reducers: {
    },
    extraReducers: {
        [generateSignature.pending]: (state, action) => {
            state.isLoading = true;
            state.createPodError = null;
        },
        [generateSignature.fulfilled]: (state, action) => {
            state.isLoading = true; 
            state.uploadedPodcast = action.payload;
        },
        [generateSignature.rejected]: (state, action) => {
            state.isLoading = false;
            state.createPodError = action.payload;
        },  
        //cloudinaryState
        [uploadToCloudinary.pending]: (state, action) => {
            state.isLoading = true;
            state.createPodError = null;
        },
        [uploadToCloudinary.fulfilled]: (state, action) => {
            state.isLoading = true; 
            state.uploadedPodcast = action.payload;
        },
        [uploadToCloudinary.rejected]: (state, action) => {
            state.isLoading = false;
            state.createPodError = action.payload;
        },

        //createState
        [createPodcast.pending]: (state, action) => {
            state.isLoading = true;
            state.createPodError = null;
        },
        [createPodcast.fulfilled]: (state, action) => {
            state.isLoading = false; 
            
            state.uploadedPodcast = action.payload
        },
        [createPodcast.rejected]: (state, action) => {
            state.isLoading = false;
            state.createPodError = action.payload;
        },

    },
});

export default uploadPodcastSlice.reducer;