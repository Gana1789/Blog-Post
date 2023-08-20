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

// import { selectAllUsers } from '../features/usersSlice'
import UsersList from './UsersList'
import { useSelector, useDispatch } from 'react-redux'
import { addPost } from '../features/postsSlice'
import {useNavigate} from 'react-router-dom'
function AddPost() {
  const navigate=useNavigate();
    const [title,setTitle]=useState('')
    const [content,setContent]=useState('')
   const authorSelection=useRef();
    
    const [userId,setUserId]=useState('')
    const [isError,setIsError]=useState(false);
    const onTitleChange= (e)=> setTitle(e.target.value)
    const onContentChange=(e)=> setContent(e.target.value)
    const onAuthorChange=(e)=> setUserId(e.target.value)
    const dispatch =useDispatch()
    const [addStatus,setAddStatus]=useState("idle")
    const savePost=()=>{
        if(title && content && addStatus==="idle"){
           try{

             dispatch(addPost({title,body:content,userId})).unwrap()
             setContent('')
             setTitle('')
             setUserId('')
             authorSelection.current.selectedIndex=0
             navigate('/')
             setAddStatus("fullfilled")
           }
           catch(er){
            setIsError(true)
            console.error("failed to save")
           }
           finally{
            setAddStatus("idle")
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
          
      <Select placeholder='Select Author' ref={authorSelection} onChange={onAuthorChange}>
        {/* <option value="" disabled selected>Select Author </option> */}
   <UsersList/>
      </Select>
            <Button
            mt={4}
            className='bg-blue-100'
            colorScheme='teal'
            onClick={savePost}
            
          >
            Submit
          </Button>
        </FormControl>
    </section>
  )
}

export default AddPost