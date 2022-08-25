import { configureStore } from "@reduxjs/toolkit";
import modal from './reducers/modalSlice';
import fixedModalSlice from "./reducers/fixedModalSlice";

import signSlice from "./reducers/signSlice";
import forgotSlice from "./reducers/forgotPasswordSlice";

import eventsSlice from "./reducers/eventsSlice";
import CreateEventSlice from "./reducers/CreateEventSlice";

export default configureStore({
    reducer: { 
        modal, 
        fixedModalSlice,

        signSlice, 
        forgotSlice, 

        eventsSlice,
        CreateEventSlice,
    }
})

