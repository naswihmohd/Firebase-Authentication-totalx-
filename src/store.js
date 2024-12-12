import { configureStore } from "@reduxjs/toolkit";
import confirmationReducer from './features/confirmationSlice'
import userReducer from './features/userSlice'

const store = configureStore({
    reducer:{
        confirmation:confirmationReducer,
        user:userReducer
    }
})

export default store