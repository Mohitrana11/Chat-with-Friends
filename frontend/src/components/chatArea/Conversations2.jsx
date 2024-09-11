import React from 'react'
import '../slideBar/Slidebar.css'
import { motion } from "framer-motion"
function Conversation2({data}) {
  return (
    <motion.div whileHover={{scale:1.01}} whileTap={{scale:0.9}} className='conversation-container'>
      <p className='con-icon'>
        <img src={data?.avatar} alt="" />
      </p>
      <p className='con-username'>
        {data?.username}
      </p>
      <p className='con-lastMessage'>Last message</p>
      <p className='con-timeStamp'>Today</p>
    </motion.div>
  )
}

export default Conversation2
