import React, { useState, useRef, useEffect } from 'react'

import { useParams, useNavigate} from 'react-router-dom';
 import {  useGetPostsQuery ,useUpdatePostMutation, useDeletePostMutation} from '../features/postsSlice';

import UsersList from './UsersList';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    Select
  } from '@chakra-ui/react'
function EditPost() {
    const {postId}=useParams()
    const [updatePost, {isLoading}]=useUpdatePostMutation()
    const [deletePost]=useDeletePostMutation()
    const navigate=useNavigate();
    const {post, isLoading: isLoadingPosts, isSuccess} = useGetPostsQuery("getPosts",{
      selectFromResult: ({data,isLoading,isSuccess})=>{
        data.entities[postId],
        isLoading,
        isSuccess
      }
    }
    )
   // const post=useSelector((state)=> postDetails(state,Number(postId)));
   const userContact= useSelector((state)=> userName(state, Number(post.userId)))
    const [title,setTitle]=useState('')
    const [content,setContent]=useState('')
   const authorSelection=useRef();
    const [userId,setUserId]=useState('')
    const [isError,setIsError]=useState(false);
    
    const onTitleChange= (e)=> setTitle(e.target.value)
    const onContentChange=(e)=> setContent(e.target.value)
    const onAuthorChange=(e)=> setUserId(e.target.value)
    
    const reactions={...post.reactions}
    useEffect(()=>{
      if(isSuccess){
        setTitle(post.title);
        setContent(post.body);
        setUserId(post.userId);
      }
    },[isSuccess, post.title,post.body,post.userId])
    console.log(userContact)
    const editPost=async ()=>{
        try{
            if(title && content && userId && !isLoading ){
                await updatePost({id:postId,title,body:content,userId,reactions}).unwrap();
               // dispatch(updatePost({id:postId,title,body:content,userId,reactions})).unwrap();
                setContent('')
                setTitle('')
                setUserId('')
                authorSelection.current.selectedIndex=0
                navigate('/')
               
            }
        }
        catch(er){
            setIsError(true)
            console.error("failed to edit")
           }
           
        
    }
    const deleteAction= async ()=>{
      try{
        if(title && content && userId  ){
         await deletePost({id:post.id}).unwrap()
          
            setContent('')
            setTitle('')
            setUserId('')
            authorSelection.current.selectedIndex=0
            navigate('/')
            
        }
    }
    catch(er){
        setIsError(true)
        console.error("failed to edit")
       }
       
     
    }
  return (
    <div>  <section className=''>
    <h2 className='p-8'> Edit Post</h2>
   
    <FormControl className='flex flex-col gap-2'>
        <FormLabel className='  bg-white-400 rounded'>Post Title:</FormLabel>
        <Input type="text"  className="border-2 border-black" required onChange={onTitleChange} value={title}></Input>
      
        <FormLabel>Post Content:</FormLabel>
        <Input type="text"  className="border-2 border-black" required onChange={onContentChange} value={content}></Input>
      
  <Select placeholder='Select Author' value={userId} ref={authorSelection} onChange={onAuthorChange}>
    {/* <option value="" disabled selected>Select Author </option> */}
<UsersList/>
  </Select>
        <Button
        mt={4}
        className='bg-blue-100'
        colorScheme='teal'
        onClick={editPost}
        
      >
        Submit
      </Button>
      <Button className="pb-5 mb-3 rounded-md bg-lime-300"  onClick={deleteAction}>
Delete
</Button>
    </FormControl>
</section></div>
  )
}

export default EditPost