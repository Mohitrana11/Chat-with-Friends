import React from 'react'
import './mainContainer.css'
import SlideBar from '../slideBar/SlideBar'
import ChatArea from '../chatArea/ChatArea'
import Welcome from '../chatArea/Welcome'
import CreateGroups from '../chatArea/CreateGroups'
import UserGroup from '../chatArea/UserGroup'
import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../context/themeSlice'
function MainContainer() {
  const theme = useSelector((state) => state.themeKey.value);
  const dispatch = useDispatch();
  return (
    // <div>
    <div className={`main-container  ${theme ? '' : 'dark'}`}>
      <SlideBar/>
      {/* <ChatArea/> */}
      <Outlet  />

      {/* <Welcome/> */}
      {/* <CreateGroups/> */}
      {/* <UserGroup/> */}


    </div>
    // </div>
  )
}

export default MainContainer
