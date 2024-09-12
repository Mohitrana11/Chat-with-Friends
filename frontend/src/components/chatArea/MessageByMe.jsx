import React from "react";
import "./Chat.css";
function MessageByMe({message}) {
  return (
    <>
      <div className="chat chat-end">
        <div className="chat-bubble chat-bubble-info">{message}</div>
      </div>
    </>
  );
}

export default MessageByMe;
