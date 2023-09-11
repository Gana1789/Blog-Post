import { useMutation } from "@tanstack/react-query"
import axios from "axios"

const useSignUp =()=>{
    return useMutation({
        mutationFn: async (signUpData)=>{
            const data={
                username: signUpData.username,
                email: signUpData.email,
                password: signUpData.password
            }
            const response =await axios.post('http://localhost:8080/auth/signUp',data);
            return response.json;
        },
        retry:false
       
    })
}

export default useSignUp;