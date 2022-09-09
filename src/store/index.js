import { configureStore } from "@reduxjs/toolkit";
import modal from './reducers/modalSlice';
import fixedModalSlice from "./reducers/fixedModalSlice";

import signSlice from "./reducers/signSlice";
import forgotSlice from "./reducers/forgotPasswordSlice";

import eventsSlice from "./reducers/eventsSlice";
import CreateEventSlice from "./reducers/CreateEventSlice";
import discoverPodcastsSlice from "./reducers/discoverPodcastsSlice";
import discoverUsersSlice from "./reducers/discoverUsersSlice";
import podcastsSlice from "./reducers/podcastsSlice";
import likeSlice from "./reducers/likeSlice";
import uploadPodcastSlice from "./reducers/uploadPodcastSlice";

import profileSlice from "./reducers/profileSlice";
import profilePodcastsSlice from "./reducers/profilePodcastsSlice";
import profileEventsSlice from "./reducers/profileEventsSlice";
import FollowSlice from "./reducers/FollowSlice";

export default configureStore({
    reducer: { 
        modal, 
        fixedModalSlice,

        signSlice, 
        forgotSlice, 

        eventsSlice,
        CreateEventSlice,
        
        discoverPodcastsSlice,
        discoverUsersSlice,
        podcastsSlice,
        likeSlice,
        uploadPodcastSlice,

        profileSlice,
        profilePodcastsSlice,
        profileEventsSlice,
        FollowSlice,
        
    }
})

