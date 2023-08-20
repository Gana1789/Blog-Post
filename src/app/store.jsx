import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/postsSlice"
import usersReducer from "../features/usersSlice"
export const store =configureStore({
    reducer:{
       posts:postsReducer,
       users: usersReducer,
    },
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({
    //   serializableCheck: {
    //     // Ignore these action types
    //     ignoredActions: ['fetchPosts'],
    //     // Ignore these field paths in all actions
    //     ignoredActionPaths: ['meta.arg', 'payload.headers','payload.config','payload.request'],
    //     // Ignore these paths in the state
    //     ignoredPaths: ['payload.config'],
    //   },
    // })
})

