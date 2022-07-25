import { configureStore } from "@reduxjs/toolkit";
import modal from './reducers/modalSlice';

export default configureStore({
    reducer: { modal}
})

