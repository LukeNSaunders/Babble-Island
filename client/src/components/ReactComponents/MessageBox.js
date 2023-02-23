import React from "react";

function MessageBox(props) {
  return (
    <div className="message-box">
      <p>{props.message}</p>
    </div>
  );
}

export default MessageBox;
