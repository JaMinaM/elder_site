"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  MessageCircle,
  Users,
  Plus,
  Circle,
  Clock,
} from "lucide-react";
import { formatTimeAgo } from "@/utils/helpers";
import { useDarkMode } from "@/hooks/useDarkMode";
import type { ChatSidebarProps, Chat } from "./types";

// Helper function to get chat name
const getChatName = (chat: Chat, currentUserId: string): string => {
  if (chat.type === "group") {
    return chat.groupInfo?.name || "Group Chat";
  }
  const otherParticipant = chat.participants.find(
    (p) => p.id !== currentUserId
  );
  return otherParticipant?.name || "Unknown Contact";
};

// Helper function to get chat status
const getChatStatus = (chat: Chat, currentUserId: string) => {
  if (chat.type === "group") {
    return `${chat.participants.length} members`;
  }
  const otherParticipant = chat.participants.find(
    (p) => p.id !== currentUserId
  );
  return otherParticipant?.status || "offline";
};
export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chats,
  selectedChatId,
  currentUserId,
  onChatSelect,
  onNewChat,
  onNewGroup,
}) => {
  const isDarkMode = useDarkMode();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "direct" | "group">("all");

  // Filter chats based on search and type
  const filteredChats = chats
    .filter((chat) => {
      const matchesSearch =
        searchQuery === "" ||
        getChatName(chat, currentUserId)
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "direct" && chat.type === "direct") ||
        (filter === "group" && chat.type === "group");

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      // Sort by last message timestamp
      const aTime = a.lastMessage?.timestamp || new Date(0);
      const bTime = b.lastMessage?.timestamp || new Date(0);
      return bTime.getTime() - aTime.getTime();
    });
  const renderHeader = () => (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2
          className={`text-xl font-semibold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Messages
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onNewChat}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="New chat"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
          <button
            onClick={onNewGroup}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="New group"
          >
            <Users className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search messages..."
          className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-200 text-gray-900"
          } focus:ring-2 focus:ring-blue-500`}
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4">
        {(["all", "direct", "group"] as const).map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === filterType
                ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
  const renderChatList = () => (
    <div className="space-y-2">
      {filteredChats.map((chat) => (
        <button
          key={chat.id}
          onClick={() => onChatSelect(chat.id)}
          className={`w-full p-3 rounded-lg transition-colors duration-200 ${
            selectedChatId === chat.id
              ? "bg-blue-50 dark:bg-blue-900/50"
              : "hover:bg-gray-50 dark:hover:bg-gray-800"
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center
                    ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}
              >
                {chat.type === "group" ? (
                  <Users className="w-6 h-6 text-gray-500" />
                ) : (
                  <MessageCircle className="w-6 h-6 text-gray-500" />
                )}
              </div>
              {chat.type === "direct" && (
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full 
                      border-2 border-white dark:border-gray-800 ${
                        getChatStatus(chat, currentUserId) === "online"
                          ? "bg-green-500"
                          : getChatStatus(chat, currentUserId) === "away"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                      }`}
                />
              )}
            </div>

            {/* Chat Info */}
            <div className="flex-1 text-left">
              <div className="flex justify-between items-start">
                <h3
                  className={`font-medium ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {getChatName(chat, currentUserId)}
                </h3>
                {chat.lastMessage && (
                  <span
                    className={`text-xs ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {formatTimeAgo(chat.lastMessage.timestamp)}
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center">
                <p
                  className={`text-sm truncate ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {chat.lastMessage?.content || "No messages yet"}
                </p>
                {chat.unreadCount > 0 && (
                  <span
                    className="ml-2 px-2 py-1 text-xs font-medium text-white 
                        bg-blue-500 rounded-full"
                  >
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <Card className={`w-80 h-full ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
      <CardContent className="p-4">
        {renderHeader()}
        {renderChatList()}
      </CardContent>
    </Card>
  );
};

export default ChatSidebar;
