import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    isRoomOpen: false, 
    isPlayerOpen: false, 
    componentName: null,
    childrenProps : {},
}
const fixedModalSlice = createSlice({
    name: 'fixedModal',
    initialState,
    reducers: {
        openFixedModal: (state, action) => {
            state.isOpen = true;
            state.isRoomOpen = action.payload.isRoomOpen || false;
            state.isPlayerOpen = action.payload.isPlayerOpen || false;
            state.componentName = action.payload.name;
            state.childrenProps = action.payload.childrenProps;
        },
        closeFixedModal: (state, action) => {
            state.isOpen = false;
            state.isRoomOpen = false
            state.isPlayerOpen = false
            state.componentName = null;
            state.childrenProps = {}
        }
    }
})

export const { openFixedModal, closeFixedModal } = fixedModalSlice.actions;

export default fixedModalSlice.reducer;