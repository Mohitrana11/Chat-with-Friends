import React, { useState } from 'react'

import { useSelector} from 'react-redux';
import { toggleTheme } from '../../context/themeSlice';
import axios from 'axios';

function CreateGroups() {
  const theme = useSelector((state) => state.themeKey.value);
  // const [userInput,setUserInput] = useState({});
  const handleInputs = (e)=>{
    setUserInput({[e.target.id]:e.target.value})
  }
  // console.log(userInput);

  const createGroup = ()=>{
    // axios.post('/api/chats/createGroup')
    console.log('hi')
  }
  return (
  <div className={` createGroup-container ${theme ? '' : 'dark'}  `}>
      <h1 className='font-bold text-xl mb-5'>Create Group</h1>
      <form action="" className='flex flex-col' onSubmit={createGroup}>
        <input type="text" placeholder='Group Name' className='outline-none border px-4 py-2 w-[30vw] rounded-md'  id='groupName' onChange={handleInputs}/>
        <input type="text" placeholder='Search User' className='outline-none border mt-4 px-4 py-2 w-[30vw] rounded-md'  id='searchUser' onChange={handleInputs}/>
        <button className='btn mt-3 text-white font-bold text-lg hover:bg-green-300 hover:text-black '>CREATE</button>
      </form>
    </div>
  )
}

export default CreateGroups
