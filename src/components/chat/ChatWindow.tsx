"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChatHeader } from './ChatHeader';
import {
  MoreVertical,
  ChevronLeft,
  Users,
  Phone,
  Video,
  Image as ImageIcon,
  Paperclip,
  Send,
  Smile,
} from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import type { ChatWindowProps, ChatMessage, MessageType } from "./types";

const TYPING_TIMER = 2000; // 2 seconds
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ChatWindow: React.FC<ChatWindowProps> = ({
  chat,
  currentUserId,
  onSendMessage,
  onEditMessage,
  onDeleteMessage,
  onReactToMessage,
}) => {
  const isDarkMode = useDarkMode();
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  // Scroll to bottom of messages
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  // Handle scroll to show/hide scroll button
  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShowScrollButton(!isNearBottom);
  };

  // Scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom("auto");
  }, [chat.messages]);

  // Setup scroll listener
  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);
  ("use client");

  import React, { useState, useRef, useEffect } from "react";
  import { Card, CardContent } from "@/components/ui/card";
  import {
    MoreVertical,
    ChevronLeft,
    Users,
    Phone,
    Video,
    Image as ImageIcon,
    Paperclip,
    Send,
    Smile,
  } from "lucide-react";
  import { useDarkMode } from "@/hooks/useDarkMode";
  import { MessageBubble } from "./MessageBubble";
  import { ChatInput } from "./ChatInput";
  import type { ChatWindowProps } from "./types";

  const TYPING_TIMER = 2000; // 2 seconds
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  export const ChatWindow: React.FC<ChatWindowProps> = ({
    chat,
    currentUserId,
    onSendMessage,
    onEditMessage,
    onDeleteMessage,
    onReactToMessage,
  }) => {
    const isDarkMode = useDarkMode();
    const [isTyping, setIsTyping] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const typingTimeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
      const container = chatContainerRef.current;
      if (container) {
        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
      }
    }, []);
    // Utility functions
    const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
      messagesEndRef.current?.scrollIntoView({ behavior });
    };

    const handleScroll = () => {
      if (!chatContainerRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    };

    const handleTypingStart = () => {
      setIsTyping(true);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, TYPING_TIMER);
    };

    const handleSendMessage = (
      content: string,
      type: MessageType,
      mediaUrl?: string
    ) => {
      onSendMessage(content, type, mediaUrl);
      scrollToBottom();
    };
    <ChatHeader 
        chat={chat}
        currentUserId={currentUserId}
        onBack={onBack}
        onViewInfo={onViewInfo}
        onArchiveChat={onArchiveChat}
          />
        </div>
      </Card>
    );
  };
};

export default ChatWindow;
