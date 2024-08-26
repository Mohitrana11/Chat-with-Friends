import React from 'react'
import './App.css'
import MainContainer from './components/mainContainer/MainContainer'
import Login from './components/authUser/Login'
import Register from './components/authUser/Register'
function App() {
  return (
    <div className='app'>
      <MainContainer/>
      {/* <Login/> */}
      {/* <Register/> */}
    </div>
  )
}

export default App
