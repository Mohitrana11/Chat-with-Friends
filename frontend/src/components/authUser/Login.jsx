// import React from 'react'
import './Login.css'
import logo from '../../../public/chatIcon.png'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
function Login() {
  const navigate = useNavigate();
  const [userInput,setUserInput] = useState({});
  const [loading,setLoading] = useState(false);
  const handleInput = (e)=>{
    setUserInput({...userInput,[e.target.id]:e.target.value})
  }
  console.log(userInput)
  const handleSubmit =async (e)=>{
    e.preventDefault();
    setLoading(true);
    try{
      const userLogin = await axios.post('/api/v1/login',userInput)
      const data = userLogin.data;
      toast.success(data?.message);
      navigate('/app/welcome');
      setLoading(false);
    }catch(err){
      toast.success(err.response?.data?.message);
      setLoading(false);
    }
  }


  return (
    <div className='login-container '>
        <div className=" hidden sm:flex lg-left bg-white ">
            <img src={logo} alt=""  className='w-36'/>
        </div>
        <div className=" lg-right">
        <h1 className='font-bold text-xl mb-5'>Login </h1>
            <form action="" onSubmit={handleSubmit}>
                <input type="email" placeholder='Email'  className='outline-none border px-4 py-2 w-[65vw]  sm:w-[24vw] rounded-md mb-4'  id='email'  onChange={handleInput} />
                <input type="text" placeholder='Password' className='outline-none border px-4 py-2 w-[65vw]  sm:w-[24vw] rounded-md' id='password'  onChange={handleInput} />
                <button className='btn mt-3 bg-indigo-700 text-white font-bold text-lg hover:bg-orange-500 hover:text-black '>
                   { loading?"LOADING...":"CREATE"}
                  </button>
            </form>
        <p className='mt-10'> New User <Link to={'/register'} className='text-red-600 font-bold cursor-pointer'>Register?</Link></p>
        </div>
    </div>
  )
}

export default Login
