import { useEffect, useState } from 'react';
import './Chat.css';
import { IoSendSharp } from "react-icons/io5";
import MessageByMe from './MessageByMe';
import MessageOther from './MessageOther';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { selectUserInputValue } from '../../context/userInputSlice';

function ChatArea() {
  const theme = useSelector((state) => state.themeKey.value);
  const userIdxValue = useSelector(selectUserInputValue);
  const userData = JSON.parse(localStorage.getItem("UserInfo"));
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [latestMessage, setLatestMessage] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userData.token}` },
        };
        const response = await axios.get(`/api/v1/details/${userIdxValue}`, config);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [userIdxValue]);


  useEffect(() => {
    const fetchMessage = async () => {
      if (!userData || !userData.token) {
        console.error("Invalid user data or token");
        return;
      }
  
      if (!userIdxValue) {
        console.error("Invalid user index value");
        return;
      }
  
      setLoading(true);
  
      try {
        const config = {
          headers: { Authorization: `Bearer ${userData.token}` },
        };
        const receiverId =  userIdxValue;
        console.log(receiverId);
        const response = await axios.get(`/api/message/${receiverId}`,config
        );
  
        setLatestMessage(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchMessage();
  }, [userIdxValue, userData?.token]);
  console.log(latestMessage)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!userData.token || !userIdxValue) {
        console.error("userData.token or userIdxValue is not set");
        return;
      }
      const config = {
        headers: { Authorization: `Bearer ${userData.token}` },
      };
      const  response = await axios.post('/api/message', {
        receiverId: userIdxValue,
        message: message
      }, config);
      setMessage('');
      // setLatestMessage(response.data);
      // setLatestMessage([...message,response.data])
    } catch (error) {
      console.error(error);
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
          msg.senderId != userData._id
            ? <MessageByMe key={msg._id} message={msg?.message} />
            : <MessageOther key={msg._id} message={msg?.message} userImage={data?.details?.avatar} />
        ))}
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
