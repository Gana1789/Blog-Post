import React, { useEffect, useState } from 'react'
import { logOut } from '../features/authSlice';
import PostData from './PostData'
import useGetPosts from '../customHooks/useGetPosts';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useSignOut from '../customHooks/useSignOut';
import { useQueryClient } from '@tanstack/react-query';
function PostsList() {
  
const dispatch=useDispatch()
  const navigate=useNavigate()
    const {data:posts, isLoading,isSuccess, isError, error}=useGetPosts("posts");
    const queryClient = useQueryClient();
    let postDisplay;
    useEffect(()=>{
      
      queryClient.invalidateQueries('posts');
      if(isError){
        navigate("/logout")
      }
    },[isError])
    
    if(isLoading){
      postDisplay=<p>Loading...</p>
    }
   else if(isSuccess){
      
      const sortedPosts= posts.slice().sort((a,b)=> b.created_time> a.created_time)
  ;

  postDisplay= sortedPosts.map(post=>{
    return <PostData key={post.post_id} post={post}></PostData>
  })
    }

  return (
    <section className='mt-1 justify-center items-center flex flex-col w-screen '>
       
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 '>

        {postDisplay}
      
        </div>
    </section>
  )
}

export default PostsList