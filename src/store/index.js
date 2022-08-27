import { configureStore } from "@reduxjs/toolkit";
import modal from './reducers/modalSlice';
import fixedModalSlice from "./reducers/fixedModalSlice";

import signSlice from "./reducers/signSlice";
import forgotSlice from "./reducers/forgotPasswordSlice";

import eventsSlice from "./reducers/eventsSlice";
import CreateEventSlice from "./reducers/CreateEventSlice";
import discoverPodcastsSlice from "./reducers/discoverPodcastsSlice";
import discoverUsersSlice from "./reducers/discoverUsersSlice";
import likeSlice from "./reducers/likeSlice";

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
        likeSlice
    }
})

