import React from 'react'
import './Login.css'
import logo from '../../../public/chatIcon.png'
function Login() {
  return (
    <div className='login-container '>
        <div className=" hidden sm:flex lg-left bg-white ">
            <img src={logo} alt=""  className='w-36'/>
        </div>
        <div className=" lg-right">
        <h1 className='font-bold text-xl mb-5'>Login </h1>
            <form action=""> 
                <input type="email" placeholder='Email'  className='outline-none border px-4 py-2 w-[65vw]  sm:w-[24vw] rounded-md mb-4'  />
                <input type="text" placeholder='Password' className='outline-none border px-4 py-2 w-[65vw]  sm:w-[24vw] rounded-md' />
                <button className='btn mt-3 bg-indigo-700 text-white font-bold text-lg hover:bg-orange-500 hover:text-black '>CREATE</button>
            </form>
        <p className='mt-10'> New User <a href="" className='text-red-600 font-bold cursor-pointer'>Register?</a></p>
        </div>
    </div>
  )
}

export default Login
