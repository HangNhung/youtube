import Topbar from "../../components/toobar/Topbar";
import "./messenger.css";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";

const Messenger = () => {
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef(io("ws://localhost:8900"));
  const { user } = useContext(AuthContext);
  const textarea = useRef(null);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessage((previous) => [...previous, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    console.log(user);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversation(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getConversation();
  }, [user]);

  useEffect(() => {
    if (currentChat) {
      const getMessage = async () => {
        try {
          const res = await axios.get("/message/" + currentChat._id);
          setMessage(res.data);
        } catch (error) {
          console.error(error);
        }
      };
      getMessage();
    }
  }, [currentChat]);

  const handleSendMess = async (e) => {
    e.preventDefault();
    const body = {
      conversationId: currentChat._id,
      sender: user._id,
      text: textarea.current.value,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: textarea.current.value,
    });

    try {
      const res = await axios.post("/message", body);
      setMessage([...message, res.data]);
      textarea.current.value = "";
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [message]);

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversation.map((c, index) => (
              <div key={index} onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {message.map((mess, index) => (
                    <div key={index} ref={scrollRef}>
                      <Message message={mess} own={user._id === mess.sender} />
                    </div>
                  ))}
                </div>
                <form className="chatBoxBottom" onSubmit={handleSendMess}>
                  <textarea
                    className="chatMessageInput"
                    placeholder="Write something..."
                    ref={textarea}
                  ></textarea>
                  <button className="chatSubmitButton" type="submit">
                    Send
                  </button>
                </form>
              </>
            ) : (
              <span className="noConversation">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
          :
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
