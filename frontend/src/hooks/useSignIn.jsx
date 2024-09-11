import {  useState } from "react";
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
export default function useSignIn(){
    const navigate = useNavigate();
    const [userInfo ,setUserInfo] = useState();
    const [loading,setLoading] = useState(false);
    const userSign =async ()=>{
        setLoading(true);
        try{
          await axios.post('/api/v1/register',userInfo).then((res)=>{
            toast.success(res.data?.message);
            localStorage.setItem('chatApp',JSON.stringify(res.data));
            navigate('/app/welcome');
            setLoading(false);
          }).catch((err)=>{
            toast.error(err?.response?.data?.message);
          })
        }catch(err){
            toast.error(err?.response?.data?.message);
        }finally{
            setLoading(false);
        }
    }
    return {userInfo,setUserInfo,loading, userSign};
}