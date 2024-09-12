import {  useState } from "react";
// import axios from 'axios';
import {toast} from 'react-hot-toast';
// import { useNavigate } from "react-router-dom";
export default function useConnectUsers(){

    const [userId,setUserId] = useState();

    // const userLogin =async ()=>{
    // }
    // return {userInfo,setUserInfo,loading, userLogin};
    return {userId,setUserId};
}