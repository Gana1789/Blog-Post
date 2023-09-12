// import { createEntityAdapter } from "@reduxjs/toolkit";

// import { authSlice } from "../api/authSlice";

// const authAdaptor=createEntityAdapter()
// const initialState=authAdaptor.getInitialState();
 

// export const extendedAuthSlice= authSlice.injectEndpoints({
//     endpoints: (builder)=>({
//         login: builder.mutation({
//             query: loginRequet=>({
//                 url: `/posts`,
//                 method: 'POST',
//                 body: {
//                     ...loginRequet,
//                     username:loginRequet.username,
//                     password:loginRequet.password
//                 }
//             }),
//             transformResponse: (responseData)=>{
//                     authAdaptor.addOne(responseData);
//                     return responseData;
//             },
//             providesTags: [
//                 {type: 'Auth'}
//             ]
//         }),
//         signUp: builder.mutation({
//                 query:(registerDetails)=>({
//                     url: "/signUp",
//                     method:"POST",
//                     body:{
//                         ...registerDetails,
//                         username: registerDetails.username,
//                         password: registerDetails.password ,
//                         email: registerDetails.email
//                     }    
//                 }),
//                 providesTags:["Signup"]
//         }),
//         signOut: builder.mutation({
//             query: (header)=>({
//                 url: "/signOut",
//                 method: "POST",
//                 header: {
//                     Authorization: header.token
//                 }
//             }),
//             async onQueryStarted(header,{dispatch,queryFulfilled}){
//                 try{
//                     const {data} =await queryFulfilled
//                     authAdaptor.removeOne(header.username);
//                 }
//                 catch (error){
//                     console.log("error")
//                 }
//             },
//             invalidatesTags:[{type:"Auth"}]
//         })
//     })
// })



import { createSelector, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
const initialState={
    loggedInUsers:[],
    activeUserId:""
}
const authSlice= createSlice({
    name:"auth",
    initialState,
    reducers:{
        login(state,action){
            state.loggedInUsers.push({...action.payload})
            state.activeUserId=action.payload.username
        },
        logOut(state,action){
            state.loggedInUsers=[]
            state.activeUserId=""
            
        },
       
    }
})

export const getLoginDetails = (state) => {console.log(state.auth)
    return state.auth.loggedInUsers};

export const getLoginDetailsByUsername = createSelector(
  [getLoginDetails, (state, username) => username],
  (loggers, username) => {
    console.log(loggers);
    return loggers.find((l) => l.username === username);
  }
);

export const getActiveUserName= ((state)=> state.auth.activeUserId);
export const {login,logOut} =authSlice.actions;

export default authSlice.reducer;






// export const selectAuth =(state)=> state.auth;
// export const getLoginDetails =createSelector([selectAuth],
//     (auth)=> auth.loggedInUsers)
