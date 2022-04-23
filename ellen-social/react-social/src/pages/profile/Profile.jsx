import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/toobar/Topbar";
import "./profile.css"
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { username } = useParams();
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/users?username=${username}`);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "noCover.jpeg"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "noAvatar.jpeg"
                }
                alt=""
              />
            </div>
          </div>
          <div className="profileInfo">
            <h4 className="profileInfoName">{user.username}</h4>
            <span className="profileInfoDesc">{user.desc}</span>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;