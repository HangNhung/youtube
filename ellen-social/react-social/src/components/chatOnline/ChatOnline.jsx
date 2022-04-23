import "./chatOnline.css";
import { useState, useEffect } from "react";
import axios from "axios";

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [onlienFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get("/users/friends/" + currentId);
        setFriends(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  return (
    <div className="chatOnline">
      {onlienFriends.map((o) => (
        <div className="chatOnlineFriend">
          <div className="chatOnlineImgContainer">
            <div className="chatOnlineBadge"></div>
            <img
              className="chatOnlineImg"
              src={o?.profilePicture ? o.profilePicture : PF + "noAvatar.jpeg"}
              alt=""
            />
          </div>
          <span className="chatOnlineName">{o.username}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatOnline;
