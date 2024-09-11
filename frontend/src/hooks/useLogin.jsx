import {  useState } from "react";
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
export default function useLogin(){
    const navigate = useNavigate();
    const [userInfo ,setUserInfo] = useState();
    const [loading,setLoading] = useState(false);
    const userLogin =async ()=>{
        setLoading(true);
        try{
          const userLogin = await axios.post('/api/v1/login',userInfo)
          const data = userLogin.data;
          toast.success(data?.message);
          navigate('/app/welcome');
          localStorage.setItem('UserInfo',JSON.stringify(data));
        }catch(err){
          toast.success(err.response?.data?.message);
        }finally{
            setLoading(false);
        }
    }
    return {userInfo,setUserInfo,loading, userLogin};
}