import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {store} from "./app/store"
import { Provider } from 'react-redux'
import { fetchUsers } from './features/usersSlice.jsx'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
store.dispatch(fetchUsers())
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
    <Router>
      <Routes>

        <Route path="/*" element={<App/>}></Route>
      </Routes>
    </Router>
   
  </Provider>
  </React.StrictMode>,
  
)