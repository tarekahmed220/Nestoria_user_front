import React, { useEffect, useState } from "react";

import Avatar from "./Avatar.jsx";
import { Link, useNavigate } from "react-router-dom";
import AddUser from "./AddUser.jsx";
import { FaSearch } from "react-icons/fa";
import{FiMessageCircle}from "react-icons/fi"
import {GoBell } from "react-icons/go"
import ChatProvider, { ChatState } from "../context/ChatProvidor.jsx";
import axiosInstance from "../apis/axiosConfig.js";
import { toast } from "react-toastify";
import { faLessThanEqual } from "@fortawesome/free-solid-svg-icons";
import ChatBox from "./ChatBox.jsx";
// import "../css modules/chat.module.css"; 
import { useUserInfoContext } from "../context/UserProvider.jsx";
const SideBar = ({fetchAgain}) => {
  // const navigate = useNavigate();
  // const [tokenAndUser, setTokenAndUser] = useLocalStorage({
  //   key: "user",
  //   defaultValue: {},
  // });
  // const tokenAndUser=localStorage.getItem("user")
  // const socket = GetSocket();
  const { currentUser, isLogin, setIsLogin } = useUserInfoContext();
  const [loggedUser, setLoggedUser] = useState();
  const {selectedChat,
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();
  const [openSearchUser, setOpenSearchUser] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
const userInfo=JSON.parse(localStorage.getItem("user"))
console.log(userInfo.fullName)
  // useEffect(() => {
  //   if (socket) {
  //     socket.emit("siderbar", userInfo?._id);

  //     socket.on("conversation", (data) => {
  //       const conversationUserData = data?.map((convUser) => {
  //         if (convUser?.receiver?._id !== userInfo?._id) {
  //           return {
  //             ...convUser,
  //             userDetails: convUser?.receiver,
  //           };
  //         } else {
  //           return {
  //             ...convUser,
  //             userDetails: convUser?.sender,
  //           };
  //         }
  //       });
  //       setAllUsers(conversationUserData);
  //     });
  //   }
  // }, [socket, userInfo]);

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${user.token}`,
      //   },
      // };

      const { data } = await axiosInstance.get("/api/v1/fur/chat");
      setChats(data);
      console.log(data);
    } catch (error) {
      console.log( "Error Occured!",error);
    }
  };
  useEffect(() => {
    if (userInfo){
    setLoggedUser(userInfo);
    fetchChats();}
    else{
      console.log("no user")
    }
    // eslint-disable-next-line
  }, [fetchAgain, userInfo]);
  return ( 
    <ChatProvider>
    <div className="flex justify-between w-full h-[91.5vh] p-2.5">
     {/* <div className="w-full h-full grid grid-cols-[48px,1fr] pt-3 "> */}
        {/* <div className="bg-secondary h-full py-5 flex flex-col items-center justify-between"> */}
           {/* //</div><div> */}
            {/* <div className="w-12 h-12 flex justify-center items-center cursor-pointer text-slate-300 hover:text-slate-200 rounded">
               <FiMessageCircle size={20} />
            
             </div>
            <div
              title="bell notification"
              onClick={() => navigate("/notification")}
              className="w-12 h-12 flex justify-center items-center cursor-pointer text-slate-300 hover:text-slate-200 rounded"
            >
                <GoBell size={20}className="hover:text-orange-500" />
            </div>
            <div
              title="Add friend"
              onClick={() => setOpenSearchUser(true)}
              className="w-12 h-12 flex justify-center items-center cursor-pointer text-slate-300 hover:text-slate-200 rounded"
            >
              <FaSearch size={20}className="hover:text-orange-500" />
            </div>
          </div>
          <div className="flex flex-col items-center ">
            <button >
              <Avatar
                imageUrl={userInfo?.photo}
                name={userInfo?.fullName}
                userId={userInfo?._id}
              />
            
            </button>
          
          </div>
        </div> */}
    <div className="flex flex-col   w-full  rounded-lg  bg-transparent  h-[calc(100vh-65px)]  overflow-y-auto scrollbar-none   scrollbar-hidden">
                  {chats ? (
                    <div className="space-y-2 overflow-y-scroll bg-transparent">
                      {chats.map((chat) => (
                        <div
                          onClick={() => {console.log(chat._id);setSelectedChat(chat)}}
                          key={chat._id}
                          // className={`cursor-pointer px-3 py-2 rounded-lg ${
                          //   selectedChat === chat ? "bg-gray-200 text-white" : "bg-gray-600 text-black"
                            
                          className={`flex items-center space-x-3 p-3 rounded-full cursor-pointer transition duration-500 ${
                            selectedChat ? 'bg-[#C26510] text-white' : 'hover:bg-gray-700 text-[#929292]'
                          }`}
                        
                        >
     
      <img
        src={ userInfo?.photo ? userInfo?.photo : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
        alt={userInfo.fullName}
        className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
      />
      <div className="flex-1">
        <div className="flex justify-between">
          <span className="font-semibold">
          {chat.users?.length > 1 && chat.users[0]?._id === userInfo?._id
    ? chat.users[1]?.fullName
    : chat.users[0]?.fullName||"unknown user"}
            </span>
          <small className="text-gray-400 text-xs">
            {new Date(chat.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </small>
        </div>
        <p className="text-sm truncate">
          {/* {chat.lastMessage} */}
          {chat.latestMessage && (
                            <p className="text-xs">
                              <b>{chat.latestMessage.sender.fullName}:</b>{" "}
                              {chat.latestMessage.content.length > 50
                                ? chat.latestMessage.content.substring(0, 51) + "..."
                                : chat.latestMessage.content}
                            </p>
                          )}
          </p>
      </div>
      <span className={`w-3 h-3 rounded-full ${chat.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
    {/* </div> */}
{/*                         
                        <span>
  <Avatar
    imageUrl={userInfo?.photo}
    name={userInfo?.chatName}
    userId={userInfo?._id}
    onClick={() => setSelectedChat(chat)}
  />
  {chat.users?.length > 1 && chat.users[0]?._id === userInfo?._id
    ? chat.users[1]?.fullName
    : chat.users[0]?.fullName||"unknown user"}
</span>
                          
                           {chat.latestMessage && (
                            <p className="text-xs">
                              <b>{chat.latestMessage.sender.name}:</b>{" "}
                              {chat.latestMessage.content.length > 50
                                ? chat.latestMessage.content.substring(0, 51) + "..."
                                : chat.latestMessage.content}
                            </p>
                          )}  */}
                        </div>
                      ))}
                    </div>
                  ) : (
                    "No Chats"
                  )}
                </div>
                {/* {openSearchUser && <AddUser setOpenSearchUser={setOpenSearchUser} />} */}
              {/* </div> */}
              
            </div>
            </ChatProvider>
  );
}
 export default SideBar