import React from 'react'
import { Link } from 'react-router-dom'
function Header() {
  return (
    <header className='flex flex-row justify-between '>
        <h1 className='text-slate-800 bg-gray-400'>Blog Post</h1>
        <nav>
            <ul className='flex flex-row p-4 m-2 gap-4 bg-orange-300'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="post">Add Post</Link></li>
                <li><Link to="user">Users</Link></li>
            </ul>
        </nav>
    </header>
  )
}


export default Header