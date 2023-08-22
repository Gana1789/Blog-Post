import React from 'react'
import {  useGetUsersQuery } from '../features/usersSlice'

function UsersList() {
    const {users,isLoading, isSuccess}=useGetUsersQuery();
    let Userlist
    if(isSuccess){
       Userlist=users.map((user)=>{
        return <option key={user.id} value={user.id}>{user.name}</option>
    })
    }
    
  return (
    <>{Userlist}</>
  )
}

export default UsersList