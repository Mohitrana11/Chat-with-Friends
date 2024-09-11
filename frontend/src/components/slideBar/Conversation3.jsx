import React from 'react';
import './Slidebar.css';
import { useEffect,useState } from 'react';
import axios from 'axios';
function Conversation3({ onClick, data }) {
    const getTimeDifference = (updatedAt) => {
        const updatedAtDate = new Date(updatedAt);
        const currentTime = new Date();
        const timeDifferenceMs = currentTime - updatedAtDate;
        const timeDifferenceSeconds = Math.floor(timeDifferenceMs / 1000);
        const timeDifferenceMinutes = Math.floor(timeDifferenceSeconds / 60);
        const timeDifferenceHours = Math.floor(timeDifferenceMinutes / 60);
        const timeDifferenceDays = Math.floor(timeDifferenceHours / 24);
        const timeDifferenceMonths = Math.floor(timeDifferenceDays / 30);
        let displayText;
        if (timeDifferenceMinutes < 50) {
        displayText = `${timeDifferenceMinutes} minutes`;
        } else if (timeDifferenceHours < 24) {
        displayText = `${timeDifferenceHours} hours`;
        } else if (timeDifferenceDays < 30) {
        displayText = `${timeDifferenceDays} days`;
        } else {
        displayText = `${timeDifferenceMonths} months`;
        }
        return displayText;
    };

    const userData = JSON.parse(localStorage.getItem("UserInfo"));
    const user = userData.users;
    const otherUser = data.users[1];
    const [idDetails, setIdDetails] = useState([]);
    useEffect(() => {
    const fetchUsers = async () => {
        try {
            const config = {
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
            };
            const response = await axios.get(`/api/v1/details/${otherUser}`, config);
            setIdDetails(response.data);
        } catch (error) {
            console.error(error);
        }
    };
      fetchUsers();
    }, [userData.token,otherUser]);


    
  const handleMessage = (msg) => {
    const arr = msg.split(" ");
    let str = "";
    for (let i = 0; i < Math.min(3, arr.length); i++) {
      str += arr[i] + " ";
    }
    str = str.trim(); // assign the trimmed value back to str
    if (arr.length > 3) {
      str += "...";
    }
    return str;
  };



  return (
    <div className='conversation-container hover:bg-blue-100' onClick={onClick}>
      <p className='con-icon'>
        <img src={idDetails?.details?.avatar || ''} alt="" />
      </p>
      <p className='con-username'>
        {data?.isGroupChat ? data?.chatName : idDetails?.details?.username}
      </p>
      <p className='con-lastMessage'>{""}</p>
      <p className='con-timeStamp'>{getTimeDifference(data?.updatedAt)}</p>
    </div>
  );
}

export default Conversation3;