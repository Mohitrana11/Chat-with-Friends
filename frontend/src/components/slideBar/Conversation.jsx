import React from 'react'
import './Slidebar.css'

function Conversation({ onClick ,data}) {

  function calculateTimeDifference(updatedAt) {
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
    // displayText += ` (${timeDifferenceSeconds} seconds)`;

    return displayText;
}


  return (
    <div className='conversation-container hover:bg-blue-100' onClick={onClick}>
      <p className='con-icon'>
        <img src={data?.avatar} alt="" />
      </p>
      <p className='con-username'>
       {data?.username}
      </p>
      <p className='con-lastMessage'>Last message</p>
      <p className='con-timeStamp'>{calculateTimeDifference(data?.updatedAt)}</p>
    </div>
  )
}

export default Conversation