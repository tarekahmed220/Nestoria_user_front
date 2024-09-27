import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvidor";
import SingleChat from "./SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  const [userFromParams, setUserFromParams] = useState({});

  useEffect(() => {
    if (selectedChat) {
      setUserFromParams(selectedChat);
    }
  }, [selectedChat]);

  return (
    <div className={`flex justify-center items-start h-full  flex-col  bg-black w-full rounded-lg border border-gray-300  relative`}
     style={{ height: "calc(100vh - 80px)" ,scrollbarWidth:'none'}}>
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />

    </div>
  );
};

export default ChatBox;



// import ChatLayout from "./ChatLayout.jsx";

// import Avatar from "./Avatar.jsx";
// import { GetSocket, SocketProvidor } from "../context/SocketProvidor.js";
// import { useParams } from "react-router-dom";
// import { useLocalStorage } from "@mantine/hooks";

// import {
//     FaPaperPlane,
//     FaUserCircle,
//     FaSearch,
//     FaPaperclip,
//     FaCheck,
//     FaCheckDouble,
//     FaBell,
//     FaTrashAlt,
//   } from "react-icons/fa";

// import uploadFile from "../context/uploadFile.js";

// const UserDetails = () => {
//   const params = useParams();
//   const socket = GetSocket();
//   const [userFromParams, setUserFromParams] = useState({
//     _id: "",
//     fullName: "",
//     email: "",
//     photo: "",
//     online: true,
//     _id: "",
//     phone: "",
//     messages:  [],
//     role: "",
//     unseenMsg
//     : 
//     0
//   });
//   const [message, setMessage] = useState({
//     text: "",
//     photo: "",

//   });
//   const [toggle, setToggle] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [allMessages, setAllMessages] = useState([]);
//   const [tokenAndUser, setTokenAndUser] = useLocalStorage({
//     key: "user",
//     defaultValue: {},
//   });

//   // useEffect(() => {
//   //   if (socket) {
//   //     socket.emit("messagePage", params?.userId);
//   //     socket.on("messageUser", (data) => {
//   //       console.log("Received user data: ", data);  
//   //       setUserFromParams(data);
//   //     });
//   //     console.log(userFromParams, "when server is connect");
//   //     socket.on("message", (data) => {
//   //       setAllMessages(data);
//   //     });

//   //     socket.emit("seen", params?.userId);
//   //   }
//   // }, [socket, params?.userId, tokenAndUser]);
//   useEffect(() => {
//     if (socket) {
//       console.log("Socket connected, userId:", params?.userId); // Debugging socket connection
      
//       socket.emit("messagePage", params?.userId);
  
//       socket.on("messageUser", (data) => {
//         console.log("Received user data: ", data);
//         setUserFromParams(data);
//       });
  
//       socket.on("message", (data) => {
//         console.log("Received messages: ", data);  // Debugging messages
//         setAllMessages(data);
//       });
  
//       socket.emit("seen", params?.userId);
  
//       // Clean up the event listeners on component unmount
//       return () => {
//         socket.off("messageUser");
//         socket.off("message");
//       };
//     } else {
//       console.error("Socket not connected");  // Debugging connection issues
//     }
//   }, [socket, params?.userId]);
  
//   console.log(allMessages, "when server is connect");

//   const handleSendMessage = async (event) => {
//     event.preventDefault();
//     if (message?.text || message?.photo ) {
//       if (socket) {
//         socket.emit("newMessage", {
//           sender: tokenAndUser?._id,
//           receiver: params?.userId,
//           text: message?.text,
//           photo: message?.photo,
        
//           user: tokenAndUser?._id,
//         });

//         setMessage({
//           text: "",
//           photo: "",
          
//         });
//       }
//     }
//   };

//   const handleUpload = async (event, type) => {
//     const file = event.target.files?.[0];
//     // setLoading(true);
//     const upload = await uploadFile(file);
//     console.log(upload, "upload");
//     // setLoading(false);
//     setToggle(false);
//     setMessage({ ...message, [type]: upload?.url });
//   };

//   return (
//     // <SocketProvidor>
//     <ChatLayout>
//       <div
//        style={{
//         backgroundImage: "url('/body-bg.png')",
//         backgroundPosition: "left top",
//         backgroundSize: "auto",
//         backgroundRepeat: "repeat",
//         backgroundAttachment: "scroll",
//         backgroundColor: "#101010",
//       }}
//       //  className="bg-no-repeat bg-cover"
//       >
//         <header className="sticky top-0 h-16 bg-[#202c33] flex justify-between items-center px-4">
//           <div className="flex items-center gap-4">
//             <Avatar
//               imageUrl={userFromParams?.photo}
//               name={userFromParams?.fullName || "unknown"}
//               userId={userFromParams?._id}
//               isOnline={userFromParams?.online}
//             />
//             { userFromParams?.online ? (
//         <div className="bg-green-600 p-1 absolute  bottom-2-right-1 z-10 rounded-full"></div>
//       ):<div  className="bg-gray-200 p-1 absolute  bottom-2-right-1 z-10 rounded-full"></div>} 
//             <div>
//               <h3 className="font-semibold text-gray-300 text-lg my-0 text-ellipsis line-clamp-1">
//                 {userFromParams?.fullName}
//               </h3>
             
