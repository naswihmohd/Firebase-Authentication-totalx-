import { createSlice } from "@reduxjs/toolkit";


const confirmationSlice = createSlice({
    name: "confirmation",
    initialState: null,
    reducers: {
        add: (state, action) => action.payload
    }
})

export const { add } = confirmationSlice.actions
export default confirmationSlice.reducer