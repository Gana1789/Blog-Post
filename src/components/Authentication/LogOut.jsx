import React from 'react';
import { useDispatch } from 'react-redux';
import { getActiveUserName } from '../../features/authSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useSignOut from '../../customHooks/useSignOut';
import { logOut } from '../../features/authSlice';
function LogOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {mutateAsync:signOut, isSuccess}=useSignOut()
  const loginUserName=useSelector(getActiveUserName)
  const handleSignOut = async () => {
    if(loginUserName!=""){

        try {
         
          const response=await signOut()
                if(isSuccess){
                    dispatch(logOut())
                    navigate('/');
                }
         
        } catch (error) {
          // Handle errors if needed
          console.error('Logout failed:', error);
        }
    }
  };

  React.useEffect(() => {
    handleSignOut();
  }, [handleSignOut]);


  return <div>Session Expired Logging out...</div>;
}

export default LogOut;
