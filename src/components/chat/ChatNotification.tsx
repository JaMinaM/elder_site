"use client";

import React from "react";
import { Bell, X, MessageCircle } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";

interface ChatNotificationProps {
  message: {
    id: string;
    sender: string;
    content: string;
    chatId: string;
    timestamp: Date;
    type: "message" | "mention" | "groupInvite";
  };
  onClose: () => void;
  onClick: () => void;
  autoClose?: boolean;
  duration?: number;
}
export const ChatNotification: React.FC<ChatNotificationProps> = ({
  message,
  onClose,
  onClick,
  autoClose = true,
  duration = 5000,
}) => {
  const isDarkMode = useDarkMode();

  React.useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  const getNotificationIcon = () => {
    switch (message.type) {
      case "mention":
        return "@";
      case "groupInvite":
        return <Bell className="w-5 h-5" />;
      default:
        return <MessageCircle className="w-5 h-5" />;
    }
  };
  return (
    <div
      className={`fixed bottom-4 right-4 max-w-sm w-full p-4 rounded-lg shadow-lg 
            transform transition-all duration-300 ease-in-out
            ${isDarkMode ? "bg-gray-800" : "bg-white"}
            hover:shadow-xl hover:scale-102 cursor-pointer`}
      onClick={onClick}
      role="alert"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center 
              justify-center ${isDarkMode ? "bg-gray-700" : "bg-blue-100"}`}
        >
          <span className={isDarkMode ? "text-blue-400" : "text-blue-600"}>
            {getNotificationIcon()}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 pt-1">
          <p
            className={`font-medium ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {message.sender}
          </p>
          <p
            className={`text-sm mt-1 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {message.content}
          </p>
          <p
            className={`text-xs mt-1 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className={`p-1 rounded-full hover:bg-gray-100 
                dark:hover:bg-gray-700 transition-colors`}
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatNotification;
