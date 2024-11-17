"use client";

import React, { useState, useRef } from "react";
import { Image as ImageIcon, Paperclip, Send, Smile, X } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";
import type { ChatInputProps, MessageType } from "./types";

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onTyping,
  disabled = false,
}) => {
  const isDarkMode = useDarkMode();
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || selectedFile) {
      if (selectedFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
          onSendMessage(
            message.trim(),
            selectedFile.type.startsWith("image/") ? "image" : "file",
            reader.result as string
          );
        };
        reader.readAsDataURL(selectedFile);
      } else {
        onSendMessage(message.trim(), "text");
      }
      setMessage("");
      setSelectedFile(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) setSelectedFile(file);
          break;
        }
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className="relative">
      {/* Selected File Preview */}
      {selectedFile && (
        <div
          className={`p-2 mb-2 rounded-lg border ${
            isDarkMode
              ? "bg-gray-700 border-gray-600"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {selectedFile.name}
            </span>
            <button
              type="button"
              onClick={() => setSelectedFile(null)}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {selectedFile.type.startsWith("image/") && (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Selected image"
              className="mt-2 max-h-32 rounded"
            />
          )}
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              onTyping?.();
            }}
            onKeyDown={handleKeyPress}
            onPaste={handlePaste}
            placeholder="Type a message..."
            disabled={disabled}
            rows={1}
            className={`w-full p-3 rounded-lg resize-none ${
              isDarkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-gray-900 border-gray-200"
            } border focus:ring-2 focus:ring-blue-500`}
            style={{
              minHeight: "44px",
              maxHeight: "120px",
            }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pb-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept="image/*,video/*,application/*"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`p-2 rounded-full ${
              isDarkMode
                ? "hover:bg-gray-700 text-gray-400"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setShowEmoji(!showEmoji)}
            className={`p-2 rounded-full ${
              isDarkMode
                ? "hover:bg-gray-700 text-gray-400"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <Smile className="w-5 h-5" />
          </button>
          <button
            type="submit"
            disabled={disabled || (!message.trim() && !selectedFile)}
            className={`p-2 rounded-full ${
              disabled || (!message.trim() && !selectedFile)
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
