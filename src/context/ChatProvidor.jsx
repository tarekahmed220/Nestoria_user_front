// import React, { createContext, useContext, useEffect, useState } from "react";
// import{useNavigate}from "react-router-dom"
// const ChatContext = createContext();

// const ChatProvider = ({ children }) => {
//   const [selectedChat, setSelectedChat] = useState();
//   const [user, setUser] = useState();
//   const [notification, setNotification] = useState([]);
//   const [chats, setChats] = useState();

//   const navigate=useNavigate();

//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("user"));
//     setUser(userInfo);

//     if (!userInfo) navigate("/login");
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [navigate]);

//   return (
//     <ChatContext.Provider
//       value={{
//         selectedChat,
//         setSelectedChat,
//         user,
//         setUser,
//         notification,
//         setNotification,
//         chats,
//         setChats,
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };

// export const ChatState = () => {
//   return useContext(ChatContext);
// };

// export default ChatProvider;
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../apis/axiosConfig";
import { useUserInfoContext } from "./UserProvider";
const ENDPOINT = "http://localhost:5000";
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const [socket, setSocket] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { currentUser, setCurrentUser } = useUserInfoContext();

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    if (token) {
      const socketInstance = io(ENDPOINT, {
        auth: { token },
        transports: ["websocket", "polling"],
      });
      setSocket(socketInstance);
    } else {
      console.log("No token found, socket not initialized");
    }

    return () => {
      if (socket) socket.disconnect();
    };
  }, [token]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data } = await axiosInstance.get("/api/v1/fur/users/myprofile");
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user info", error);

        navigate("/"); // If the token is invalid, redirect to login

      }
    };
    // if (token) {
    //   fetchUserInfo();
    // } else {
    //   navigate("/login");
    // }
  }, [navigate]);

  
  }, [ navigate]);

  

  useEffect(() => {
    if (socket) {
      console.log("Socket instance:", socket);
    } else {
      console.log("Socket is still null");
    }
  }, [socket]);
  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        socket,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
