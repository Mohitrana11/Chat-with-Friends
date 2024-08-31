import React from 'react'
import { CiUser } from "react-icons/ci";
import { TiUserAdd } from "react-icons/ti";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoIosMoon } from "react-icons/io";
import { MdAddCircleOutline } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import Conversation2 from './Conversations2';
// import Conversation2 from './Conversation2';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../context/themeSlice';
import { motion } from "framer-motion"
import { AnimatePresence } from 'framer-motion';
function UserGroup() {
  const theme = useSelector((state) => state.themeKey.value);
  const dispatch = useDispatch();
  return (
  <AnimatePresence>
      <motion.div 
          initial={{opacity:0,scale:0}}
          animate={{opacity:1,scale:1}}
          exit={{opacity:0,scale:0}}
          transition={
          {  ease:'anticipate',
            duration:'0.5'
          }}
      
      className={`user-groups ${theme ? '' : 'dark'}`}>
        <div className={`header-container ${theme ? '' : 'dark'}`}>
        <div className='header-left-container'>
          <CiUser className=''/>
        </div>
        <h2>
            Online Users
        </h2>
        </div>


      <div className={`search-container ${theme ? '' : 'dark'}`}>
          <form action="">
            <input type="text" placeholder='Search'className='bg-transparent' />
            <IoSearchOutline   style={{cursor:'pointer' }}/>
          </form>
      </div>
      <div className={` users-container  ${theme ? '' : 'dark'} `}>
        <Conversation2/>
        <Conversation2/>
        <Conversation2/>
        <Conversation2/>
        <Conversation2/>
        <Conversation2/>
        <Conversation2/>
        <Conversation2/>
        <Conversation2/>
        <Conversation2/>
        <Conversation2/>
      </div>
    </motion.div>
  </AnimatePresence>
  )
}

export default UserGroup
