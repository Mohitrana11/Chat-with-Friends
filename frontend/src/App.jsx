// import React from 'react'
import './App.css'

import  { Toaster } from 'react-hot-toast';


import MainContainer from './components/mainContainer/MainContainer'
import Login from './components/authUser/Login'
import Register from './components/authUser/Register'
import {BrowserRouter, Routes ,Route}  from 'react-router-dom'
import Welcome from './components/chatArea/Welcome'
import ChatArea from './components/chatArea/ChatArea'
import CreateGroups from './components/chatArea/CreateGroups'
import UserGroup from './components/chatArea/UserGroup'
import AvailableUsers from './components/chatArea/AvailableUsers'

import VerifyUser from './components/utils/VerifyUser'

function App() {

  return (
    <div className='app'>

      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route element={<VerifyUser/>}>
        <Route path='/app' element={ <MainContainer/>} >
            <Route path='welcome' element={<Welcome/>} />
            <Route path='chat' element={<ChatArea/>} />
            <Route path='creategroups' element={<CreateGroups/>} />
            <Route path='usergroups' element={<UserGroup/>} />
            <Route path='available' element={<AvailableUsers/>} />
        </Route>
        </Route>

        <Route path='/register' element={<Register/>} />
        {/* <Route path='*' element={<Register/>} /> */}
      </Routes>
      </BrowserRouter>
      <Toaster/>

    </div>
  )
}

export default App
