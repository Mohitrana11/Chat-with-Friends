import React from 'react'
import './Chat.css'
import { IoSearchOutline } from "react-icons/io5";
import { IoSendSharp } from "react-icons/io5";
import MessageByMe from './MessageByMe';
import MessageOther from './MessageOther';
function ChatArea() {
  return (
    <div className='chat-container'>
      <div className='chat-header'>
      <p className='con-icon'>
        <img src="https://avatar.iran.liara.run/public/5" alt="" />
      </p>
      <div className='userDetails'>
      <p className='con-username'>
        Mohit SIngh Rana
      </p>
      <p className='con-lastMessage'>Online</p>
      </div>
      </div>


      <div className='message-box'>
        <MessageOther/>
        <MessageByMe/>
        <MessageOther/>
        <MessageByMe/>
        <MessageOther/>
        <MessageByMe/>
        <MessageOther/>
        <MessageByMe/>
        <MessageByMe/>
        <MessageByMe/>
        <MessageByMe/>
      </div>

      <div className='input-box'>
      <form action="">
            <input type="text" placeholder='Search' />
            <IoSendSharp style={{cursor:'pointer'}} />
          </form>
      </div>
    </div>
  )
}

export default ChatArea
