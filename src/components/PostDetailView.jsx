import React from 'react'

import {  useParams } from 'react-router-dom';
import { useGetPostsQuery } from '../features/postsSlice';
import Author from './Author';
import TimePosted from './timePosted';
import Reactions from './Reactions';
import { Button } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
function PostDetailView() {

   const {postId}=useParams()
   console.log(postId)
   const {post,isLoading} = useGetPostsQuery('getPosts',{
    selectFromResult: ({data, isLoading})=>({
        post: data.entities[postId],
        isLoading
    })
   })
   // const post=useSelector((state)=> postDetails(state,Number(postId)));
    if(!post){
        return <p>Post Not Found</p>
    }
    return (
        <div className='p-4 m-4'>
       
<article  className='
   p-4 m-2 border-black  border-2 rounded-md bg-slate-200 w-full mb-4 dark: bg-slate-700'>
        <h3 className='b-2'>{post.title}</h3>
        <p className=''>{post.body}</p>
        <p><Author userId={post.userId}></Author> <TimePosted timeStamp={post.date}></TimePosted></p>
        <Reactions post={post}></Reactions>
    </article>
<div className='flex flex-row justify-center items-center gap-3'>
<Button className="pb-5 mb-3 rounded-md bg-lime-300" >
<Link to={`/`}>Back</Link>
</Button>
<Button className="pb-5 mb-3 rounded-md bg-lime-300" >
<Link to={`/post/edit/${post.id}`}>Edit</Link>
</Button>

</div>
   
        </div>
       
    )
  }

export default PostDetailView