import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { useState } from 'react'

import useLogin from '../../customHooks/useLogin';
function SignUp() {
    const {mutateAsync: loginFunction, isSuccess}= useLogin();
    const [username,setUsername]=useState('');
   
    const [password,setPassword]=useState('');
    
    const [loginStatus,setLoginStatus]=useState(false);
    const handleLogin= async ()=>{
        const boolCheck= username && email && password;
        if(boolCheck){
           

                await loginFunction({username,password})
            if(isSuccess){
                setLoginStatus(true)
                setUsername("")
                setPassword("")
            }
            

        }
    }
  return (
    <>
   { !loginStatus && <FormControl>
        <FormLabel>UserName</FormLabel>
        <Input type="text" placeholder='username' value={username} onChange={(e)=>setUsername(e.target.value)}></Input>
        <FormLabel>Password</FormLabel>
        <Input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}></Input>
        <Button onClick={handleLogin}></Button>
         <p>Already Existing User!</p>
        <Link to="/login">Login</Link>
    </FormControl>}
    {loginStatus && <p>Logged in Successfully</p>}
    </>
  )
}

export default SignUp