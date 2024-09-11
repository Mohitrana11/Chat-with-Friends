
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

const MessageComponent = ({ receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [loading, setLoading] = useState(false);
  console.log(messages);
  // const [searchPramas,setSearchPramas] = useSearchParams();
  // const location = useLocation();
  // const urlParams = new URLSearchParams(location.search);
  // const id = urlParams.get('id');
  const url = new URL(window.location.href);
  const id = url.searchParams.get('id');
  console.log(id)
  // const params = useParams()
  // console.log(params.)


  const fetchMessages = async () => {
    try {
      const response = await axios.get(`/api/messages/${receiverId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('chatApp')}`, 
        },
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!messageInput.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post(`/api/messages/${receiverId}`, 
      {
        message: messageInput
      }, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you store the token in localStorage
        },
      });
      setMessages([...messages, response.data]);
      setMessageInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [receiverId]);

  return (
    <div>
      <div className="message-list">
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg._id} className={`message-item ${msg.senderId === receiverId ? 'received' : 'sent'}`}>
              <p>{msg.message}</p>
              <span>{new Date(msg.createdAt).toLocaleString()}</span>
            </div>
          ))
        )}
      </div>

      <div className="message-input">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default MessageComponent;




















// import React, { useEffect, useState } from 'react'
// import './Chat.css'
// import { IoSearchOutline } from "react-icons/io5";
// import { IoSendSharp } from "react-icons/io5";
// import MessageByMe from './MessageByMe';
// import MessageOther from './MessageOther';
// import { useSelector} from 'react-redux';
// import { toggleTheme } from '../../context/themeSlice';
// import axios from 'axios';
// // import { allMessages } from '../../../../backend/controllers/message';

// function ChatArea() {
//   const theme = useSelector((state) => state.themeKey.value);
//   const [messageContent,setMessageContent] = useState("");
//   const [allMessages,setAllMessages] = useState([]);
//   const [chat_id,chat_user] = dyParams._id.split('&');
//   // const [refresh,setRefresh] = useState('');
//   const handleSubmit = ()=>{
//     const sendMessageTo = async ()=>{
//       await axios.post('/api/message/:id',{
//         message:messageContent,
//         // conversationId:
//       }).then((response)=>{
//         // res=data
//         console.log('Message  Fired')
//       })

//     }
//   }

//   useEffect(()=>{
//     axios.get('/api/message/'+chat_id).then((data)=>{
//       setAllMessages(data);
//       //socket.emit('join chat',chat_id);
//     })
//     setAllMessages(allMessages)
//   },[refresh,chat_id,userData.data.token,allMessages])

//   return (
//     <div className={`chat-container  ${theme ? '' : 'dark'}`}>
//       <div className={`chat-header ${theme ? '' : 'dark'}`}>
//       <p className='con-icon'>
//         <img src="https://avatar.iran.liara.run/public/5" alt="" />
//       </p>
//       <div className='userDetails'>
//       <p className='con-username'>
//         Mohit SIngh Rana
//       </p>
//       <p className='con-lastMessage'>Online</p>
//       </div>
//       </div>

//       <div className={`message-box ${theme ? '' : 'dark'}`}>
//         <MessageByMe/>
//         {/* <MessageOther/>
//         <MessageOther/>
//         <MessageByMe/>
//         <MessageOther/>
//         <MessageByMe/>
//         <MessageOther/>
//         <MessageByMe/>
//         <MessageByMe/>
//         <MessageByMe/>
//         <MessageByMe/> */}
//       </div>

//       <div className={`input-box ${theme ? '' : 'dark'} `}>
//       <form action="" onSubmit={handleSubmit}>
//             <input type="text" value={messageContent}  placeholder='Search'  className='bg-transparent' 
//             onChange={(e)=>{
//               setMessageContent(e.target.value);
//             }}
//             onKeyDown={(e)=>{
//               if(e.code=='Enter'){
//                 setMessageContent('');
//               }
//             }}
//             />
//          <button>    <IoSendSharp style={{cursor:'pointer'}} /></button>
//           </form>
//       </div>
//     </div>
//   )
// }

// export default ChatArea
