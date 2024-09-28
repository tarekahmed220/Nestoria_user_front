


// import React, { useState } from "react";
// import { ChatState } from "../context/ChatProvidor.jsx";

// import { IoImageOutline } from "react-icons/io5";
// import { BiSearchAlt } from "react-icons/bi";

// import ChatBox from "../components/ChatBox.jsx";
// import SideBar from "../components/ChatSideBar.jsx";

// const Chat = () => {
//   const { user } = ChatState(); // Fetch user from context
//   const [fetchAgain, setFetchAgain] = useState(false);

//   return (
//     <div
//       className="mx-auto p-4 py-16 flex flex-col lg:flex-row gap-3 h-screen bg-black text-[#929292] relative"
//       style={{
//         backgroundImage: "url('/body-bg.png')",
//         backgroundPosition: "left top",
//         backgroundSize: "auto",
//         backgroundRepeat: "repeat",
//         backgroundAttachment: "scroll",
//         backgroundColor: "#101010",
//       }}
//     >
//       {/* Sidebar */}
//       <aside className="w-full lg:w-1/4 lg:p-6 flex flex-col border-b lg:border-b-0 lg:border-r border-[#929292] rounded-3xl overflow-hidden">
//         <div className="mb-6">
//           <h3 className="text-center text-xl text-[#929292] mb-1">All Chats</h3>
//           {user && <SideBar fetchAgain={fetchAgain} />}
//         </div>
//       </aside>

//       {/* Main Chat Area */}
//       <main
//         className="flex-1 flex flex-col border border-[#A5A5A5] rounded-3xl bg-black overflow-y-auto"
//         style={{ scrollbarWidth: "none" }}
//       >
//         {user && (
//           <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
//         )}
//       </main>
//     </div>
//   );
// };

// export default Chat;
import React, { useState } from "react";
import { ChatState } from "../context/ChatProvidor";
import SideBar from "../components/ChatSideBar.jsx";
import ChatBox from "../components/ChatBox.jsx";
import { FaBars } from "react-icons/fa";  // Icon for toggling sidebar

const Chat = () => {
  const { user } = ChatState(); // Fetch user from context
  const [fetchAgain, setFetchAgain] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);  // Toggle state for sidebar

  return (
    <div
      className="relative flex flex-col lg:flex-row mx-auto  mt-12 gap-3 lg:flex-row h-screen bg-black text-[#929292] overflow-hidden"
      style={{
        backgroundImage: "url('/body-bg.png')",
        backgroundPosition: "left top",
        backgroundSize: "auto",
        backgroundRepeat: "repeat",
        backgroundAttachment: "scroll",
        backgroundColor: "#101010",
      }}
    >
      {/* Toggle Button for Sidebar in Small Screens */}
      <button
        className="lg:hidden p-4 text-white absolute top-4 left-4 z-50 hover:text-[#C96B14] cursor-pointer"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static transition-all transform lg:translate-x-0 absolute ${
          isSidebarOpen ? "translate-x-0 z-index-1 pt-8" : "-translate-x-full"
        } top-0 left-0 lg:w-1/4 w-3/4 bg-black lg:p-6 flex flex-col border-b lg:border-b-0 lg:border-r border-[#929292] rounded-3xl z-40`}
      >
        <div className="mb-6 pt-4 overflow-y-auto overflow-x-hidden" style={{scrollbarWidth: "none"}}>
          <h3 className="text-center text-xl text-[#929292] mb-1">All Chats</h3>
          {user && <SideBar fetchAgain={fetchAgain} />}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col border border-[#A5A5A5] h-full rounded-3xl bg-black overflow-y-auto" style={{scrollbarWidth:'none'}}>
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} style={{scrollbarWidth: "none"}} />
        )}
      </main>
    </div>
  );
};

export default Chat;
