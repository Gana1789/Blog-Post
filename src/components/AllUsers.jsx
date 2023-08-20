import React from 'react'
import { UnorderedList, ListItem } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../features/usersSlice'
import { Link } from 'react-router-dom';
function AllUsers() {
    const users=useSelector(selectAllUsers);
    const userList= users.map((user)=>{
        return <ListItem key={user.id}><Link to={`/user/${user.id}`}>{user.name}</Link></ListItem>
    })
  return (
    <div>
        <UnorderedList>
        {userList}
        </UnorderedList>
    </div>
  )
}

export default AllUsers