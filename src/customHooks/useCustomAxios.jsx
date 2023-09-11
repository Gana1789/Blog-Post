import axios from "axios";
import { getActiveUserName,getLoginDetails,getLoginDetailsByUsername } from "../features/authSlice";
// import { getActiveUserName, getLoginDetailsByUsername } from "../../features/authSlice";
import { useSelector } from "react-redux";


const useCustomAxios=()=>{
    const activeUser=useSelector(getActiveUserName);
    const loginDetails=useSelector(state=> getLoginDetailsByUsername(state,activeUser));
    console.log(loginDetails)
    const header={
            'Content-Type': 'application/json',
            "Authorization": "Bearer " +loginDetails.token
    };
    return axios.create({
                baseURL: 'http://localhost:8080',
                headers:header
    })
   
}

export default useCustomAxios;