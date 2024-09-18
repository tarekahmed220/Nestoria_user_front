import React, { useEffect, useState } from "react";
import { GetSocket, SocketProvidor } from "../context/SocketProvidor.jsx";

import Avatar from "./Avatar.jsx";

import { Link, useNavigate } from "react-router-dom";

import { FaSearch } from "react-icons/fa";
import{FiMessageCircle}from "react-icons/fi"
import {GoBell } from "react-icons/go"
import { ChatState } from "../context/ChatProvidor.jsx";
import axiosInstance from "../apis/axiosConfig.js";
import { toast } from "react-toastify";
import { faLessThanEqual } from "@fortawesome/free-solid-svg-icons";
import ChatBox from "./ChatBox.jsx";
import "../css modules/chat.module.css"; 
import { useUserInfoContext } from "../context/UserProvider.jsx";

const SideBar = ({fetchAgain}) => {
  const navigate = useNavigate();

 
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
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
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
  }, [fetchAgain]);
  return ( 
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
                    <div className="space-y-2 overflow-y-scroll bg-transparent overflow-x-hidden"style={{ scrollbarWidth:'none'}} >
                      {chats.map((chat) => (
                        <div
                          onClick={() => setSelectedChat(chat)}
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
                {/* //{openSearchUser && <AddUser setOpenSearchUser={setOpenSearchUser} />} */}
              {/* </div> */}
              
            </div>
  );
  //   <div className="w-full h-full grid grid-cols-[48px,1fr]">
  //     <div className="bg-secondary h-full py-5 flex flex-col items-center justify-between">
  //       <div>
  //         <div className="w-12 h-12 flex justify-center items-center cursor-pointer text-slate-300 hover:text-slate-200 rounded">
  //           <FiMessageCircle size={20} />
          
  //         </div>
  //         <div
  //           title="bell notification"
  //           onClick={() => navigate("/notification")}
  //           className="w-12 h-12 flex justify-center items-center cursor-pointer text-slate-300 hover:text-slate-200 rounded"
  //         >
  //             <GoBell size={20}className="hover:text-orange-500" />
  //         </div>
  //         <div
  //           title="Add friend"
  //           onClick={() => setOpenSearchUser(true)}
  //           className="w-12 h-12 flex justify-center items-center cursor-pointer text-slate-300 hover:text-slate-200 rounded"
  //         >
  //           <FaSearch size={20}className="hover:text-orange-500" />
  //         </div>
  //       </div>
  //       <div className="flex flex-col items-center ">
  //         <button >
  //           <Avatar
  //             imageUrl={userInfo?.photo}
  //             name={userInfo?.fullName}
  //             userId={userInfo?._id}
  //           />
          
  //         </button>
        
  //       </div>
  //     </div>

  //     <div className="w-full bg-primary border-r-2 border-r-secondary">
  //       <div className="h-16 px-3 flex items-center justify-between">
  //         <h2 className="text-xl font-bold p-4 text-gray-300">
  //           Chats
  //         </h2>
  //         <div className="flex gap-2 text-slate-300">
  //         </div>
  //       </div>
  //       {/* <div className="h-16 px-3"><input/></div> */}
  //              {/* all users */}
  //       <div className="h-[calc(100vh-65px)]  overflow-y-auto scrollbar">
  //         {allUsers?.length ? (
  //           allUsers?.map((conv) => {
  //             return (
  //               <div
  //               className={`${
  //                 selectedChat ? "hidden" : "flex"
  //               } md:flex flex-col items-center p-3 bg-white w-full md:w-[31%] rounded-lg border border-gray-300`}
  //             >
  //               <div className="pb-3 px-3 text-[28px] md:text-[30px] font-sans w-full flex justify-between items-center">
  //                 My Chats
  //                 {/* <GroupChatModal>
  //                   <button className="flex items-center justify-center text-[17px] md:text-[10px] lg:text-[17px]">
  //                     New Group Chat
  //                     <AddIcon />
  //                   </button>
  //                 </GroupChatModal> */}
  //               </div>
              
  //               <div className="flex flex-col p-3 bg-gray-100 w-full h-full rounded-lg overflow-hidden">
  //                 {chats ? (
  //                   <div className="space-y-2 overflow-y-scroll">
  //                     {chats.map((chat) => (
  //                       <div
  //                         onClick={() => setSelectedChat(chat)}
  //                         key={chat._id}
  //                         className={`cursor-pointer px-3 py-2 rounded-lg ${
  //                           selectedChat === chat ? "bg-teal-500 text-white" : "bg-gray-300 text-black"
  //                         }`}
  //                       >
  //                         <p>
  //                           {chat.chatName}
  //                         </p>
  //                         {/* {chat.latestMessage && (
  //                           <p className="text-xs">
  //                             <b>{chat.latestMessage.sender.name}:</b>{" "}
  //                             {chat.latestMessage.content.length > 50
  //                               ? chat.latestMessage.content.substring(0, 51) + "..."
  //                               : chat.latestMessage.content}
  //                           </p>
  //                         )} */}
  //                       </div>
  //                     ))}
  //                   </div>
  //                 ) : (
  //                   "No Chats"
  //                 )}
  //               </div>
  //             </div>
              
  //               // <Link
  //               //   to={"/chat/" + conv?.userDetails?._id}
  //               //   key={conv?._id}
  //               //   className="flex items-center gap-2 border border-transparent hover:bg-[#202c33] cursor-pointer"
  //               // >
  //               //   <div className="ml-2 my-3">
  //               //     <Avatar
  //               //       imageUrl={conv?.userDetails?.photo}
  //               //       name={conv?.userDetails?.fullName}
  //               //       userId={conv?.userDetails?._id}
  //               //     />
  //               //        {/* {conv?.userDetails?.fullName} */}
  //               //   </div>
  //               //   <div>
  //               //     <h3 className="text-gray-400 text-ellipsis line-clamp-1 font-semibold text-base">
  //               //       {conv?.userDetails?.fullName}
  //               //     </h3>
  //               //     <div className="flex gap-2">
  //               //       {conv?.LastMessage?.photo && (
  //               //         <div className="flex gap-2 items-center text-gray-500">
  //               //           {/* <Image /> */}
  //               //           {!conv?.LastMessage?.text && <span>Image</span>}
  //               //         </div>
  //               //       )}
                     
  //               //       <p className="text-ellipsis line-clamp-1 text-white">
  //               //         {conv?.LastMessage?.text}
  //               //       </p>
  //               //     </div>
  //               //   </div>
  //               //   {Boolean(conv?.unseenMsg) && (
  //               //     <p className="text-xs w-6 h-6 flex justify-center items-center ml-auto p-1 bg-primary text-white font-semibold rounded-full">
  //               //       {/* {conv?.unseenMsg} */}
  //               //     </p>
  //               //   )}
  //               // </Link>
                
  //             );
  //           })
  //         ) : (
  //           <div className="mt-12">
  //             <div className="flex justify-center items-center my-4 text-slate-500">
  //               {/* <ArrowUpLeft size={50} /> */}
             
  //             <p className="text-lg text-center text-slate-400">
  //               Add user to start chat
  //             </p>

  //             </div>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //     {openSearchUser && <AddUser setOpenSearchUser={setOpenSearchUser} />}
     
    
    
  //   <div
  // className={`${selectedChat ? "hidden" : "flex"
  // } md:flex flex-col items-center p-3 bg-white w-full md:w-[31%] rounded-lg border border-gray-300`}></div>
  // </div>
  
};

export default SideBar;