import { Bookmark, CalendarMonth, Chat, Group, OndemandVideo, QuestionAnswer, RssFeed, School, WorkRounded } from "@mui/icons-material";
import { Users } from "../../dummyData";
import "./sidebar.css";
import CloseFriend from '../closeFriend/CloseFriend';

function Sidebar(props) {
  return (
    <div className="sidebar">
      <div className="sidebarWapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon"/>
            <span className="sidebarListItemText">Text</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon"/>
            <span className="sidebarListItemText">Chat</span>
          </li>
          <li className="sidebarListItem">
            <OndemandVideo className="sidebarIcon"/>
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon"/>
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon"/>
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <QuestionAnswer className="sidebarIcon"/>
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkRounded className="sidebarIcon"/>
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <CalendarMonth className="sidebarIcon"/>
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon"/>
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show more</button>
        <hr className="sidebarHr"/>
        <ul className="sidebarFriendList">
          {Users.map(u => (<CloseFriend key={u.id} user={u}/>))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;