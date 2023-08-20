import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { postsByuser } from '../features/postsSlice';
import { UnorderedList, ListItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function UserPosts() {
    const {userId} = useParams();
    const postsByUser= useSelector((state)=> postsByuser(state,userId))
    const postsBysUserView=postsByUser.map((post)=>{
        return <ListItem key={post.id}><Link to={`/post/${post.id}`}>{post.title}</Link></ListItem>
    })
  return (
    <div>
        <UnorderedList>
        {postsBysUserView}
        </UnorderedList>
    </div>
  ) 
  return (
    <div>UserPosts</div>
  )
}

export default UserPosts