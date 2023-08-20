import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { savedPosts,  postedStatus, postedError } from '../features/postsSlice'
import { fetchPosts } from '../features/postsSlice'

import PostData from './PostData'
function PostsList() {
    const posts= useSelector(savedPosts)
    const dispatch=useDispatch();
    const postStatus=useSelector(postedStatus)
    const postError=useSelector(postedError)
    useEffect(()=>{
      if(postStatus==="idle" && posts.length===0){
        
        console.log(posts.length)
        dispatch(fetchPosts())
      }
      
    },[postStatus,posts.length,dispatch])
    let postDisplay;
    
    if(postStatus==='loading'){
      postDisplay=<p>Loading...</p>
    }
   else if(postStatus=='success'){
      
      const sortedPosts= posts.slice().sort((a,b)=> b.date.localeCompare(a.date))
  ;
  console.log(sortedPosts)     
  postDisplay= sortedPosts.map(post=>{
        return <PostData key={post.id} post={post}></PostData>
      })
    }
    else if(postStatus==='error'){
      postDisplay= <p>{postError}</p>
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