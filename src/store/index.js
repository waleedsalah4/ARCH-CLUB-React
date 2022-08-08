import { configureStore } from "@reduxjs/toolkit";
import modal from './reducers/modalSlice';
import fixedModalSlice from "./reducers/fixedModalSlice";

export default configureStore({
    reducer: { modal, fixedModalSlice}
})

