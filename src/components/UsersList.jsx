import React from 'react'
import { selectAllUsers } from '../features/usersSlice'
import { useSelector } from 'react-redux'
function UsersList() {
    const users=useSelector(selectAllUsers)
    const Userlist=users.map((user)=>{
        return <option key={user.id} value={user.id}>{user.name}</option>
    })
  return (
    <>{Userlist}</>
  )
}

export default UsersList