//             </div>
//           </div>
         
//         </header>

//         {/* all messages  */}
//         <section className="h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar bg-primary bg-opacity-95">
//           <div className="flex flex-col gap-2 py-2 mx-2">
//             {allMessages?.length
//               ? allMessages?.map((msg, index) => (
//                   <div
//                     key={index}
//                     className={`p-1 rounded w-fit max-w-96 ${
//                       tokenAndUser?._id === msg?.user
//                         ? "ml-auto bg-[#202c33]"
//                         : "bg-[#202c33]"
//                     }`}
//                   >
//                     <div className="w-full relative">
//                       {msg?.photo && (
//                         <img
//                           src={msg?.photo}
//                           className="w-full h-full object-scale-down"
//                         />
//                       )}
                    
//                     </div>
//                     <p className="px-2 text-white">{msg?.text}</p>
//                     <p className="text-xs ml-auto w-fit text-gray-300">
                     
//                           {new Date(msg.updatedAt).toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                     </p>
//                   </div>
//                 ))
//               : null}
//           </div>

//           {/* display image  */}
//           {message?.photo && (
//             <div className="w-full  h-full sticky bottom-0 bg-primary bg-opacity-90 flex justify-center items-center rounded overflow-hidden">
//               <div
//                 className="w-fit absolute top-2 right-2 cursor-pointer text-white hover:text-red-600"
//                 onClick={() => setMessage({ ...message, photo: "" })}
//               >
//                 {/* <Delete /> */}   <FaTrashAlt />
//               </div>
//               <div className="bg-[#202c33] p-2">
//                 <img
//                   src={message?.photo}
//                   className="aspect-square w-full h-full max-w-sm m-2 object-scale-down"
//                   alt=""
//                 />
//               </div>
//             </div>
//           )}

           

//           {loading && (
//             <div className="w-full  h-full sticky bottom-0 bg-primary bg-opacity-90 flex justify-center items-center rounded overflow-hidden">
//               <div className="flex justify-center">
//                 <div role="status">
//                   <svg
//                     aria-hidden="true"
//                     class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
//                     viewBox="0 0 100 101"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
//                       fill="currentColor"
//                     />
//                     <path
//                       d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
//                       fill="currentFill"
//                     />
//                   </svg>
             
//               {/* <span className="sr-only">Loading</span> */}
//                 </div>
//               </div>
//             </div>
//           )}
//         </section>

//         <section className="h-16 bg-secondary flex items-center px-4">
//           <div className="relative">
//             <button
//               className="flex justify-center items-center w-11 h-11 rounded-full text-white"
//               onClick={() => setToggle(!toggle)}
//             >
//               {/* <Plus size={20} /> */}<FaPaperclip fontSize={22} className="d-absolute z-22"/>
//             </button>
//           </div>
//           <form
//             onSubmit={handleSendMessage}
//             className="h-full w-full flex gap-2 items-center"
//           >
//             <input
//               type="text"
//               placeholder="Type here message.."
//               className="py-1 px-4 outline-none w-full h-12 rounded-lg bg-[#344047] text-white"
//               value={message?.text}
//               onChange={(event) =>
//                 setMessage({ ...message, text: event?.target?.value })
//               }
//             />
//             <button type="submit" className="text-gray-300">
//               {/* <Send size={28} /> */}   <FaPaperPlane />
//             </button>

//             {toggle && (
//               <div className="bg-secondary text-gray-300 shadow rounded absolute bottom-14 w-36">
//                 <form>
//                   <label
//                     htmlFor="uploadImage"
//                     className="flex items-center p-2 px-3 gap-3 hover:bg-gray-600  cursor-pointer"
//                   >
//                     <div className="text-gray-200 ">
//                       {/* <Image size={18} /> */} <p>Add Image</p>
//                     </div>
//                     {/* <p>Add Image</p> */}
//                   </label>
                
                
//                   <input
//                     type="file"
//                     id="uploadImage"
//                     onChange={(e) => handleUpload(e, "imageUrl")}
//                     className="hidden"
//                   />
//                 </form>
//               </div>
//             )}
//           </form>
//         </section>
//       </div>
//     </ChatLayout>
//   // </SocketProvidor> */}
//   );
// };

//  export default ChatBox;