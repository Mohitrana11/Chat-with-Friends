// import React from 'react'
import './Login.css'
import logo from '../../../public/chatIcon.png'
// import { Link, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
// import { useState } from 'react'
// import axios from 'axios';
// import { toast } from 'react-toastify';
import useLogin from '../../hooks/useLogin';
function Login() {
  const {userInfo,setUserInfo,loading, userLogin} = useLogin();
  const handleInput = (e)=>{
    setUserInfo({...userInfo,[e.target.id]:e.target.value})
  }
  const handleSubmit =async (e)=>{
    e.preventDefault();
    userLogin();
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
