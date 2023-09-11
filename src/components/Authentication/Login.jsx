import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getActiveUserName } from '../../features/authSlice';
import useLogin from '../../customHooks/useLogin';
import { useLocation, useNavigate } from 'react-router-dom';
function Login() {
  const Navigate=useNavigate();
  const location=useLocation();
  const  loginUserName=useSelector(getActiveUserName);
    const {mutateAsync: loginFunction,isLoading,isError,isSuccess, status}= useLogin();
    //const [loginState,setLoginState]=useState(false)
    const [password,setPassword]=useState('');
    
    const [loginStatus,setLoginStatus]=useState(false);
    const [username,setUsername]=useState('');
    // useEffect(()=>{
    //   if(isSuccess){

    //    Navigate('/post');
    //   }
    // },[isSuccess])
    const handleLogin= async ()=>{
        const boolCheck= username  && password;
        if(boolCheck){
           try {
            const re=await loginFunction({username,password})
            console.log(re);
            
            if(re){
              setUsername("")
              setPassword("")
             // setLoginState(true)
              setLoginStatus(true)
            Navigate("/post")
            }
            
           } catch (error) {
            console.log(error)
           }

                

        }
    }
    const loginBool=loginUserName==="" && !loginStatus;
  return (
    <>
   { loginBool && <FormControl>
        <FormLabel>UserName</FormLabel>
        <Input type="text" placeholder='username' value={username} onChange={(e)=>setUsername(e.target.value)}></Input>
        <FormLabel>Password</FormLabel>
        <Input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}></Input>
        <Button onClick={handleLogin}> Login </Button>
        
    </FormControl>}
    {/* {!loginBool &&  <Navigate to="/"  state={{ from: location }} replace/>} */}
    </>
  )
}

export default Login