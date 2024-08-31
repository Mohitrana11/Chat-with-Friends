import React from 'react'
import './Chat.css'
import { IoSearchOutline } from "react-icons/io5";
import { IoSendSharp } from "react-icons/io5";
import MessageByMe from './MessageByMe';
import MessageOther from './MessageOther';
import { useSelector} from 'react-redux';
import { toggleTheme } from '../../context/themeSlice';

function ChatArea() {
  const theme = useSelector((state) => state.themeKey.value);
  return (
    <div className={`chat-container  ${theme ? '' : 'dark'}`}>
      <div className={`chat-header ${theme ? '' : 'dark'}`}>
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


      <div className={`message-box ${theme ? '' : 'dark'}`}>
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

      <div className={`input-box ${theme ? '' : 'dark'} `}>
      <form action="">
            <input type="text" placeholder='Search'  className='bg-transparent'/>
            <IoSendSharp style={{cursor:'pointer'}} />
          </form>
      </div>
    </div>
  )
}

export default ChatArea
