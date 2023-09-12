import React, { useState } from 'react'

// import {  useReactionAddedMutation } from '../features/postsSlice'
import { Button } from '@chakra-ui/react'
import useReactions from '../customHooks/useReactions';
function Reactions({post}) {
    const reactionEmoji = {
        thumbsUp: '👍',
         love: '❤️'
    }
    const [actionType,setActionType]=useState("add")
    const {mutateAsync: reactionAdded}=useReactions();
    
    const reactionMap= Object.entries(reactionEmoji).map(([index,value])=>{
        return <Button key={index} className='flex flex-row hover: scale-50 transition-all' 
        onClick={async()=> {
        try{
            setActionType(post.reactions[index]==0 ? "add": "delete")
            const response=await reactionAdded({postId: post.post_id, reactionType: index, actionType:post.reactions[index] })
            if(!response.ok){
                throw new Error("Reaction not added successfully");
            }
        }
        catch(e){
                console.log(e);
        }
        }}>
           <span className='text-4xl'>{value}</span>  {post.reactions[index]>0 && <span className=' bg-white'>{post.reactions[index]}</span>}
        </Button>
    })
  return (
    <div >
        {reactionMap}
    </div>
  )
}

export default Reactions