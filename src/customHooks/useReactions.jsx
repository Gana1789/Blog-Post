import { useMutation } from "@tanstack/react-query"
import useCustomAxios from "./useCustomAxios"
import { useQuery, useQueryClient } from '@tanstack/react-query'
const useReactions=(()=>{
    

    // Get QueryClient from the context
    const queryClient = useQueryClient()
    const customAxios=useCustomAxios();
   
        return useMutation({
            mutationFn:async ({postId, reactionType, actionType})=>{
               const response=await customAxios.post(`/reactions/${actionType==1? "delete": "add"}`,{ postId,reactionType} )
               return response.json;
            },
            onSuccess:()=>{
                queryClient.invalidateQueries({ queryKey: ['posts'] })
            }
        })
   
})

export default useReactions