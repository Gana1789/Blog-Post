import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { login } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const useLogin = () => {
    const dispatch = useDispatch();
    const Navigate=useNavigate();
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
        Navigate("/post")
      },
      retry:false
    });
  };
export default useLogin;
// const {data, isLoading, error, onSuccess, mutate}=