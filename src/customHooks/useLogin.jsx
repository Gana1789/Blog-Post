import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { login } from "../features/authSlice";
import { useDispatch } from "react-redux";
const useLogin = () => {
    const dispatch = useDispatch();
    return useMutation({
      mutationFn: async ({ username, password }) => {
        const url = 'http://localhost:8080/auth/login';
        const loginData = {
          username,
          password,
        };
        const response = await axios.post(url, loginData);
        return response.data;
      },
      onSuccess: (data) => {
        dispatch(login(data));
      },
    });
  };
export default useLogin;
// const {data, isLoading, error, onSuccess, mutate}=