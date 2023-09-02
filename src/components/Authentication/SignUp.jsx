import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import useSignUp from '../../customHooks/useSignUp';
function SignUp() {
    const {mutateAsync: signUpFunction, isSuccess}= useSignUp();
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [registerStatus,setRegisterStatus]=useState(false);
    const handleSignUp= async ()=>{
        const boolCheck= username && email && password && confirmPassword;
        if(password==confirmPassword && boolCheck){
           

                await signUpFunction({username,email,password})
            if(isSuccess){
                setConfirmPassword("")
                setEmail("")
                setUsername("")
                setPassword("")
                setRegisterStatus(true)
            }
        

        }
    }
  return (
    <>
   { !registerStatus && <FormControl>
        <FormLabel>UserName</FormLabel>
        <Input type="text" placeholder='username' value={username} onChange={(e)=>setUsername(e.target.value)}></Input>
        <FormLabel>Email</FormLabel>
        <Input type="email" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}></Input>
        <FormLabel>Password</FormLabel>
        <Input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}></Input>
        <FormLabel>Confirm Password</FormLabel>
        <Input type="password" placeholder='password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Input>
        <Button onClick={handleSignUp}></Button>

        <p>Already Existing User!</p>
        <Link to="/login">Login</Link>
    </FormControl>}
    {registerStatus && <p>Registered Successfully</p>}
    </>
  )
}

export default SignUp