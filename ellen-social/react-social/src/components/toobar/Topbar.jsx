import { Chat, Notifications, Person, Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./topbar.css";
import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";

function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Ellensocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "noAvatar.jpeg"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}

export default Topbar;
