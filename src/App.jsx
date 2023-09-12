
import './App.css'

// import AddPost from './components/AddPost'
import {Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
// import PostDetailView from './components/PostDetailView'
// import EditPost from './components/EditPost'
// import AllUsers from './components/AllUsers'
// import UserPosts from './components/UserPosts'
import SignUp from './components/Authentication/SignUp'
import PostsList from './components/PostsList'
import { store } from './app/store'
import ProtectedRoute from './components/Authentication/ProtectedRoute'
import Login from './components/Authentication/Login'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getActiveUserName } from './features/authSlice'
import LogOut from './components/Authentication/LogOut'
import AddPost from './components/AddPost'
function App() {
 
console.log(store);
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        < Route index element={<SignUp/>}/>
        < Route path="login" element={<Login/>}/>
        < Route path="logout" element={<LogOut/>}/>
       <Route  element={<ProtectedRoute/>}>
         <Route path="post" element={<PostsList/>}></Route>
         <Route path="addPost" element={<AddPost/>}></Route>
      </Route> 
      </Route>
  </Routes>
  )
}

export default App


 {/* <Route path="addPost" element={<AddPost/>}/>  
           <Route path=":postId" element={<PostDetailView/>} /> 
           <Route path="edit/:postId" element={<EditPost/>} />  */}


            {/* <Route path="user">
            <Route index element={<AllUsers/>}/>
            <Route path=":userId" element={<UserPosts/>}/>
        </Route> */}
          



 
