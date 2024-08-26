// import React from 'react'
import './Chat.css'
import logo from '../../../public/chatIcon.png'
function Welcome() {
  return (

    <div className='welcome-page'>
      <img src={logo} alt="" className='w-32 h-32' />
      <p className='mt-3 text-md font-semibold '>When you Message some one, They will happy be happy😁</p>
    </div>
  )
}

export default Welcome;
