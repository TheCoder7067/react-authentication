import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { mainApi } from "./api/mainApi";


export const store = configureStore({
    reducer: {
        [ mainApi.reducerPath ]: mainApi.reducer,
        auth: authReducer     
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        mainApi.middleware,
    ),
})

 //1.configureStore:             RTK function hai job Brain (Store ) ready krta hai
 //2.reducer :                   Data Manager         
 //3.middelware:                 data cache ,(dobara-dobara load na hone dena,errors handles
 //4.concat(authApi.middleware): API ko Redux ke main system ke saath jodna