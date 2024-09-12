import React, { useEffect, useState } from 'react';
import './Slidebar.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInputValue, selectUserInputValue } from '../../context/userInputSlice'; // Corrected import
import { useNavigate } from 'react-router-dom';

function Conversation3({ data }) {

    const getTimeDifference = (updatedAt) => {
        const updatedAtDate = new Date(updatedAt);
        const currentTime = new Date();
        const timeDifferenceMs = currentTime - updatedAtDate;
        const timeDifferenceMinutes = Math.floor(timeDifferenceMs / 1000 / 60);
        const timeDifferenceHours = Math.floor(timeDifferenceMinutes / 60);
        const timeDifferenceDays = Math.floor(timeDifferenceHours / 24);
        const timeDifferenceMonths = Math.floor(timeDifferenceDays / 30);
        
        if (timeDifferenceMinutes < 50) return `${timeDifferenceMinutes} minutes`;
        if (timeDifferenceHours < 24) return `${timeDifferenceHours} hours`;
        if (timeDifferenceDays < 30) return `${timeDifferenceDays} days`;
        return `${timeDifferenceMonths} months`;
    };

    const userData = JSON.parse(localStorage.getItem("UserInfo"));
    const user = userData?.users;
    const otherUser = data.users[1];
    const [idDetails, setIdDetails] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${userData.token}` },
                };
                const response = await axios.get(`/api/v1/details/${otherUser}`, config);
                setIdDetails(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, [userData.token, otherUser]);


    const handleMessage = (msg) => {
        const arr = msg.split(" ");
        let str = arr.slice(0, 3).join(" ");
        if (arr.length > 3) str += "...";
        return str;
    };

    const dispatch = useDispatch();
    // const userIdxValue = useSelector(selectUserInputValue);
    const navigate = useNavigate();
    const handleInputChange = () => {
        dispatch(setUserInputValue(otherUser)); // Ensure this sets the correct value
        navigate('/app/chat')
    };

    return (
        <div className='conversation-container hover:bg-blue-100' onClick={handleInputChange}>
            <p className='con-icon'>
                <img src={idDetails?.details?.avatar || ''} alt="User Avatar" />
            </p>
            <p className='con-username'>
                {data?.isGroupChat ? data?.chatName : idDetails?.details?.username}
            </p>
            <p className='con-lastMessage'>{handleMessage(data?.lastMessage?.content || "")}</p>
            <p className='con-timeStamp'>{getTimeDifference(data?.updatedAt)}</p>
        </div>
    );
}

export default Conversation3;
