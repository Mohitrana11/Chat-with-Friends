import React from 'react'
import './mainContainer.css'
import SlideBar from '../slideBar/SlideBar'
import ChatArea from '../chatArea/ChatArea'
import Welcome from '../chatArea/Welcome'
import CreateGroups from '../chatArea/CreateGroups'

function MainContainer() {
  return (
    // <div>
    <div className='main-container'>
      <SlideBar/>
      <ChatArea/>
      {/* <Welcome/> */}
      {/* <CreateGroups/> */}
    </div>
    // </div>
  )
}

export default MainContainer
