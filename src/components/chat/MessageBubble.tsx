"use client";

import React, { useState } from "react";
import {
  MoreVertical,
  Edit2,
  Trash2,
  Smile,
  Check,
  CheckCheck,
} from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";
import { formatTimeAgo } from "@/utils/helpers";
import type { MessageBubbleProps } from "./types";

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwnMessage,
  sender,
  onEdit,
  onDelete,
  onReact,
}) => {
  const isDarkMode = useDarkMode();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);
  const [showOptions, setShowOptions] = useState(false);
  const handleEdit = () => {
    if (!onEdit) return;
    if (isEditing) {
      onEdit(message.id, editedContent);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleDelete = () => {
    if (!onDelete) return;
    onDelete(message.id);
  };

  const handleReact = (emoji: string) => {
    if (!onReact) return;
    onReact(message.id, emoji);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleEdit();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setEditedContent(message.content);
    }
  };
  const renderMessageStatus = () => {
    switch (message.status) {
      case "sent":
        return <Check className="w-4 h-4 text-gray-400" />;
      case "delivered":
        return <CheckCheck className="w-4 h-4 text-gray-400" />;
      case "read":
        return <CheckCheck className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const renderMedia = () => {
    if (!message.mediaUrl) return null;
    if (message.type === "image") {
      return (
        <img
          src={message.mediaUrl}
          alt="Message attachment"
          className="max-w-[200px] rounded-lg mb-2"
        />
      );
    }
    return (
      <div className="flex items-center gap-2 text-blue-500 hover:text-blue-600">
        <Paperclip className="w-4 h-4" />
        <a href={message.mediaUrl} target="_blank" rel="noopener noreferrer">
          View attachment
        </a>
      </div>
    );
  };
  return (
    <div
      className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <div className={`max-w-[70%] ${isOwnMessage ? "order-2" : ""}`}>
        {/* Message Content */}
        <div
          className={`rounded-lg p-3 ${
            isOwnMessage
              ? "bg-blue-500 text-white"
              : isDarkMode
              ? "bg-gray-700 text-white"
              : "bg-gray-100 text-gray-900"
          }`}
        >
          {!isOwnMessage && (
            <p
              className={`text-sm font-medium mb-1 ${
                isOwnMessage
                  ? "text-white"
                  : isDarkMode
                  ? "text-gray-300"
                  : "text-gray-700"
              }`}
            >
              {sender.name}
            </p>
          )}

          {isEditing ? (
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full p-2 rounded border dark:border-gray-600 
                dark:bg-gray-800 dark:text-white"
              autoFocus
            />
          ) : (
            <>
              {renderMedia()}
              <p className="whitespace-pre-wrap break-words">
                {message.content}
              </p>
            </>
          )}
          {/* Message Footer */}
          <div className="flex items-center justify-end gap-2 mt-1">
            <span
              className={`text-xs ${
                isOwnMessage
                  ? "text-blue-100"
                  : isDarkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              {formatTimeAgo(message.timestamp)}
            </span>
            {isOwnMessage && renderMessageStatus()}
          </div>
        </div>

        {/* Reactions */}
        {message.reactions && message.reactions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {message.reactions.map((reaction, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded-full text-sm ${
                  isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {reaction.emoji}
              </span>
            ))}
          </div>
        )}

        {/* Message Options */}
        {showOptions && (
          <div
            className={`absolute ${
              isOwnMessage ? "right-0" : "left-0"
            } -top-8 flex items-center gap-1 p-1 rounded-lg shadow-lg
              ${isDarkMode ? "bg-gray-700" : "bg-white"}`}
          >
            {onReact && (
              <button
                onClick={() => handleReact("👍")}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <Smile className="w-4 h-4" />
              </button>
            )}
            {isOwnMessage && onEdit && (
              <button
                onClick={handleEdit}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            )}
            {isOwnMessage && onDelete && (
              <button
                onClick={handleDelete}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
