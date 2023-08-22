import { configureStore } from "@reduxjs/toolkit";

import { blogSlice } from "../api/blogSlice";
export const store =configureStore({
    reducer:{
       [blogSlice.reducerPath]: blogSlice.reducer,
      
    },
    middleware: getDefaultMiddleware=>
        getDefaultMiddleware().concat(blogSlice.middleware),
        devTools:true
    
   
})

