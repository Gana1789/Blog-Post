import { useNavigate, useLocation, Outlet } from "react-router-dom";

import React from 'react'
import { useSelector } from "react-redux";
import { getActiveUserName, getLoginDetailsByUsername } from "../features/authSlice";
function ProtectedRouteForAuth() {
    const Navigate=useNavigate();
    const location =useLocation();
    const  loginUserName=useSelector(getActiveUserName);
    console.log(location)
    //const  loginUserDetails=useSelector(getLoginDetailsByUsername(loginUserName));
  return (
    
    loginUserName!="" ? <Navigate to="/"  state={{ from: location }} replace></Navigate>:<Outlet></Outlet>
    
  )
}

export default ProtectedRouteForAuth