import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setUid: (state, action) => action.payload
    }
})

export const {setUid} = userSlice.actions
export default userSlice.reducer