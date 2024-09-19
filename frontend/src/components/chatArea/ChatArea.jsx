import { useEffect, useState, useRef } from 'react';
import './Chat.css';
import { IoSendSharp } from "react-icons/io5";
import MessageByMe from './MessageByMe';
import MessageOther from './MessageOther';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { selectUserInputValue } from '../../context/userInputSlice';
import { io } from 'socket.io-client';

const URL = 'http://localhost:4500';
let socket;

function ChatArea() {
  const theme = useSelector((state) => state.themeKey.value);
  const userIdxValue = useSelector(selectUserInputValue);
  const userData = JSON.parse(localStorage.getItem("UserInfo"));
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [latestMessage, setLatestMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  const prevUserIdxValue = useRef(); // To store the previous userIdxValue

  // Connect socket and join chat
  useEffect(() => {
    socket = io(URL);
    socket.emit('setup', userData.users);
    socket.on('connected', () => setSocketConnected(true));

    // Listening for incoming messages
    socket.on('message received', (newMessage) => {
      if (newMessage.chat._id === userIdxValue) {
        setLatestMessage((prevMessages) => [...prevMessages, newMessage]);
      }
    });
  }, [userIdxValue]);

  // Fetch user details and join chat room once, when userIdxValue changes
  useEffect(() => {
    // Avoid re-fetching if userIdxValue hasn't changed
    if (prevUserIdxValue.current === userIdxValue) {
      return;
    }

    const fetchUsers = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userData.token}` },
        };
        const response = await axios.get(`/api/v1/details/${userIdxValue}`, config);
        setData(response.data);

        // Join chat room for the selected user
        socket.emit('join chat', userIdxValue);
      } catch (error) {
        console.error(error);
      }
    };

    if (userIdxValue) {
      fetchUsers();
      prevUserIdxValue.current = userIdxValue; // Store the current value
    }
  }, [userIdxValue, userData.token]);

  // Fetch chat messages when userIdxValue changes
  useEffect(() => {
    const fetchMessage = async () => {
      setLoading(true);
      try {
        const config = {
          headers: { Authorization: `Bearer ${userData.token}` },
        };
        const response = await axios.get(`/api/message/${userIdxValue}`, config);
        setLatestMessage(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (userIdxValue) {
      fetchMessage();
    }
  }, [userIdxValue, userData.token]);

  // Handle sending message
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${userData.token}` },
      };
      if (!data || !data?.details || !data?.details?._id) {
        console.error("Conversation ID not available");
        return;
      }

      const response = await axios.post(
        '/api/message', {
          receiverId: userIdxValue,
          message: message,
        }, config
      );

      // Emit the new message event via socket
      socket.emit('new message', response.data);

      // Reset message input and append new message to the state
      setMessage('');
      setLatestMessage((prevMessages) => [...prevMessages, response.data]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`chat-container ${theme ? '' : 'dark'}`}>
      <div className={`chat-header ${theme ? '' : 'dark'}`}>
        <p className='con-icon'>
          <img src={data?.details?.avatar} alt="" />
        </p>
        <div className='userDetails'>
          <p className='con-username'>
            {data?.details?.username}
          </p>
        </div>
      </div>
      <div className={`message-box ${theme ? '' : 'dark'}`}>
        {loading ? 'Loading...' : 
          latestMessage.map((msg) => (
            msg.senderId === userData.users._id
              ? <MessageByMe key={msg._id} message={msg.message} />
              : <MessageOther key={msg._id} message={msg.message} userImage={data?.details?.avatar} />
          ))
        }
      </div>
      <div className={`input-box ${theme ? '' : 'dark'} `}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            placeholder='Type a message...'
            className='bg-transparent'
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">
            <IoSendSharp style={{ cursor: 'pointer' }} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatArea;
