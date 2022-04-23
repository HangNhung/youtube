import "./message.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js";

const Message = ({ message, own }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + message.sender);
        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, [message]);
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="conversationImg"
          src={
            user?.profilePicture ? user.profilePicture : PF + "noAvatar.jpeg"
          }
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
