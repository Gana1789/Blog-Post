import React from 'react'
import Author from './Author'
import TimePosted from './timePosted'
import Reactions from './Reactions'
import { Link } from 'react-router-dom'
function PostData({post}) {
  return (
    <article  className='
         p-4 m-2 border-black  border-2 rounded-md bg-slate-200 w-full mb-4 dark: bg-slate-700 '>
              <h3 className='b-2'><span className='font-medium'>Title:</span> {post.title}</h3>
              <p className=''><span className='font-medium'>Description:</span> {post.body.substring(0,100)}</p>
              <p>
                <Author userId={post.userId}></Author> <TimePosted timeStamp={post.date}></TimePosted>
                </p>
                <Link to={`post/${post.id}`}>View Post</Link>
              <Reactions post={post}></Reactions>
          </article>
  )
}

export default PostData