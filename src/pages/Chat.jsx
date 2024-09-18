// import React, { useEffect, useState } from 'react'
// import { GetSocket } from '../context/SocketProvidor'
// import { useLocalStorage } from '@mantine/hooks';
// import { IoImageOutline } from "react-icons/io5";
// import { BiSearchAlt } from "react-icons/bi";
// // import { Link } from 'react-router-dom';
// // import AddUser from '../components/AddUserToChat.jsx';
// import ChatLayout from '../components/ChatLayout.jsx';


// const Chat=({children})=>{
//    const socket = GetSocket()
//     const [,setOnlineUsers] = useLocalStorage({
//         key: 'onlineUser', 
//         defaultValue: []
//       });
      
//       useEffect(() => {
//         if (socket) {
//         socket.on("onlineUser", (data) => {
//           setOnlineUsers(data)
//         })
//         return () => {
//           socket.disconnect()
//         }}
//       },[])



// return (
//   <>

//   <ChatLayout>
//     <div className="flex justify-center items-center bg-black flex-col gap-2">
//     <h1 className="text-4xl text-gray-400"></h1>
//     </div>
//   </ChatLayout>
 
     
//   </>
// );
// }
  
// export default Chat;

import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvidor.jsx'

import { IoImageOutline } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";
// import { Link } from 'react-router-dom';
// import AddUser from '../components/AddUserToChat.jsx';

// import { ChatState } from '../context/ChatProvidor.jsx';
import ChatBox
 from '../components/ChatBox.jsx';
 import SideBar from '../components/ChatSideBar.jsx';
const Chat=({children})=>{
  //  const {user} = ChatState()
    // const [,setOnlineUsers] = useLocalStorage({
    //     key: 'onlineUser', 
    //     defaultValue: []
    //   });
      
    //   useEffect(() => {
    //     if (socket) {
    //     socket.on("onlineUser", (data) => {
    //       setOnlineUsers(data)
    //     })
    //     return () => {
    //       socket.disconnect()
    //     }}
    //   },[])

const {user}=ChatState()
const[fetchAgain,setFetchAgain]=useState(false)
return (
  
//{/* <div className='w-full h-screen py-5 '> */}

   // <div className="flex justify-space-between align-content-end align-items-end bg-black flex-col gap-3 w-full py-12">
    //{/* <h1 className="text-4xl text-gray-400"></h1> */}
    <div className=" mx-auto p-4 py-16 flex flex-col gap-3 lg:flex-row h-screen bg-black text-[#929292] relative "
    style={{
      backgroundImage: "url('/body-bg.png')",
      backgroundPosition: "left top",
      backgroundSize: "auto",
      backgroundRepeat: "repeat",
      backgroundAttachment: "scroll",
      backgroundColor: "#101010",
    }}
    
    >
    {/* <div className="grid lg:grid-cols-[350px,1fr] h-screen max-h-screen bg-black">
      <section> */}
       <aside className="w-full lg:w-1/4  lg:p-6 flex flex-col border-b lg:border-b-0 lg:border-r border-[#929292] border border-[#A5A5A5] rounded-3xl overflow-hidden  ">
             <div className="mb-6">
               <h3 className="text-[#929292] mb-1 text-center text-xl">All Chats</h3>
       
             {user && <SideBar fetchAgain={fetchAgain} />}
            </div>
      </aside>
      {/* </section> */}
        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col border border-[#A5A5A5] rounded-3xl  bg-black overflow-y-auto overflow-x-hidden "style={{scrollbarWidth:'none'}}>
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        
        )}
        
        </main>
    </div>
// {/* </div>  */}
// </div>
//  {/* <ChatLayout> */} {/* </ChatLayout>  */}
 
     

);
}
  
export default Chat;

