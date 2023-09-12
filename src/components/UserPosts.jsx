// import React from 'react'

// import { useParams } from 'react-router-dom'

// import { UnorderedList, ListItem } from '@chakra-ui/react';
// import { Link } from 'react-router-dom';

// function UserPosts() {
//     const {userId} = useParams();
//     const {data: postsByUser, isLoading, isSuccess, isError,error}=useGetPostsByUserIdQuery(userId);
//   //  const postsByUser= useSelector((state)=> postsByuser(state,userId))
//     const postsBysUserView=postsByUser.map((post)=>{
//         return <ListItem key={post.id}><Link to={`/post/${post.id}`}>{post.title}</Link></ListItem>
//     })
//   return (
//     <div>
//         <UnorderedList>
//         {postsBysUserView}
//         </UnorderedList>
//     </div>
//   ) 
 
// }

// export default UserPosts