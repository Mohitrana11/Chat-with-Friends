import React from 'react'
import './Slidebar.css'
import { CiUser } from "react-icons/ci";
import { TiUserAdd } from "react-icons/ti";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoIosMoon } from "react-icons/io";
import { MdAddCircleOutline } from "react-icons/md";  
import { IoSearchOutline } from "react-icons/io5";
import Conversation from './Conversation';
function SlideBar() {
  return (
    <div className='sidebar-container'>
      <div className="header-container">
        <div className='header-left-container'>
          <CiUser className=''/>
        </div>
        <div className='header-right-container'>
        <TiUserAdd style={{cursor:'pointer'}} />
        <AiOutlineUsergroupAdd   style={{cursor:'pointer'}}/>
        <MdAddCircleOutline   style={{cursor:'pointer'}}/>
        <IoIosMoon   style={{cursor:'pointer' }}/>
        </div>
      </div>


      <div className="search-container">
          <form action="">
            <input type="text" placeholder='Search' />
            <IoSearchOutline   style={{cursor:'pointer' }}/>
          </form>
      </div>
      <div className="users-container">
        <Conversation/>
        <Conversation/>
        <Conversation/>
        <Conversation/>
        <Conversation/>
        <Conversation/>
        <Conversation/>
        <Conversation/>
        <Conversation/>
        <Conversation/>
        <Conversation/>
      </div>
    </div>
  )
}

export default SlideBar
