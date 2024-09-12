import React from 'react'
import './Chat.css'
function MessageOther({message,userImage}) {
  return (
    <>
      <div className="chat chat-start">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
    <img src={userImage} alt="" />
    </div>
  </div>
  <div className="chat-bubble">{message}</div>
</div>
    </>
  )
}

export default MessageOther
