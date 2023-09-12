import axios from "axios";
import React from "react";
import { getActiveUserName,getLoginDetails,getLoginDetailsByUsername } from "../features/authSlice";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
const useCustomAxios=()=>{
    
    const activeUser=useSelector(getActiveUserName);
    const [loginDetails,setLoginDetails]=useState(useSelector(state=> getLoginDetailsByUsername(state,activeUser)))
   
    
      const clearToken = useCallback(() => {
        // Clear the token from the `loginDetails` state
        setLoginDetails((prevDetails) => ({}));
      },[activeUser]);
    
      const header = useMemo(() => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginDetails.token}`,
      }), [loginDetails, activeUser]);
   console.log(header)

   const customAxios = useMemo(
    () =>
      axios.create({
        baseURL: 'http://localhost:8080',
        headers: header,
      }),
    [header]
  );
    return {customAxios:customAxios,clearToken:clearToken}
   
}



export default useCustomAxios