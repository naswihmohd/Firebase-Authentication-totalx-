import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name:"auth",
    initialState:false,
    reducers:{
        update:(state,action)=>action.payload
    }
})

export const {update} = authSlice.actions
export default authSlice.reducer