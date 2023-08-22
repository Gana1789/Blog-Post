import React, { useEffect } from 'react'

import { useGetPostsQuery } from '../features/postsSlice';
import PostData from './PostData'
function PostsList() {
  console.log(useGetPostsQuery)
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery();
  
    let postDisplay;
    
    if(isLoading){
      postDisplay=<p>Loading...</p>
    }
   else if(isSuccess){
      
      const sortedPosts= posts.slice().sort((a,b)=> b.date.localeCompare(a.date))
  ;
  console.log(sortedPosts)     
  postDisplay= sortedPosts.map(post=>{
        return <PostData key={post.id} post={post}></PostData>
      })
    }
    else if(isError){
      postDisplay= <p>{error}</p>
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