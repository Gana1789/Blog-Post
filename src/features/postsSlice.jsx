import {  createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { sub } from "date-fns";
// import { blogSlice } from "../api/blogSlice";
const postsAdaptor= createEntityAdapter();
const initialState = postsAdaptor.getInitialState()

const postsSlice=createSlice({
    name:"posts",
    initialState,
    reducers:{
        getPosts(state,action){
            postsAdaptor.setAll(initialState,action.payload);
        },
        addPost(state,action){
            postsAdaptor.addOne(state,action.payload)
        },
        deletePost(state,action){
           postsAdaptor.removeOne(state,action.payload.id)
        },
        updatePost(state,action){
            postsAdaptor.updateOne(state,{
                id:action.payload.id,
                changes: action.payload.changes
            })
        }
    }
})
export const {
    selectAll: selectAllPosts,
    selectById: selectPostsById,
    selectIds: selectPostIds,
} = postsAdaptor.getSelectors(state=> state.posts);
export const {getPosts, addPost,deletePost,updatePost} = postsSlice.actions;
export default postsSlice.reducer;
// export const extendedBlogSlice= blogSlice.injectEndpoints({
//     endpoints: (builder)=>({
//         getPosts: builder.query({
//             query: ()=> '/posts',
//             transformResponse: responseData => {
//                 let min = 1;
//                 const loadedPosts = responseData.map(post => {
//                     if (!post.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
//                     if (!post.reactions) post.reactions = {
//                         thumbsUp: 0,
//                         heart: 0,
//                     }
//                     return post;
//                 });
//                 postsAdaptor.setAll(initialState, loadedPosts)
//                 return loadedPosts
//             },
//             providesTags: (resposnse,error,arg)=>[
//                 {type: 'Post',id:"LIST"},
//                 ...resposnse.ids.map(id=> ({type: 'Post',id}))
//             ]
//         }),
//         getPostsByUserId: builder.query({
//             query: id=> `posts/?userId=${id}`,
//             transformErrorResponse: responseData =>{
//                 let min = 1;
//                 const loadedPosts = responseData.map(post => {
//                     if (!post.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
//                     if (!post.reactions) post.reactions = {
//                         thumbsUp: 0,
//                         heart: 0  
//                     }
//                     return post;
//                 });
//                 return postsAdaptor.setAll(initialState, loadedPosts)
//             },
//             providesTags: (result,error,arg)=>[...result.ids.map(id=> ({type: 'Post', id}))]
        
//             }),
       
//         addNewPost: builder.mutation({
//             query: newPost=>({
//                 url: `/posts`,
//                 method: 'POST',
//                 body: {
//                     ...newPost,
//                     userId: Number(newPost.userId),
//                     date: new Date().toISOString(),
//                     reactions: {
//                         thumbsUp: 0,
//                         heart:0
//                     }
//                 }
//             }),
//             invalidatesTags: [
//                 {type: 'Post',id:'LIST'}
//             ]
//         }),
//         updatePost: builder.mutation({
//             query: updatedPost=>({
//                 url:`/posts/${updatedPost.id}`,
//                 method: 'PUT',
//                 body: {
//                     ...updatedPost,
//                     date: new Date().toISOString()

//                 }
//             }),
//             invalidatesTags: (result,error,arg)=>[{type:'Post',id: arg.id}]
//         }),
//         deletePost: builder.mutation({
//             query: ({id})=> ({
//                 url: `/posts/${id}`,
//                 method: 'DELETE',
//                 body:{id}
//             }),
//             invalidatesTags: (result,error,arg)=>[{type:'Post',id:arg}]
//         }),
//         reactionAdded: builder.mutation({
//             query:({postId,reaction})=>({
//                 url:`posts/${postId}`,
//                 method: "PATCH",
//                 body:{reaction}
//             }),
//             async onQueryStarted({postId,reaction},{dispatch,queryFulfilled}){
//                 const res=dispatch(
//                     extendedBlogSlice.util.updateQueryData('getPosts','getPosts',draft=>{
//                         const post=draft.entities[postId];
//                         if(post && post.reactions[reaction]==0) post.reactions[reaction]++;

//                     })
//                 )
//                 try{
//                     await queryFulfilled
//                 }
//                 catch{
//                     res.undo()
//                 }
//             }
//         })
//     })
//     })
//     // console.log(extendedBlogSlice.endpoints.getPosts.initiate("getPosts"))
//     console.log(extendedBlogSlice.endpoints.getPosts.select().length)
//     // export const {
//     //     useGetPostsQuery,
//     //     useGetPostsByUserIdQuery,
//     //     useAddNewPostMutation,
//     //     useUpdatePostMutation,
//     //     useDeletePostMutation,
//     //     useReactionAddedMutation
//     // } = {...extendedBlogSlice.endpoints}
//     export const {useGetPostsQuery} =extendedBlogSlice.endpoints.getPosts
//     export const {useGetPostsByUserIdQuery} =extendedBlogSlice.endpoints.getPostsByUserId
//     export const {useAddNewPostMutation} =extendedBlogSlice.endpoints.addNewPost
//     export const {useUpdatePostMutation} =extendedBlogSlice.endpoints.updatePost
//     export const {useDeletePostMutation} =extendedBlogSlice.endpoints.deletePost
//     export const {useReactionAddedMutation} =extendedBlogSlice.endpoints.reactionAdded
    
    
   


  

