import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const initialState=[]
// [{id:'1',name:'Gray'},{id:'2', name:"Bro"}, {id:"3",name:"Young"}]
export const fetchUsers= createAsyncThunk("users/fetchUsers",async()=>{
    const response=await axios.get(USERS_URL);
    console.log(response)
    return response.data
})
const usersSlice=createSlice({
    name:"users",
    initialState,
    reducers:{

    },
    extraReducers(builder){
        builder.addCase(fetchUsers.fulfilled, (state,action)=>{
            return action.payload;
        })
    }
})
export const userName=(state,userId)=>{
    console.log(state.users)
    return state.users.find((user)=> user.id===userId)
}
export const selectAllUsers= (state)=> state.users;
export default usersSlice.reducer