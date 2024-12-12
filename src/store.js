import { configureStore } from "@reduxjs/toolkit";
import confirmationReducer from './features/confirmationSlice'
import userReducer from './features/userSlice'
import authReducer from './features/authSlice'
import alertReducer from './features/alertSlice'

const store = configureStore({
    reducer:{
        confirmation:confirmationReducer,
        user:userReducer,
        auth:authReducer,
        alert: alertReducer,
    }
})

export default store