import React, { useEffect, useState } from 'react'
import { CiUser } from "react-icons/ci";
import { TiUserAdd } from "react-icons/ti";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoIosMoon } from "react-icons/io";
import { MdAddCircleOutline } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import Conversation2 from './Conversations2';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../context/themeSlice';  
import { AnimatePresence } from 'framer-motion';

import { motion } from "framer-motion"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function AvailableUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const theme = useSelector((state) => state.themeKey.value);


  const userData =JSON.parse(localStorage.getItem('chatApp'));
  const user = userData.user;
  console.log(user._id)


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/v1/details');
        setUsers(response?.data?.users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();

  }, []);
 

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
          className={`availableUsers-groups  ${theme ? '' : 'dark'}`}>
         <div className={`header-container ${theme ? '' : 'dark'}`}>
        <div className='header-left-container'>
          <CiUser className=''/>
        </div>
        <h2>
           You Connections
        </h2>
        </div>


      <div className={`search-container  ${theme ? '' : 'dark'}`}>
          <form action="">
            <input type="text" placeholder='Search'className='bg-transparent' />
            <IoSearchOutline   style={{cursor:'pointer' }}/>
          </form>
      </div>
      <div className={`users-container  ${theme ? '' : 'dark'}`}>
        <Conversation2/>
        {
          users.map((item, idx) => (
            <Conversation2 key={idx} data={item} onClick={() => {
           
               axios.post('/api/chats',{userId:user._id})
              navigate('/app/chat') }} /> 
           ))
        } 
      </div>
    </motion.div>
    </AnimatePresence>
  )
}

export default AvailableUsers
