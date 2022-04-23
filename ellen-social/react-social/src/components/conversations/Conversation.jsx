import "./conversations.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Conversation = ({ conversation, currentUser }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, [conversation, currentUser]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={user?.profilePicture ? user.profilePicture : PF + "noAvatar.jpeg"}
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
};

export default Conversation;
