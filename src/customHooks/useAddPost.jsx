import { useMutation } from "@tanstack/react-query"
import useCustomAxios from "./useCustomAxios"

const useAddPost=()=>{
    const customAxios=useCustomAxios()
    return useMutation({
        mutationFn: async({title,content: description,userId: author_id})=>{
            const response=await customAxios.post("/addPost",{title,description,author_id});
            return response.data
        },
        retry: false
    })
}
export default useAddPost