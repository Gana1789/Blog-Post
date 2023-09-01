const useApiSlice = (apiSlice) => {
    const {  useGetPostsQuery,
        useGetPostsByUserIdQuery,
        useAddNewPostMutation,
        useUpdatePostMutation,
        useDeletePostMutation,
        useReactionAddedMutation } = apiSlice;
  
    return {
        useGetPostsQuery,
        useGetPostsByUserIdQuery,
        useAddNewPostMutation,
        useUpdatePostMutation,
        useDeletePostMutation,
        useReactionAddedMutation
    };
  };
  export default useApiSlice;