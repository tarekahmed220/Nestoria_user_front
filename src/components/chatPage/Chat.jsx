
// import React, { useState, useEffect, useRef } from 'react';
// import { FaSearch, FaUserCircle, FaPaperclip, FaPaperPlane, FaCheck, FaCheckDouble, FaTrashAlt } from 'react-icons/fa';
// const ChatComponent = () => {
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredChats, setFilteredChats] = useState([]);
//   const [chats] = useState([
//     {
//       username: 'John Doe',
//       avatarUrl: 'https://via.placeholder.com/40',
//       lastMessage: 'Hey, how are you?',
//       timestamp: Date.now(),
//       status: 'online',
//     },
//     {
//       username: 'Jane Smith',
//       avatarUrl: 'https://via.placeholder.com/40',
//       lastMessage: 'See you later!',
//       timestamp: Date.now(),
//       status: 'offline',
//     },
//   ]);


//   const fileInputRef = useRef(null);
//   const messageEndRef = useRef(null);

//   const handleSendMessage = () => {
//     if (message) {
//       const newMessage = {
//         text: message,
//         sender: 'currentUser',
//         timestamp: Date.now(),
//       };
//       setMessages([...messages, newMessage]);
//       setMessage('');
//     }
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const newMessage = {
//         file: URL.createObjectURL(file),
//         sender: 'currentUser',
//         timestamp: Date.now(),
//       };
//       setMessages([...messages, newMessage]);
//     }
//   };

//   useEffect(() => {
//     if (messageEndRef.current) {
//       messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   useEffect(() => {
//     const filtered = chats.filter(chat => chat.username.toLowerCase().includes(searchQuery.toLowerCase()));
//     setFilteredChats(filtered);
//   }, [searchQuery, chats]);

//   return (
//     <div className="flex flex-col lg:flex-row h-screen bg-black text-[#929292]  ">
//       {/* Sidebar */}
//       <aside className="w-full lg:w-1/4 p-4 lg:p-6 flex flex-col border-b lg:border-b-0 lg:border-r border-[#929292]">
//         {/* Search bar */}
//         <div className="flex items-center mb-6">
//           <FaSearch className="text-[#929292] mr-2" />
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full py-3 px-6 rounded-full bg-transparent text-[#929292] border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
//           />
//         </div>
        
//         {/* Recent Chats */}
//         <div className="mb-6">
//           <h3 className="text-[#929292] mb-3">Recent Chats</h3>
//           <ul className="space-y-4">
//             {filteredChats.map((chat, index) => (
//               <li
//                 key={index}
//                 onClick={() => setSelectedChat(chat)}
//                 className={`flex items-center space-x-3 p-3 rounded-full cursor-pointer transition duration-500 ${
//                   selectedChat?.username === chat.username
//                     ? 'bg-[#C26510] text-white'
//                     : 'hover:bg-gray-700 text-[#929292]'
//                 }`}
//               >
//                 <img
//                   src={chat.avatarUrl}
//                   alt={chat.username}
//                   className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
//                 />
//                 <div className="flex-1">
//                   <div className="flex justify-between">
//                     <span className="font-semibold">{chat.username}</span>
//                     <small className="text-gray-400 text-xs">
//                       {new Date(chat.timestamp).toLocaleTimeString([], {
//                         hour: '2-digit',
//                         minute: '2-digit',
//                       })}
//                     </small>
//                   </div>
//                   <p className="text-sm truncate">{chat.lastMessage}</p>
//                 </div>
//                 <span
//                   className={`w-3 h-3 rounded-full ${
//                     chat.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
//                   }`}
//                 ></span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </aside>

//       {/* Main Chat Area */}
//       <main className="flex-1 flex flex-col">
//         {/* Messages Area */}
//         <div className="flex-1 p-4 lg:p-6 overflow-y-auto bg-black">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex ${
//                 msg.sender === 'currentUser' ? 'justify-end' : 'justify-start'
//               } mb-4`}
//             >
//               {msg.sender !== 'currentUser' && (
//                 <img
//                   src={msg.avatarUrl}
//                   alt={msg.sender}
//                   className="w-8 h-8 lg:w-10 lg:h-10 rounded-full mr-3"
//                 />
//               )}
//               <div
//                 className={`p-4 rounded max-w-xs shadow-lg relative ${
//                   msg.sender === 'currentUser'
//                     ? 'bg-[#C26510] text-white'
//                     : 'bg-gray-700 text-[#929292]'
//                 }`}
//               >
//                 {msg.file ? (
//                   <a
//                     href={msg.file}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block"
//                   >
//                     <img
//                       src={msg.file}
//                       alt="uploaded-file"
//                       className="rounded-lg max-w-full h-auto"
//                     />
//                   </a>
//                 ) : (
//                   <p className="font-semibold break-words">{msg.text}</p>
//                 )}
//                 <small className="block text-xs mt-2">
//                   {new Date(msg.timestamp).toLocaleTimeString([], {
//                     hour: '2-digit',
//                     minute: '2-digit',
//                   })}
//                   {msg.sender === 'currentUser' && (
//                     <span className="ml-2">
//                       {msg.seen ? (
//                         <FaCheckDouble className="inline text-blue-400" />
//                       ) : (
//                         <FaCheck className="inline text-[#929292]" />
//                       )}
//                     </span>
//                   )}
//                 </small>
//                 {msg.sender === 'currentUser' && (
//                   <button
//                     onClick={() => setMessages(messages.filter((_, i) => i !== index))}
//                     className="absolute top-2 right-2 text-red-500 hover:text-red-400"
//                   >
//                     <FaTrashAlt />
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//           <div ref={messageEndRef} />
//         </div>

//         {/* Chat Input */}
//         <footer className="p-4 lg:p-6 border-t border-[#929292] bg-black flex items-center">
//           <input
//             type="file"
//             onChange={handleFileUpload}
//             ref={fileInputRef}
//             className="hidden"
//           />
//           <button
//             onClick={() => fileInputRef.current.click()}
//             className="text-[#929292] hover:text-[#C26510] mr-4"
//           >
//             <FaPaperclip />
//           </button>
//           <input
//             type="text"
//             placeholder="Type a message..."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
//             className="flex-1 py-3 lg:py-4 px-6 lg:px-8 rounded-full bg-transparent text-[#929292] border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
//           />
//           <button
//             onClick={handleSendMessage}
//             className="text-[#C26510] hover:text-white ml-4"
//           >
//             <FaPaperPlane />
//           </button>
//         </footer>
//       </main>
//     </div>
//   );
// };

// export default ChatComponent;


import SearchBar from './searchbar';
import ChatList from './chatList';
import MessageArea from './messageArea';
import MessageInput from './messageInput';
import React, { useState, useEffect, useRef } from 'react';
const ChatComponent = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChats, setFilteredChats] = useState([]);
  const [chats] = useState([
    {
      username: 'John Doe',
      avatarUrl: 'https://via.placeholder.com/40',
      lastMessage: 'Hey, how are you?',
      timestamp: Date.now(),
      status: 'online',
    },
    {
      username: 'Jane Smith',
      avatarUrl: 'https://via.placeholder.com/40',
      lastMessage: 'See you later!',
      timestamp: Date.now(),
      status: 'offline',
    },
  ]);

  const messageEndRef = useRef(null);

  const handleSendMessage = () => {
    if (message) {
      const newMessage = {
        text: message,
        sender: 'currentUser',
        timestamp: Date.now(),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newMessage = {
        file: URL.createObjectURL(file),
        sender: 'currentUser',
        timestamp: Date.now(),
      };
      setMessages([...messages, newMessage]);
    }
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    const filtered = chats.filter(chat => chat.username.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredChats(filtered);
  }, [searchQuery, chats]);

  return (

    <div className="flex flex-col lg:flex-row h-screen bg-black text-[#929292] p-5 lg:p-6 ">

      {/* Sidebar */}
      <aside className="w-full lg:w-1/4 p-4 lg:p-6 flex flex-col border-b lg:border-b-0 lg:border-r border-[#929292]">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="mb-6">
          <h3 className="text-[#929292] mb-3">Recent Chats</h3>
          <ChatList chats={filteredChats} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        <MessageArea messages={messages} setMessages={setMessages} messageEndRef={messageEndRef} />
        <MessageInput
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
          handleFileUpload={handleFileUpload}
        />
      </main>
    </div>
  );
};

export default ChatComponent;
