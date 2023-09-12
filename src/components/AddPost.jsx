import React, { useRef, useState } from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    Select
  } from '@chakra-ui/react'

import {useNavigate} from 'react-router-dom'
import useAddPost from '../customHooks/useAddPost'
import { useSelector } from 'react-redux'
import { getActiveUserName, getLoginDetailsByUsername } from '../features/authSlice'
function AddPost() {
    const {mutateAsync: addNewPost,isSuccess, isLoading}= useAddPost()
    const navigate=useNavigate();
    const [title,setTitle]=useState('')
    const [content,setContent]=useState('')
   
    const  loginUserName=useSelector(getActiveUserName);
    const  loginUserDetails=useSelector((state)=>getLoginDetailsByUsername(state,loginUserName));
    const [userId,setUserId]=useState(loginUserDetails.author_id)
    const [isError,setIsError]=useState(false);
    const onTitleChange= (e)=> setTitle(e.target.value)
    const onContentChange=(e)=> setContent(e.target.value)
   
    const savePost= async()=>{
        if(title && content && !isLoading){
           try{
             const response=await addNewPost({title,content,userId})
             console.log(isSuccess)
             if(response){
                console.log("added successfully")
                 setContent('')
                 setTitle('')
                 
                 navigate('/post')
             }
           }
           catch(er){
            setIsError(true)
            console.error("failed to save")
           }
        }
        else{
            setIsError(true)
        }
        
    }
  
  return (
   
    <section className=''>
       

        <h2 className='p-8'> Add a New Post</h2>
       
        <FormControl className='flex flex-col gap-2'>
            <FormLabel className='  bg-white-400 rounded'>Post Title:</FormLabel>
            <Input type="text"  className="border-2 border-black" required onChange={onTitleChange} value={title}></Input>
          
            <FormLabel>Post Content:</FormLabel>
            <Input type="text"  className="border-2 border-black" required onChange={onContentChange} value={content}></Input>
            <Button
            mt={4}
            className='bg-blue-100'
            colorScheme='teal'
            onClick={savePost} >
            Submit
          </Button>
        </FormControl>
    </section>
  )
}

export default AddPost




{/* <Select placeholder='Select Author' ref={authorSelection} onChange={onAuthorChange}>
        {/* <option value="" disabled selected>Select Author </option> */}
        // <UsersList/>
    // </Select> */}