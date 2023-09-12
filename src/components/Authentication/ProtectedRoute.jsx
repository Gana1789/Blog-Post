import { useNavigate, useLocation, Outlet } from "react-router-dom";

import React from 'react'
import { useSelector } from "react-redux";
import { getActiveUserName } from "../../features/authSlice";

function ProtectedRoute() {
    const Navigate=useNavigate();
    const location =useLocation();
    const  loginUserName=useSelector(getActiveUserName);
    console.log(loginUserName)
    // const  loginUserDetails=useSelector(getLoginDetailsByUsername(loginUserName));
  return (
    
    loginUserName!="" ? <Outlet></Outlet>: <Navigate to="/"  from={location} replace></Navigate>
    
  )
}

export default ProtectedRoute