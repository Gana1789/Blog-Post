import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { logOut } from "../features/authSlice";
const useSignOut=()=>{
    const dispatch=useDispatch();
      return useMutation({
        mutationFn: async (accessToken) => {
            const url = 'http://localhost:8080/auth/signOut';
            const signOutData = {
              accessToken
            };
            const response = await axios.post(url, signOutData);
            return response.data;
          },
          onSuccess: (data) => {
            dispatch(logOut(data));
          },
      })

}

export default useSignOut;