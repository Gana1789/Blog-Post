import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/authSlice";
import postsSlice from "../features/postsSlice";

import storage from 'redux-persist/lib/storage';
import persistReducer from "redux-persist/es/persistReducer";
//import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
const persistConfig={
    key:"root",
    version:1,
    storage
}
const reducer=combineReducers({ auth: authSlice,
    posts: postsSlice})
    const persistedReducer=persistReducer(persistConfig,reducer);
export const store =configureStore({
    reducer:persistedReducer,
    // middleware: getDefaultMiddleware=>
    //     getDefaultMiddleware().concat(blogSlice.middleware),
    //     devTools:true
    
   
})

