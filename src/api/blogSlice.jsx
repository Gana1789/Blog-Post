import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query'

export const blogSlice=createApi({
    reducerPath:"blog",
    tagTypes: ["Post","User"],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3500'}),
    endpoints: builder=>({})
})