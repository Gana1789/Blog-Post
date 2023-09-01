import React from 'react'

// import {  useReactionAddedMutation } from '../features/postsSlice'
import { Button } from '@chakra-ui/react'
function Reactions({post}) {
    const reactionEmoji = {
        thumbsUp: '👍',
         heart: '❤️'
    }
    const [reactionAdded]=useReactionAddedMutation();
    
    const reactionMap= Object.entries(reactionEmoji).map(([index,value])=>{
        return <Button key={index} className='flex flex-row hover: scale-50 transition-all' 
        onClick={()=> reactionAdded({postId: post.id, reaction: index})}>
           <span className='text-4xl'>{value}</span>  {post.reactions[index]>0 && <span >{post.reactions[index]}</span>}
        </Button>
    })
  return (
    <div >
        {reactionMap}
    </div>
  )
}

export default Reactions