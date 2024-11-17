"use client";

import React from "react";
import { MoreVertical, ChevronLeft, Users, Phone, Video } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";
import type { ChatHeaderProps } from "./types";

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  chat,
  currentUserId,
  onBack,
  onViewInfo,
  onArchiveChat,
  onLeaveGroup,
}) => {
  const isDarkMode = useDarkMode();
  return (
    <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Go back"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center
          ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}
        >
          {chat.type === "group" ? (
            <Users className="w-5 h-5 text-gray-500" />
          ) : chat.participants[0]?.avatar ? (
            <img
              src={chat.participants[0].avatar}
              alt={chat.participants[0].name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <Users className="w-5 h-5 text-gray-500" />
          )}
        </div>

        <div>
          <h3
            className={`font-medium ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {chat.type === "group"
              ? chat.groupInfo?.name
              : chat.participants[0]?.name}
          </h3>
          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {chat.type === "group"
              ? `${chat.participants.length} members`
              : chat.participants[0]?.status}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Start voice call"
        >
          <Phone className="w-5 h-5" />
        </button>
        <button
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Start video call"
        >
          <Video className="w-5 h-5" />
        </button>
        <button
          onClick={onViewInfo}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="View chat info"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
