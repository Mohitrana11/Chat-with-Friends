
import './Login.css'
import logo from '../../../public/chatIcon.png'
import { Link } from 'react-router-dom'
import useSignIn from '../../hooks/useSignIn';
function Register() {
  const {userInfo,setUserInfo,loading, userSign} = useSignIn();
  const handleInput = (e)=>{
    setUserInfo({...userInfo ,[e.target.id]:e.target.value});
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    userSign()
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
