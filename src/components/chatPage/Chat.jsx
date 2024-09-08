import React, { useState, useEffect, useRef, useMemo } from "react";

import './Chat.css';

import {
  FaPaperPlane,
  FaUserCircle,
  FaSearch,
  FaPaperclip,
  FaCheck,
  FaCheckDouble,
  FaBell,
  FaTrashAlt,
} from "react-icons/fa";

// Mock user and initial chat data
const currentUsername = "User1";
const initialChats = [
  {
    username: "User1",
    lastMessage: "How are you?",
    timestamp: new Date(),
    avatarUrl: "https://api.dicebear.com/6.x/bottts/svg?seed=User1",
    status: "online",
  },
  {
    username: "User2",
    lastMessage: "Meeting at 5?",
    timestamp: new Date(),
    avatarUrl: "https://api.dicebear.com/6.x/bottts/svg?seed=User2",
    status: "offline",
  },
];

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState(["User2", "User3"]);
  const [selectedChat, setSelectedChat] = useState(initialChats[0]);
  const [attachment, setAttachment] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null); // Confirmation for message delete
  const messageEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() || attachment) {
      const newMessage = {
        text: message,
        sender: currentUsername,
        timestamp: new Date(),
        avatarUrl: `https://api.dicebear.com/6.x/bottts/svg?seed=${currentUsername}`,
        file: attachment ? URL.createObjectURL(attachment) : null,
        seen: false,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
      setAttachment(null);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setAttachment(file);
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  const handleDeleteMessage = (index) => {
    setConfirmDelete(index);
  };

  const confirmDeleteMessage = () => {
    setMessages((prevMessages) =>
      prevMessages.filter((_, i) => i !== confirmDelete)
    );
    setConfirmDelete(null);
  };

  const filteredChats = useMemo(
    () =>
      initialChats.filter((chat) =>
        chat.username.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  const filteredActiveUsers = useMemo(
    () =>
      activeUsers.filter((user) =>
        user.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery, activeUsers]
  );

  return (
    <div className="flex flex-col md:flex-row h-screen chat-body">
      {/* Sidebar */}
      <aside className="sidebar w-full md:w-1/4 p-6 flex flex-col border-r border-gray-700">
        <div className="flex items-center mb-6">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input w-full p-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none"
          />
        </div>

        {/* Recent Chats */}
        <div className="mb-6">
          <h3 className="text-gray-300 mb-3">Recent Chats</h3>
          <ul className="space-y-4">
            {filteredChats.map((chat) => (
              <li
                key={chat.username}
                onClick={() => handleChatSelect(chat)}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition duration-200 ${
                  selectedChat.username === chat.username
                    ? "bg-gray-600"
                    : "hover:bg-gray-700"
                }`}
              >
                <img
                  src={chat.avatarUrl}
                  alt={chat.username}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-semibold">{chat.username}</span>
                    <small className="text-gray-400 text-xs">
                      {new Date(chat.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </small>
                  </div>
                  <p className="text-gray-400 text-sm">{chat.lastMessage}</p>
                </div>
                <span
                  className={`w-3 h-3 rounded-full ${
                    chat.status === "online" ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Active Users */}
        <div>
          <h3 className="text-gray-300 mb-3">Active Users</h3>
          <ul className="space-y-4">
            {filteredActiveUsers.map((user) => (
              <li
                key={user}
                className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg cursor-pointer"
              >
                <FaUserCircle className="text-3xl text-gray-500" />
                <span>{user}</span>
                <span className="ml-auto w-3 h-3 rounded-full bg-green-500"></span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Chat Header */}
        <header className="header p-4 border-b border-gray-700 flex items-center bg-gray-900">
          <img
            src={selectedChat.avatarUrl}
            alt={selectedChat.username}
            className="w-10 h-10 rounded-full mr-4"
          />
          <div className="flex-1">
            <h2 className="text-gray-100 font-semibold">
              {selectedChat.username}
            </h2>
            <p className="text-gray-400 text-sm">
              {selectedChat.status === "online"
                ? "Active now"
                : "Last seen recently"}
            </p>
          </div>
          {showNotification && (
            <button
              onClick={() => setShowNotification(false)}
              className="notification-button text-yellow-400 hover:text-yellow-300 ml-4"
            >
              <FaBell />
            </button>
          )}
        </header>

        {/* Messages Area */}
        <div className="flex-1 p-6 overflow-y-auto bg-black">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === currentUsername ? "justify-end" : "justify-start"
              } mb-4`}
            >
              {msg.sender !== currentUsername && (
                <img
                  src={msg.avatarUrl}
                  alt={msg.sender}
                  className="w-10 h-10 rounded-full mr-3"
                />
              )}
              <div
                className={`chat-message p-4 rounded-lg max-w-xs shadow-lg relative ${
                  msg.sender === currentUsername
                    ? "message-sent bg-blue-600 text-white"
                    : "message-received bg-gray-700 text-gray-200"
                }`}
              >
                {msg.file ? (
                  <a
                    href={msg.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <img
                      src={msg.file}
                      alt="uploaded-file"
                      className="rounded-lg max-w-full h-auto"
                    />
                  </a>
                ) : (
                  <p className="font-semibold break-words">{msg.text}</p>
                )}
                <small className="block text-gray-400 text-xs mt-2">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {msg.sender === currentUsername && (
                    <span className="ml-2">
                      {msg.seen ? (
                        <FaCheckDouble className="inline text-blue-400" />
                      ) : (
                        <FaCheck className="inline text-gray-400" />
                      )}
                    </span>
                  )}
                </small>
                {msg.sender === currentUsername && (
                  <button
                    onClick={() => handleDeleteMessage(index)}
                    className="delete-button absolute top-2 right-2 text-red-500 hover:text-red-400"
                  >
                    <FaTrashAlt />
                  </button>
                )}
              </div>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>

        {/* Confirm Delete Modal */}
        {confirmDelete !== null && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <h3 className="text-white text-lg mb-4">
                Are you sure you want to delete this message?
              </h3>
              <button
                onClick={confirmDeleteMessage}
                className="bg-red-600 px-4 py-2 rounded-lg text-white mr-4"
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
                className="bg-gray-600 px-4 py-2 rounded-lg text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Message Input Area */}
        <footer className="footer p-4 border-t border-gray-700 bg-gray-900 flex items-center">
          <input
            type="file"
            onChange={handleFileUpload}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="text-gray-400 hover:text-gray-300 mr-4"
          >
            <FaPaperclip />
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="input-field flex-1 p-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="notification-button text-yellow-400 hover:text-yellow-300 ml-4"
          >
            <FaPaperPlane />
          </button>
        </footer>
      </main>
    </div>
  );
};

export default ChatPage;
