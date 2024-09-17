import React ,{useState,useEffect, useMemo}from 'react'
import io from "socket.io-client";
import ChatProvider, { ChatState } from '../context/ChatProvidor';
import Loader from './Loader';
import Lottie from "react-lottie";
import animationData from "../animations/typing.json";
import {FaPaperPlane }from "react-icons/fa";
import { toast } from 'react-toastify';
import axiosInstance from '../apis/axiosConfig';
import UpdateGroupChatModal from '../components/chatPage/UpdateGroupChatModal';
// import {messagesBg,scrollable }  from "../css modules/chat.module.css";
import { BiLoaderCircle } from 'react-icons/bi';
import ScrollableChat from './chatPage/ScrollableChat';
import { FaPaperclip } from 'react-icons/fa';
// import MessageArea from './chatPage/MessageArea';
const ENDPOINT = "http://localhost:5000"; // Adjust the endpoint for deployment
var socket, selectedChatCompare;

function SingleChat({fetchAgain,setFetchAgain}) {
    const { selectedChat, setSelectedChat, user, notification, setNotification } =ChatState();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
     const [toggle, setToggle] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const userInfo=JSON.parse(localStorage.getItem("user"))
    const token=localStorage.getItem("token")
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };

      const socket = useMemo(() => {
        if (token) {
          return io('http://localhost:5000', {
            auth: { token: token },
            transports: ["websocket", "polling"],
          })
        }
        return null; // Return null if there's no token
      }, [token])
    
      // Ensure socket is defined before calling methods on it
      if (socket) {
        socket.on("connection", () => {
          console.log("Connected to server");
        })
      
      const fetchMessages = async () => {
        if (!selectedChat){console.log("selectedChat is null or doesn't have an ID"); return;}
    
        try {
        
    
        //   setLoading(true);
    
          const { data } = await axiosInstance.get(
            `/api/v1/fur/message/${selectedChat._id}`
          );
          console.log(data);
          setMessages(data);
        //   setLoading(false);
    
           socket.emit("join chat", selectedChat._id);
        } catch (error) {
          toast("Failed to Load the Messages");
        }
      };

   
      const sendMessage = async (event) => {
        if ((event.key === "Enter" || event.type === "click" )&& newMessage) {
        if (!selectedChat || !selectedChat._id) {
            console.error("selectedChat is null or doesn't have an ID");
            toast("No chat selected or invalid chat ID");
            return;
        }
        console.log("Selected Chat:", selectedChat); // 
        console.log("New Message:", newMessage); // 
        // if ((event.key === "Enter" || event.type === "click" )&& newMessage) {
            // { console.log("No message");
            // return;}
          //  socket.emit("stop typing", selectedChat._id);
          try {
           
            setNewMessage("");
            const { data } = await axiosInstance.post(
              "/api/v1/fur/message",
              {
                content: newMessage,
                chatId: selectedChat._id,
              }
            );
            // socket.emit("new message", data);
            // setMessages([...messages, data]);
            console.log(data, messages,"data");
          } catch (error) {
        toast("Failed to send the message");
          }
        }
        }
      const handleUpload=()=>{

      }
      // useEffect(() => {
        
      //   socket.emit("setup", user);
      //   socket.on("connected", () => setSocketConnected(true));
      //   // socket.on("typing", () => setIsTyping(true));
      //   // socket.on("stop typing", () => setIsTyping(false));
      // }, []);
    // useEffect(() => {
    //     fetchMessages();
    //     selectedChatCompare = selectedChat;
    //   }, [selectedChat]);
      // useEffect(() => {
      //   socket.on("message recieved", (newMessageRecieved) => {
      //     if (
      //       !selectedChatCompare ||
      //       selectedChatCompare._id !== newMessageRecieved.chat._id
      //     ) {
      //       // if (!notification.includes(newMessageRecieved)) {
      //       //   setNotification([newMessageRecieved, ...notification]);   
      //       //   setFetchAgain(!fetchAgain);
      //       // }
      //     } else {
      //       setMessages([...messages, newMessageRecieved]);
      //     }
      //   });
      // },[]);
      const typingHandler = (e) => {
        // setNewMessage(e.target.value);

        // if (!socketConnected) return;
    
        // if (!typing) {
        //   setTyping(true);
        //    socket.emit("typing", selectedChat._id);
        // }
        let lastTypingTime = new Date().getTime();
        let timerLength = 3000;
        // setTimeout(() => {
        //   let timeNow = new Date().getTime();
        //   let timeDiff = timeNow - lastTypingTime;
        //   if (timeDiff >= timerLength && typing) {
        //      socket.emit("stop typing", selectedChat._id);
        //     setTyping(false);
        //   }
        // }, timerLength);
    }
  return (
    
    <div>
      {selectedChat ? (
        <div>
             <div className="mt-3 w-full">
              {istyping && (
                <Lottie
                  options={defaultOptions}
                  width={70}
                  style={{ marginBottom: 15, marginLeft: 0 }}
                />
              )}


              <div>
                {/* all messages */}

                {selectedChat.chat?.users[0]?.fullName===userInfo?.fullName ?(
                  selectedChat.chat?.users[1]?.fullName
                    
                  
                ):(
                  selectedChat.chat?.users[0]?.fullName
                )}
                    <UpdateGroupChatModal
                      fetchMessages={fetchMessages}
                      fetchAgain={fetchAgain}
                      setFetchAgain={setFetchAgain}
                    />
                     {loading ? (
              <Loader />
            ) : (
              <div className="messages ">
                <ScrollableChat messages={messages} />
                {/* <MessageArea messages={messages} setMessages={setMessages}/> */}
              </div>
            )}
              </div>
        <section className="h-16 bg-black flex items-center px-4 fa-border rounded-3xl ">
          <div className="relative">
            <button
              className="flex justify-center items-center w-11 h-11 rounded-full text-white"
              onClick={() => setToggle(!toggle)}
            >
              {/* <Plus size={20} /> */}<FaPaperclip fontSize={22} className="d-absolute z-22"/>
            </button>
          </div>
          <div
            // onSubmit={sendMessage}
            className="h-full w-full flex gap-2 items-center bg-black"
          >
            <input
              type="text"
              placeholder="Type here message.."
              className="py-1 px-4 outline-none w-full h-12 rounded-lg bg-black text-white"
              value={newMessage}
              onChange={typingHandler}
               onKeyDown={sendMessage}
              // value={message?.text}
              // onChange={(event) =>
              //   setMessage({ ...message, text: event?.target?.value }) }
            />
            <button type="button" className="text-gray-300"    onClick={sendMessage}>
              {/* <Send size={28} /> */}   <FaPaperPlane />
            </button>

            {toggle && (
              <div className="bg-secondary text-gray-300 shadow rounded absolute bottom-14 w-36">
                <form>
                  <label
                    htmlFor="uploadImage"
                    className="flex items-center py-2 px-3 gap-3 hover:bg-gray-600  cursor-pointer"
                  >
                    <div className="text-gray-200 ">
                      {/* <Image size={18} /> */} <p>Add Image</p>
                    </div>
                    {/* <p>Add Image</p> */}
                  </label>
                
                
                  <input
                    type="file"
                    id="uploadImage"
                    onChange={(e) => handleUpload(e, "imageUrl")}
                    className="hidden"
                  />
                </form>
              </div>
            )}
          </div>
        </section>
            
             
            </div>
        </div>
      
      ):
      (<div className="flex justify-between items-center py-3 px-2 text-2xl md:text-3xl font-semibold w-full border-b">

      {/* <div className='d-flex align-items-center justify-content-center h-full' d="flex" alignItems="center" justifyContent="center" h="100%"> */}
      <p className="text-[#929292] text-xl bb-3 fontFamily-['Work sans']">
        Click on a user to start chatting
      </p>
    </div>)
      }
    </div>
  
  )
}
}

export default SingleChat
