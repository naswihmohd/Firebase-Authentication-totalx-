import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        isOpen: false,
        content: '',
        styling: 'info',
    },
    reducers: {
        showAlert: (state, action) => {
            state.isOpen = true;
            state.content = action.payload.content;
            state.styling = action.payload.styling || 'info';
        },
        hideAlert: (state) => {
            state.isOpen = false;
            state.content = '';
            state.styling = 'info';
        },
    },
});

export const { showAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;
