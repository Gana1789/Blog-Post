import { createSlice, nanoid, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const postsAdaptor= createEntityAdapter();
const initialState = postsAdaptor.getInitialState(
//     { id: '1', title: 'React', content: 'Top tech in demand',
//  date: sub(new Date(),{minutes:10}).toISOString(),
//  reactions:{
//     thumbsUp:0,
//     heart: 0
//  }
// },
//     {
//         id: '2', title: 'Redux', content: 'wonderful tool',
//         date: sub(new Date(),{minutes:10}).toISOString(),
//         reactions:{
//             thumbsUp:0,
//             heart: 0
//          }
//     }
{
    posts:[],
    status: "idle",
    error: null
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async()=>{
  
    const response= await axios.get(POSTS_URL)
   return response.data;
})
export const addPost= createAsyncThunk('posts/addPost', async(payload)=>{
    const response = await axios.post(POSTS_URL,payload)
    return response.data
})
export const updatePost= createAsyncThunk('posts/updatePost', async(payload)=>{
    const {id}=payload
    try{
        const resposne=await axios.put(`${POSTS_URL}/${id}`,payload)
        return resposne.data
    }
    catch{
        return payload;
    }
})
export const deletePost = createAsyncThunk('posts/deletePost',async(payload)=>{
    const {id}= payload;
    try{
        const resposne=await axios.delete(`${POSTS_URL}/${id}`)
        if (resposne.status==200) {
            
            return payload
        }
    }
    catch(e){
        return response.status + response.error;
    }
})
const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
       
        reactionAdded(state,action){
            const {postId, reaction} =action.payload;
           
            const existingPost =  state.entities[postId]
            //state.posts.find(post => post.id=== postId);
            console.log(state.entities)
            
            if(existingPost){
                if(existingPost.reactions[reaction]===1) existingPost.reactions[reaction]=0;
                else existingPost.reactions[reaction]=1;
            }
        }
       
    },
    extraReducers(builder){
        builder.addCase(fetchPosts.pending, (state,action)=>{
            state.status='loading'
        })
        .addCase(fetchPosts.fulfilled, (state,action)=>{
            state.status='success'
            let initailMin=0;
            console.log(action.payload)
           
               const loadedPosts= action.payload.map((post)=>{
                    post.id=post.id;
                    post.userId=post.userId;
                    post.body=post.body;
                    post.title=post.title
                post.date=sub(new Date(),{minutes:initailMin++}).toISOString()
                post.reactions={
                   
                            thumbsUp:0,
                            heart: 0
                         
                }
                return post;
            })
          //  state.posts=loadedPosts
            postsAdaptor.upsertMany(state,loadedPosts)
            //return loadedPosts
              //  if(state.posts.length==0) state.posts= state.posts.concat(loadedPosts);
        })
        .addCase(fetchPosts.rejected,(state,action)=>{
            state.status='failed'
            state.error= action.error.code + action.error.message;
        })
        .addCase(addPost.fulfilled,(state,action)=>{
            action.payload.date=new Date().toISOString()
            action.payload.userId=Number(action.payload.userId)
            // data.userId=Number(data.userId)
            action.payload.id=state.entities.length+1
            action.payload.reactions={
                thumbsUp:0,
                heart: 0
            }
            postsAdaptor.addOne(state, action.payload)
        })
        .addCase(updatePost.fulfilled,(state,action)=>{
            if(!action.payload.id){
                return
            }
            const {id}=action.payload;
            action.payload.date=new Date().toISOString();
            console.log(action.payload)
          //  const updatedPost=state.posts.filter(post=> post.id!==id)
            //state.posts=[...updatedPost,action.payload]
            postsAdaptor.upsertOne(state,action.payload);
        })
        .addCase(deletePost.fulfilled, (state,action)=>{
            if(!action.payload.id){
                return
            }
            const { id } = action.payload;
            const posts = state.posts.filter(post => post.id !== Number(id));
            console.log(posts)
            state.posts = posts;
            postsAdaptor.removeOne(state,id)
        } )
    }
})
export const {
selectAll: savedPosts,
selectById: postDetails


}=postsAdaptor.getSelectors(state=> state.posts)
// export const postDetails=(state,postId)=>{
//     console.log(state.posts.posts)
//     return state.posts.posts.find((post)=> post.id===postId)
// }
//export const savedPosts= (state)=> state.posts.posts
export const postedStatus= (state)=> state.posts.status
export const postedError= (state)=> state.posts.error
export const postsByuser=createSelector([savedPosts, (state,userId)=> userId],(posts,userId)=>{
    return posts.filter((post)=> post.userId===Number(userId))
})
export const { reactionAdded} =postsSlice.actions
export default postsSlice.reducer;