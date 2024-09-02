// import React from 'react'
import './Login.css'
import logo from '../../../public/chatIcon.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
function Register() {
  const navigate = useNavigate();
  const [userInput,setUserInput] = useState({});
  const [loading,setLoading] = useState(false);
  const handleInput = (e)=>{
    setUserInput({...userInput ,[e.target.id]:e.target.value});
  }
  console.log(userInput);


  const handleSubmit = async (e)=>{
    e.preventDefault();
    setLoading(true);
    try{
      await axios.post('/api/v1/register',userInput).then((res)=>{
        toast.success(res.data?.message);
        localStorage.setItem('chatApp',JSON.stringify(res.data));
        navigate('/app/welcome');
        setLoading(false);
      }).catch((err)=>{
        toast.error(err?.response?.data?.message);
        setLoading(false);
      })
    }catch(err){
        toast.error(err?.response?.data?.message);
        setLoading(false);
    }
  }

  return (
    <div className='login-container '>
        <div className=" hidden sm:flex lg-left bg-white ">
            <img src={logo} alt=""  className='w-36'/>
        </div>
        <div className=" lg-right">
        <h1 className='font-bold text-xl mb-5'>Register</h1>
            <form action="" onSubmit={handleSubmit}> 
                <input type="text" placeholder='Username' className='outline-none border px-4 py-2  w-[65vw]  sm:w-[24vw] rounded-md mb-3' id='username'  onChange={handleInput}/>
                <input type="email" placeholder='Email'  id='email' className='outline-none border px-4 py-2  w-[65vw]  sm:w-[24vw] rounded-md mb-4'  onChange={handleInput} />
                <input type="text" placeholder='Password' id='password' className='outline-none border px-4 py-2 w-[65vw]  sm:w-[24vw] rounded-md' onChange={handleInput} />
                <button className='btn mt-3 bg-indigo-700 text-white font-bold text-lg hover:bg-orange-500 hover:text-black '>         { loading?"LOADING...":"SING IN"}</button>
            </form>
        <p className='mt-10'> Having a  <Link to={'/'} className='text-red-600 font-bold cursor-pointer'>Account?</Link></p>
        </div>
    </div>
  )
}

export default Register
