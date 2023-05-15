import React, { useState, useEffect } from "react";
import "./chatbox.scss";
import { useParams } from "react-router-dom";
import { UserTypes } from "../../types/UserTypes";
import io from "socket.io-client";

interface UserProps {
  users: UserTypes[];
}

interface MessageData {
  message: string;
  timestamp: number;
  sender: string;
  recipientId?: string
}

const Chatbox: React.FC<UserProps> = ({ users }) => {
  const { userId } = useParams();
  const [user, setUser] = useState<UserTypes[]>([]);
  const [sendMessage, setSendMessage] = useState<string>("")
  const [message, setMessage] = useState<MessageData[]>([])
  const [sentMessage, setSentMessage] = useState<MessageData[]>([])
  
  const socket = io('http://localhost:3001')
  

  const handleMessage = () => {
    if(sendMessage !== ""){
      const messageData = {
        message: sendMessage,
        timestamp: Date.now(),
        sender: "user",
        recipientId: userId
      }
      setMessage((prevMessage) => [...prevMessage, messageData])
      socket.emit("receive-message", messageData)
    }
    setSendMessage("")
  }

  useEffect(() => {
    const getUser = async () => {
      
      const userData = await users.filter(
        (user) => Number(user.id) === Number(userId)
      );
      setUser(userData);

    };
    getUser();

  }, [userId, users]);

  useEffect(() => {
    socket.on("send-message", (data) => {
      const messageData = {
        message: data.message,
        timestamp: Date.now(),
        sender: "receiver",
        recipientId: userId
      }
      setSentMessage((prevMessage) => [...prevMessage, messageData])
    })

    return () => {
      socket.off("send-message")
    }
  },[socket])

  const mergedMessages = [...message, ...sentMessage];
  const sortedMessages = mergedMessages.sort((a, b) => a.timestamp - b.timestamp)
  const recipientMessages = sortedMessages.filter((m) => m.recipientId === userId)

  if (!user || user.length === 0) {
    return null;
  }


  return (
    <div className="container-flex">
      {user.map((u) => (
        <div
          key={u.id}
          className="chat-header p-4 bg-success m-0 shadow-sm d-flex flex-row text-light align-items-center"
        >
          <img
            src={u.img}
            className="img-thumbnail rounded-circle mx-4"
            width="75px"
            height="75px"
            alt="user-avatar"
          />
          <h4>
            {u.firstName} {u.lastName}
          </h4>
        </div>
      ))}
      <div className="chat-body">
        {recipientMessages.map((m, index) => (
          <div key={index} className={`d-flex justify-content-${m.sender === "user" ? "end" : "start"}`}>
            <div className={`bg-${m.sender === "user" ? "primary" : "secondary"} m-4 p-2 text-light rounded w-25`}>
              <p className="m-0">{m.message}</p>
            </div>
          </div>
        ))}

      </div>
      <div className="chat-footer">
        <div className="input-group">
          <input
            
            type="text"
            placeholder="Type your message here..."
            className="form-control"
            value={sendMessage}
            onChange={(e) => setSendMessage(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleMessage} type="button">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
