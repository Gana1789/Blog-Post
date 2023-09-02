import { configureStore } from "@reduxjs/toolkit";

import { blogSlice } from "../api/blogSlice";
import authSlice from "../features/authSlice";
export const store =configureStore({
    reducer:{
       [blogSlice.reducerPath]: blogSlice.reducer,
       auth: authSlice
    },
    middleware: getDefaultMiddleware=>
        getDefaultMiddleware().concat(blogSlice.middleware),
        devTools:true
    
   
})

