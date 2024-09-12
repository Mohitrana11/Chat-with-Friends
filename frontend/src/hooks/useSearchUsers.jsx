import { useState } from "react";
import axios from 'axios';
import {toast} from 'react-hot-toast';

export default function useSearchUsers(){
    const [loading,setLoading] = useState(false);
    const [search,setSearch] = useState(false);
    const [searchInput,setSearchInput] = useState('');
    const [searchDetails,searchUserDetails] = useState([]);
    

    const searchUser = async ()=>{
        setLoading(true);
        setSearch(true);
        try{
          if(searchInput.length==0){
            toast.error('Enter Something to search');
            return;
          }
          const response = await axios.get(`/api/search?search=${searchInput}`);
          const data = response.data;
          if(data.success==false){
            toast.error(data.message);
          }
          if(data.loading===0){
            toast.info('User Not found')
          }else{
            searchUserDetails(data?.users);
          }
        }catch(err){
          console.log(err);
        }finally{
            setLoading(false);
        }
    }
    return {search,setSearch,searchUser,setSearchInput,loading,searchDetails}

}