import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate} from 'react-router-dom';
import { userName } from '../features/usersSlice';
import { deletePost, updatePost } from '../features/postsSlice';
import { postDetails } from '../features/postsSlice';
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
    
    const navigate=useNavigate();
    const post=useSelector((state)=> postDetails(state,Number(postId)));
   const userContact= useSelector((state)=> userName(state, Number(post.userId)))
    const [title,setTitle]=useState(post.title)
    const [content,setContent]=useState(post.body)
   const authorSelection=useRef();
    const [userId,setUserId]=useState(post.userId)
    const [isError,setIsError]=useState(false);
    const [editStatus,setEditStatus]=useState("idle")
    const onTitleChange= (e)=> setTitle(e.target.value)
    const onContentChange=(e)=> setContent(e.target.value)
    const onAuthorChange=(e)=> setUserId(e.target.value)
    const dispatch =useDispatch()
    const reactions={...post.reactions}
    console.log(userContact)
    const editPost=()=>{
        try{
            if(title && content && userId && editStatus==="idle" ){
                dispatch(updatePost({id:postId,title,body:content,userId,reactions})).unwrap();
                setContent('')
                setTitle('')
                setUserId('')
                authorSelection.current.selectedIndex=0
                navigate('/')
                setEditStatus("fulfilled")
            }
        }
        catch(er){
            setIsError(true)
            console.error("failed to edit")
           }
           finally{
            setEditStatus("idle")
           }
        
    }
    const deleteAction=()=>{
      try{
        if(title && content && userId && editStatus==="idle" ){
          dispatch(deletePost({id:postId})).unwrap()
          
            setContent('')
            setTitle('')
            setUserId('')
            authorSelection.current.selectedIndex=0
            navigate('/')
            setEditStatus("fulfilled")
        }
    }
    catch(er){
        setIsError(true)
        console.error("failed to edit")
       }
       finally{
        setEditStatus("idle")
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