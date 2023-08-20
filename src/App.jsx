
import './App.css'
import PostsList from './components/PostsList'
import AddPost from './components/AddPost'
import {Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import PostDetailView from './components/PostDetailView'
import EditPost from './components/EditPost'
import AllUsers from './components/AllUsers'
import UserPosts from './components/UserPosts'


function App() {
 

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        < Route index element={<PostsList/>}/>
         <Route path="post">

           <Route index element={<AddPost/>}/>  
           <Route path=":postId" element={<PostDetailView/>} /> 
           <Route path="edit/:postId" element={<EditPost/>} /> 
          
        </Route>
        <Route path="user">
            <Route index element={<AllUsers/>}/>
            <Route path=":userId" element={<UserPosts/>}/>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
