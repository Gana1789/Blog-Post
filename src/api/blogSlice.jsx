import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query'

export const blogSlice=createApi({
    reducerPath:"api",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000'}),
    tagTypes: ["Post","User"],
    endpoints: builder=>({})
})