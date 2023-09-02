
import './App.css'

import AddPost from './components/AddPost'
import {Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import PostDetailView from './components/PostDetailView'
import EditPost from './components/EditPost'
import AllUsers from './components/AllUsers'
import UserPosts from './components/UserPosts'

import PostsList from './components/PostsList'
import { store } from './app/store'
import ProtectedRoute from './components/Authentication/ProtectedRoute'

function App() {
 
console.log(store);
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        < Route index element={<SingUp/>}/>
        <Route element={ProtectedRoute}>
         <Route path="post">
         < Route index element={<PostsList/>}/>
           <Route path="addPost" element={<AddPost/>}/>  
           <Route path=":postId" element={<PostDetailView/>} /> 
           <Route path="edit/:postId" element={<EditPost/>} /> 
          
        </Route>
        <Route path="user">
            <Route index element={<AllUsers/>}/>
            <Route path=":userId" element={<UserPosts/>}/>
        </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
