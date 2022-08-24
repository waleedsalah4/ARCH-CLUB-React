import { configureStore } from "@reduxjs/toolkit";
import modal from './reducers/modalSlice';
import fixedModalSlice from "./reducers/fixedModalSlice";
import signSlice from "./reducers/signSlice";
import forgotSlice from "./reducers/forgotPasswordSlice";

export default configureStore({
    reducer: { modal, fixedModalSlice,signSlice, forgotSlice}
})

