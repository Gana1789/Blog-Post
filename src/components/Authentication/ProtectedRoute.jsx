import { useNavigate, useLocation, Outlet } from "react-router-dom";

import React from 'react'
import { useSelector } from "react-redux";
import { getActiveUserName, getLoginDetailsByUsername } from "../../features/authSlice";
function ProtectedRoute() {
    const Navigate=useNavigate();
    const location =useLocation();
    const  loginUserName=useSelector(getActiveUserName);
    const  loginUserDetails=useSelector(getLoginDetailsByUsername(loginUserName));
  return (
    
       loginUserDetails[0].token ? <Outlet></Outlet>: <Navigate to="/SignUp"  from={location} replace></Navigate>
    
  )
}

export default ProtectedRoute