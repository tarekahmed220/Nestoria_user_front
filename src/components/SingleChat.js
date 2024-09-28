
// function SingleChat({fetchAgain,setFetchAgain}) {
//     const { selectedChat, setSelectedChat, user, notification, setNotification } =ChatState();
//     const [messages, setMessages] = useState([]);
//     const [loading, setLoading] = useState(false);
//      const [toggle, setToggle] = useState(false);
//     const [newMessage, setNewMessage] = useState("");
//     const [socketConnected, setSocketConnected] = useState(false);
//     const [typing, setTyping] = useState(false);
//     const [istyping, setIsTyping] = useState(false);
//     const userInfo=JSON.parse(localStorage.getItem("user"))
//     const token=localStorage.getItem("token")
//     const defaultOptions = {
//         loop: true,
//         autoplay: true,
//         animationData: animationData,
//         rendererSettings: {
//           preserveAspectRatio: "xMidYMid slice",
//         },
//       };




//       const sendMessage = async (event) => {
//         if (!selectedChat || !selectedChat._id) {
//             console.error("selectedChat is null or doesn't have an ID");
//             toast("No chat selected or invalid chat ID");
//             return;
//         }
//         console.log("Selected Chat:", selectedChat); //
//         console.log("New Message:", newMessage); //
//         if ((event.key === "Enter" || event.type === "click" )&& newMessage) {
//             // { console.log("No message");
//             // return;}
//           //  socket.emit("stop typing", selectedChat._id);
//           try {

//             setNewMessage("");
//             const { data } = await axiosInstance.post(
//               "/api/v1/fur/message",
//               {
//                 content: newMessage,
//                 chatId: selectedChat._id,
//               }
//             );
//             // socket.emit("new message", data);
//             setMessages([...messages, data]);
//             console.log(data, messages,"data");
//           } catch (error) {
//         toast("Failed to send the message");
//           }
//         }
//       };
//       const handleUpload=()=>{

//       }
//       useEffect(() => {

//         socket.emit("setup", user);
//         socket.on("connected", () => setSocketConnected(true));
//         socket.on("typing", () => setIsTyping(true));
//         socket.on("stop typing", () => setIsTyping(false));
//       }, []);
//     useEffect(() => {
//         fetchMessages();
//         selectedChatCompare = selectedChat;
//       }, [selectedChat]);
//       useEffect(() => {
//         socket.on("message recieved", (newMessageRecieved) => {
//           if (
//             !selectedChatCompare ||
//             selectedChatCompare._id !== newMessageRecieved.chat._id
//           ) {
//             if (!notification.includes(newMessageRecieved)) {
//               setNotification([newMessageRecieved, ...notification]);
//               setFetchAgain(!fetchAgain);
//             }
//           } else {
//             setMessages([...messages, newMessageRecieved]);
//           }
//         });
//       });
//       const typingHandler = (e) => {
//         setNewMessage(e.target.value);

//          if (!socketConnected) return;

//         if (!typing) {
//           setTyping(true);
//            socket.emit("typing", selectedChat._id);
//         }
//         let lastTypingTime = new Date().getTime();
//         let timerLength = 3000;
//         setTimeout(() => {
//           let timeNow = new Date().getTime();
//           let timeDiff = timeNow - lastTypingTime;
//           if (timeDiff >= timerLength && typing) {
//              socket.emit("stop typing", selectedChat._id);
//             setTyping(false);
//           }
//         }, timerLength);
//     }
//     if(loading){
//         return <Loader/>
//     }
//   return (
//     <div>
//       {selectedChat ? (
//         <div>
//              <div className="mt-3 w-full " >
//               {istyping && (
//                 <div className='text-black bg-gray-500 p-3 rounded-full' >
//                   <Lottie
//                   options={defaultOptions}
//                   width={70}

//                   style={{ marginBottom: 0, marginRight: 0,color:"black" ,zIndex:"10", position:"absolute"}}
//                 />
//                 <span className='text-black bg-gray-500 p-3 rounded-full'>typing</span></div>
//               )}

//               <div>
//                 {/* all messages */}

//                 {selectedChat.chat?.users[0]?.fullName===userInfo?.fullName ?(
//                   selectedChat.chat?.users[1]?.fullName

