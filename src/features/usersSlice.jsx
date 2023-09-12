// import { createEntityAdapter } from "@reduxjs/toolkit";
// import { blogSlice } from "../api/blogSlice";

// const usersAdaptor= createEntityAdapter();
// const initialState=usersAdaptor.getInitialState();
// // [{id:'1',name:'Gray'},{id:'2', name:"Bro"}, {id:"3",name:"Young"}]

// const usersApiSlice=blogSlice.injectEndpoints({
//     endpoints: (builder)=>({
//         getUsers: builder.query({
//             query: ()=> '/users',
//             transformErrorResponse: responseData=>{
//                 return usersAdaptor.setAll(initialState,responseData)
//             },
//             providesTags: (result,error,arg)=>[
//                 {type: 'User', id: "LIST"},
//                 ...result.ids.map(id=> ({type:"User",id}))
//             ]
//         })
//     })
// })
// export const{
//     useGetUsersQuery
// }= usersApiSlice;
