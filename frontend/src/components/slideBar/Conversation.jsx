import React from 'react'
import './Slidebar.css'

function Conversation({ onClick ,data}) {
  return (
    <div className='conversation-container' onClick={onClick}>
      <p className='con-icon'>
        <img src={data?.avatar} alt="" />
      </p>
      <p className='con-username'>
       {data?.username}
      </p>
      <p className='con-lastMessage'>Last message</p>
      <p className='con-timeStamp'>Today</p>
    </div>
  )
}

export default Conversation