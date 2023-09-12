import {  useQuery } from "@tanstack/react-query";
import useCustomAxios from "./useCustomAxios";

const useGetPosts= ()=>{
    const {customAxios: customAxios, clearToken: clearToken}=useCustomAxios();
    
    return useQuery({
        queryKey: ['posts'], queryFn:async()=>{
            try{

                const response=await customAxios.get("/posts");
                console.log(response)
                if(response.status==200){
                    return response.data
                }
               
            }
            catch(e){
                console.log(e.response.status)
                if(e.response.status==401){
                  
                        throw e;
              
                 
                }
            }
        
        },
        retry:false
        
         
    })
}

export default useGetPosts;