import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {  getActiveUserName, getLoginDetailsByUsername, logOut } from '../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';

import { useCallback } from 'react';
function Header() {

  const loginUserName=useSelector(getActiveUserName)
  const dispatch=useDispatch()
 
  
  
  return (
    <header className='flex flex-row justify-between '>
        <h1 className='text-slate-800 bg-gray-400'>Blog Post</h1>
        <nav>
            <ul className='flex flex-row p-4 m-2 gap-4 bg-orange-300'>
                <li>{ loginUserName=="" ? <Link to="/">Home</Link>: <Link to="/post">Home</Link>}</li>
               
               { loginUserName=="" &&<li><Link to="login">Login</Link></li>}
               { loginUserName!="" &&
                <><li><Link to="post">Posts</Link></li><li><Link to="addPost">Add Post</Link></li><li><Link to="logout">SignOut</Link></li></>}
            </ul>
        </nav>
    </header>
  )
}


export default React.memo(Header)