import Avatar from "../../components/Avatar";
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
    <>
      {/* Add CSS for scrollbar hiding in Chrome and WebKit browsers */}
      <style>
        {`
          .scrollable-feed::-webkit-scrollbar {
            width: 0;
            height: 0;
          }
          .scrollable-feed {
            scrollbar-width: none; /* For Firefox */
            -ms-overflow-style: none; /* For Internet Explorer and Edge */
          }
        `}
      </style>

      <ScrollableFeed className="scrollable-feed">
        {messages &&
          messages.map((m, i) => (
            <div className="flex" key={m._id}>
              {(isSameSender(messages, m, i, user._id) || isLastMessage(messages, i, user._id)) && (
                <div className="tooltip relative" data-tooltip={m.sender.fullName}>
                  <Avatar
                    name={m.sender.fullName}
                    imageUrl={m.sender.photo}
                    userId={m.sender._id}
                  />
                </div>
              )}
              <span
                className={`${
                  m.sender._id === user._id ? "bg-gray-500" : "bg-gray-400"
                } ${m.photo ? "rounded-2xl border-0 max-w-[50%] mx-3" : "rounded-2xl px-4 py-2 max-w-[50%] text-white mx-3"} `}
                style={{
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  marginTop: isSameUser(messages, m, i, user._id) ? "0.75rem" : "2.5rem",
                }}
              >
                {m.photo ? (
                  <img
                    src={m.photo}
                    alt="Uploaded file"
                    className="uploaded-photo"
                    style={{ maxWidth: "150px", borderRadius: "1px", marginTop: "10px", objectFit: "contain", border: "none" }}
                  />
                ) : ""}
                {m.content ? (
                  <p className="text-xs">
                    {m.content.length > 100 ? (
                      <>
                        {m.content.substring(0, 100)}
                        <br />
                        {m.content.substring(100)}
                      </>
                    ) : m.content}
                  </p>
                ) : ""}
                <small className="text-black text-xs mr-0 mbb-0">
                  {new Date(m.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </small>
              </span>
            </div>
          ))}
      </ScrollableFeed>
    </>
  );
};

export default ScrollableChat;
