import React from 'react'
import '../slideBar/Slidebar.css'
import { motion } from "framer-motion"
function Conversation2() {
  return (
    <motion.div whileHover={{scale:1.01}} whileTap={{scale:0.9}} className='conversation-container'>
      <p className='con-icon'>
        <img src="https://avatar.iran.liara.run/public/5" alt="" />
      </p>
      <p className='con-username'>
        Mohit SIngh Rana
      </p>
      <p className='con-lastMessage'>Last message</p>
      <p className='con-timeStamp'>Today</p>
    </motion.div>
  )
}

export default Conversation2
