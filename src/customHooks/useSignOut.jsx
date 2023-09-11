import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { logOut } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getActiveUserName } from "../features/authSlice";
import useCustomAxios from "./useCustomAxios";
import { isError, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
const useSignOut=()=>{
  
    const dispatch=useDispatch();
    const navigate=useNavigate()
   
    const  loginUserName=useSelector(getActiveUserName);
    const headers = {
      headers: {
        "userName": loginUserName
      }
    };
      return useMutation({
        mutationFn: async () => {
         
            const response = await axios.post("http://localhost:8080/auth/signOut",null,headers);
            return response.data;
          },
          onError: (error) => {
            console.error("Mutation error:", error);
            // Handle the error as needed (e.g., show an error message)
          },
          retry:false
          
      })

}

export default useSignOut;