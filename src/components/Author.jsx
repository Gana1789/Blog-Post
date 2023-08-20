import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../features/usersSlice';

function Author({userId}) {
    const usersList=useSelector(selectAllUsers);
    const authorData=usersList.filter(user=>{
        return user.id==userId;
    })
 
  return (
   <span className='font-bold text-slate-700 dark: bg-slate-50'>by {authorData.length>0 ? authorData[0].name : "Unknown Author"}</span>
  )
}

export default Author