//                 ):(
//                   selectedChat.chat?.users[0]?.fullName
//                 )}
//                     <UpdateGroupChatModal
//                       fetchMessages={fetchMessages}
//                       fetchAgain={fetchAgain}
//                       setFetchAgain={setFetchAgain}
//                     />
//                      {loading ? (
//               <Loader />
//             ) : (
//               <div className="messages ">
//                 <ScrollableChat messages={messages} />
//                 {/* <MessageArea messages={messages} setMessages={setMessages}/> */}
//               </div>
//             )}
//               </div>
//         <section className="h-16 bg-black flex items-center px-4 fa-border rounded-3xl w-[95%] mx-auto ">
//           <div className="relative">

//           </div>
//           <div
//             // onSubmit={sendMessage}
//             className="h-full w-full flex gap-2 items-center bg-black p-5 mx-auto "
//           >
//             <input
//               type="text"
//               placeholder="Type here message.."
//               className="py-1 px-4 outline-none w-full h-12 rounded-lg bg-black text-white"
//               value={newMessage}
//               onChange={typingHandler}
//                onKeyDown={sendMessage}

//             />


//            

//       ):
//     
//       
//     </div>
//   )
// }


import React, { useState, useEffect, useMemo ,createRef} from "react";
import io from "socket.io-client";
import { ChatState } from "../context/ChatProvidor";
import animationData from "../animations/typing.json";
import { FaPaperPlane, FaPaperclip } from "react-icons/fa";
import { toast } from "react-toastify";
import axiosInstance from "../apis/axiosConfig";
import UpdateGroupChatModal from "../components/chatPage/UpdateGroupChatModal";
import ScrollableChat from "./chatPage/ScrollableChat";
import Loader from "./Loader";


const ENDPOINT = "http://localhost:5000"; // Adjust the endpoint for deployment

function SingleChat({ fetchAgain, setFetchAgain }) {
  const { selectedChat, user, notification, setNotification ,socket,setChats} = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [toggle, setToggle] = useState(false);
const fileInput=createRef()
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

 
  useEffect(() => {
    if (socket) {
      socket.emit("setup", user);
      socket.on("connected", () => setSocketConnected(true));
      socket.on("typing", () => setIsTyping(true));
      socket.on("stop typing", () => setIsTyping(false));
    }
  }, [socket, user]);
const options={
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
}
  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        `/api/v1/fur/message/${selectedChat._id}`
      );
      setMessages(data);
      const chat= await axiosInstance.get("/api/v1/fur/chat");
        
      setLoading(false);
    
    } catch (error) {
      toast("Failed to Load the Messages");
    }
  };

  const sendMessage = async (event) => {
    if ((event.key === "Enter" || event.type === "click") && newMessage) {
      if(socket){console.log("socket")}
      socket.emit("stop typing", selectedChat._id);
     socket.emit("join room", selectedChat._id);
      const messageData = {
        sender: user._id,
        content: newMessage,
        chat: selectedChat,
      }
  
      try {
        const { data } = await axiosInstance.post("/api/v1/fur/message", {
          content: newMessage,
          chatId: selectedChat._id,
        });
        setMessages([...messages, data])
      
        
        if(socket){console.log(socket,"sending")}
        socket.emit("new message",messageData);
        setNewMessage("")
        setFetchAgain(!fetchAgain);  // إجبار الـ Sidebar على التحديث
      } catch (error) {
        toast("Failed to send the message");
      }
    }
  };
 
//       const typingHandler = (e) => {
//         setNewMessage(e.target.value);

//          if (!socketConnected) return;

