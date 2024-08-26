import React from 'react'
import './Slidebar.css'
function Conversation() {
  return (
    <div className='conversation-container'>
      <p className='con-icon'>
        <img src="https://avatar.iran.liara.run/public/5" alt="" />
      </p>
      <p className='con-username'>
        Mohit SIngh Rana
      </p>
      <p className='con-lastMessage'>Last message</p>
      <p className='con-timeStamp'>Today</p>
    </div>
  )
}

export default Conversation
