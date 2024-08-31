import React, { useState } from 'react';
import './Slidebar.css';
import { CiUser } from "react-icons/ci";
import { TiUserAdd } from "react-icons/ti";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoIosMoon } from "react-icons/io";
import { MdAddCircleOutline } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import Conversation from './Conversation';
import { useNavigate } from 'react-router-dom';
import { IoSunnySharp } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../context/themeSlice';

function SlideBar() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const theme = useSelector((state) => state.themeKey.value);
  const dispatch = useDispatch();

  return (
    <div className={`sidebar-container ${theme ? '' : 'dark'}`}>
      <div className={`header-container ${theme ? '' : 'dark'}`}>
        <div className='header-left-container'>
          <CiUser />
        </div>
        <div className='header-right-container'>
          <TiUserAdd onClick={() => { navigate('/app/available') }} style={{ cursor: 'pointer' }} />
          <AiOutlineUsergroupAdd onClick={() => { navigate('/app/usergroups') }} style={{ cursor: 'pointer' }} />
          <MdAddCircleOutline onClick={() => { navigate('/app/creategroups') }} style={{ cursor: 'pointer' }} />
          {theme ? 
            <IoIosMoon onClick={() => dispatch(toggleTheme())} style={{ cursor: 'pointer' }} /> : 
            <IoSunnySharp onClick={() => dispatch(toggleTheme())} style={{ cursor: 'pointer' }} />
          }
        </div>
      </div>
      <div className={`search-container ${theme ? '' : 'dark'}`}>
        <form>
          <input type="text" value={searchValue} placeholder='Search' onChange={handleSearchChange} className='bg-transparent' />
          <IoSearchOutline style={{ cursor: 'pointer' }} />
        </form>
      </div>
      <div className={`users-container ${theme ? '' : 'dark'}`}>
        <Conversation key="conversation-1" onClick={() => { navigate('/app/chat') }} />
        <Conversation key="conversation-1" onClick={() => { navigate('/app/chat') }} />
      </div>
    </div>
  );
}

export default SlideBar;
