import  Avatar  from "../../components/Avatar";
import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../chatPage/ChatLogic";
import { ChatState } from "../../context/ChatProvidor";



const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed >
      {messages &&
        messages.map((m, i) => (
          <div className="flex"  key={m._id}>
            {(isSameSender(messages, m, i, user._id) || isLastMessage(messages, i, user._id)) && (
              <div className="tooltip relative " data-tooltip={m.sender.fullName}>
                <Avatar
                //   className="w-8 h-8 rounded-full mt-2 mr-2 cursor-pointer"
                  name={m.sender.fullName}
                  imageUrl={m.sender.photo}
                  userId={m.sender._id}
                />
              </div>
            )}
            <span
              className={`${
                m.sender._id === user._id ? "bg-gray-500" : "bg-gray-400"
              } rounded-2xl px-4 py-2 max-w-[50%] text-white mx-3
   
    `}
              style={{
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? "0.75rem" : "2.5rem",
              }}
            >
              {/* {m.content} */}
              {m.content && (
                           <p className="text-xs">
                           {/* <b>{chat.latestMessage.sender.fullName}:</b>{" "} */}
                           {m.content.length > 100
                             ? (
                               <>
                                 {m.content.substring(0, 100)}
                                 <br />
                                 {m.content.substring(100)}
                               </>
                             )
                             : m.content}
                         </p>
                          )}
                        
           
            <small className="text-black text-xs mr-0 mbb-0">
            {new Date(m.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </small>
          </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;

// const ScrollableChat = ({ messages }) => {
//   const { user } = ChatState();

//   return (
//     <ScrollableFeed>
//       {messages &&
//         messages.map((m, i) => (
//           <div style={{ display: "flex" }} key={m._id}>
//             {(isSameSender(messages, m, i, user._id) ||
//               isLastMessage(messages, i, user._id)) && (
//               <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
//                 {/* <Avatar
//                   mt="7px"
//                   mr={1}
//                   size="sm"
//                   cursor="pointer"
//                   name={m.sender.name}
//                   src={m.sender.pic}

//                 /> */}
//                 <Avatar name={m.sender.fullName} src={m.sender.photo} />
//               </Tooltip>
//             )}
//             <span
//               style={{
//                 backgroundColor: `${
//                   m.sender._id === user._id ? "gray" : "gray"
//                 }`,
//                 marginLeft: isSameSenderMargin(messages, m, i, user._id),
//                 marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
//                 borderRadius: "20px",
//                 padding: "5px 15px",
//                 maxWidth: "75%",
//               }}
//             >
//               {m.content}
//             </span>
//           </div>
//         ))}
//     </ScrollableFeed>
//   );
// };

// export default ScrollableChat;