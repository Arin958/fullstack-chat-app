import React, { useEffect, useRef } from "react";
import useChatStore from "../store/useChatStore";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import useAuthStore from "../store/useAuthStore";
import formatMessageTime from "../lib/utilsTime.js";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessageLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageRef = useRef();
  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageRef.current && messages) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessageLoading)
    return (
      <div>
        <div className="flex-1 flex-col overflow-auto">
          <ChatHeader />
        </div>
      </div>
    );

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex gap-3 ${
              message.senderId === authUser._id
                ? "justify-end"
                : "justify-start"
            }`}
            ref={messageRef}
          >
            <div className="avatar">
              <div className="size-10 rounded-full border">
                <img
                  className="rounded-full"
                  src={
                    message.senderId == authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="flex flex-col ">
              <div>
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
              </div>
              <div
                className={`p-3 rounded-lg max-w-xs ${
                  message.senderId === authUser._id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {message.text && <p>{message.text}</p>}
              </div>
              <div className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
