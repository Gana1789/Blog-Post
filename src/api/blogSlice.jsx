// import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query"
export const blogSlice=createApi({
    reducerPath:"api",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080'}),
    tagTypes: ["Post","User"],
    endpoints: ()=>({})
})