//         if (!typing) {
//           setTyping(true);
//            socket.emit("typing", selectedChat._id);
//         }
//         let lastTypingTime = new Date().getTime();
//         let timerLength = 3000;
//         setTimeout(() => {
//           let timeNow = new Date().getTime();
//           let timeDiff = timeNow - lastTypingTime;
//           if (timeDiff >= timerLength && typing) {
//              socket.emit("stop typing", selectedChat._id);
//             setTyping(false);
//           }
//         }, timerLength);
//     }
//     useEffect(() => {
//         fetchMessages();
//         selectedChatCompare = selectedChat;
//       }, [selectedChat]);
//       useEffect(() => {
//         socket.on("message recieved", (newMessageRecieved) => {
//           if (!selectedChatCompare ||
//             selectedChatCompare._id !== newMessageRecieved.chat._id
//           ) {
//             if (!notification.includes(newMessageRecieved)) {
//               setNotification([newMessageRecieved, ...notification]);
//               setFetchAgain(!fetchAgain);
//             }
//           } else {
//             setMessages([...messages, newMessageRecieved]);
//           }
//         });
//       },[...messages, newMessageRecieved]);
  const handleUpload = async (event) => {
    const file = fileInput.current.files[0]; // Correctly accessing the file from the input ref
    if (!file) return;
  
    const formData = new FormData();
    formData.append("photo", file); // The 'photo' here should match the name used in `upload.single('photo')`
    formData.append("chatId", selectedChat._id); // Make sure chatId is included
  
    try {
      const { data } = await axiosInstance.post(
        "/api/v1/fur/message/photo",
        formData, // Pass formData directly
        {
          headers: {
            "Content-Type": "multipart/form-data", // Use "multipart/form-data" for file uploads
          },
        }
      );
      setMessages([...messages, data]);
      toast("File uploaded successfully!", { type: "success" });
      console.log(data); // Server response
    } catch (error) {
      toast("Failed to upload the file", { type: "error" });
      console.error(error);
    }
  };
  

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);
useEffect(() => {
  socket.emit("join chat", selectedChat);
  socket.on(" recieve message", (newMessage) => {
    setMessages([...messages, newMessage]);
    // setMessages((prevMessages) => [...prevMessages, messageData]);
  })

  return () => {  
    socket.off("recieve message");
  }
},[selectedChat])

  if (loading) {
    return <Loader />;
  }

  return (
    <>
       {selectedChat ? 
    (<div className="w-full h-full" style={{ scrollbarWidth: "none" }}>
      <div className="flex justify-between items-center ">
        <span className="text-xl ">
          {selectedChat?.chat?.users[0]?.fullName === user?.fullName
            ? selectedChat?.chat?.users[1]?.fullName
            : selectedChat?.chat?.users[0]?.fullName}
        </span>
        <UpdateGroupChatModal
          fetchMessages={fetchMessages}
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
        />
      </div>

      <div
        style={{ scrollbarWidth: "none" }}
        className="flex-1 overflow-y-auto overflow-x-hidden  p-4 bg-black rounded-lg h-full "
      >
        <ScrollableChat
          messages={messages}
          style={{ scrollbarWidth: "none" }}
        />
      </div>

      <div className="flex items-center p-4 ">
        <FaPaperclip className="mr-4 text-xl hover:text-[#C26510] cursor-pointer" onClick={() => setToggle(!toggle)} />
        <input
          type="text"
          className="flex-grow p-2 border rounded-lg "
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) =>{ setNewMessage(e.target.value);// typingHandler(e)
            }}
          onKeyDown={sendMessage}
        />
       <button className="cursor-pointer hover:text-[#C26510]  " type="button" > <FaPaperPlane
          className="ml-4 text-xl cursor-pointer"
          onClick={sendMessage}
        /></button>
        <div>
                    {toggle && (
           <div className="bg-gray-600 text-gray-300 shadow rounded absolute bottom-8 left-8 w-36">
                <form>
                  <label
                    htmlFor="photo"
                    className="flex items-center py-3  px-3 gap-3 hover:bg-gray-600  cursor-pointer"   >
                    <div className="text-gray-200 ">
                      {/* <Image size={18} /> */} <p>Add Image</p>
                    </div>
                    {/* <p>Add Image</p> */}
                  </label>

                  <input
                    type="file"
                    id="photo"
                    onChange={handleUpload}
                    accept="image/*"
                    
                    ref={fileInput}
                    className="hidden hover:bg-gray-600  cursor-pointer"
                  />
                </form>
                  </div>
                   )} 

        </div>
      </div>
    </div>) :
      (<div className="flex justify-center items-center align-center h-full">
       <span className="text-lg font-semibold">
         Click on a user to start chatting
       </span>
     </div>)}
    </>
  );
}

export default SingleChat;

