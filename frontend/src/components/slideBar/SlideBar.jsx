import React, { useEffect, useState } from 'react';
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
import axios from 'axios';

function SlideBar() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [users, setUsers] = useState([]); // Use useState instead of useRef

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const theme = useSelector((state) => state.themeKey.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/v1/details');
        setUsers(response.data.users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();

  }, []);

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
        {
          users.map((item, idx) => (
            <Conversation key={idx} data={item} onClick={() => { navigate('/app/chat') }} />
          ))
        }
      </div>
    </div>
  );
}

export default SlideBar;