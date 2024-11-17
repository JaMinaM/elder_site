"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { useDarkMode } from "@/hooks/useDarkMode";
import {
  ChatSidebar,
  ChatWindow,
  GroupChatModal,
  Chat,
  MessageType,
} from "@/components/chat";
import { SAMPLE_CHATS } from "@/components/chat/data";

interface MessagesSectionState {
  selectedChatId: string | null;
  chats: Chat[];
  showGroupModal: boolean;
  isMobileView: boolean;
  showChatList: boolean;
}

const currentUser = {
  id: "current-user",
  name: "Current User",
};
export const MessagesSection = () => {
  const isDarkMode = useDarkMode();
  const [state, setState] = useState<MessagesSectionState>({
    selectedChatId: null,
    chats: SAMPLE_CHATS,
    showGroupModal: false,
    isMobileView: false,
    showChatList: true,
  });

  // Get current chat
  const currentChat = state.selectedChatId
    ? state.chats.find((chat) => chat.id === state.selectedChatId)
    : null;

  // Handle window resize for mobile view
  React.useEffect(() => {
    const handleResize = () => {
      setState((prev) => ({
        ...prev,
        isMobileView: window.innerWidth < 768,
        showChatList: window.innerWidth >= 768 || !prev.selectedChatId,
      }));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Chat selection handlers
  const handleChatSelect = (chatId: string) => {
    setState((prev) => ({
      ...prev,
      selectedChatId: chatId,
      showChatList: !prev.isMobileView,
    }));
  };

  const handleBackToList = () => {
    setState((prev) => ({
      ...prev,
      selectedChatId: null,
      showChatList: true,
    }));
  };

  // Message handlers
  const handleSendMessage = (
    content: string,
    type: MessageType,
    mediaUrl?: string
  ) => {
    if (!state.selectedChatId) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      content,
      type,
      timestamp: new Date(),
      status: "sent",
      mediaUrl,
    };

    setState((prev) => ({
      ...prev,
      chats: prev.chats.map((chat) =>
        chat.id === prev.selectedChatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: newMessage,
            }
          : chat
      ),
    }));
  };
  // Group chat handlers
  const handleCreateGroup = () => {
    setState((prev) => ({
      ...prev,
      showGroupModal: true,
    }));
  };

  const handleCloseGroupModal = () => {
    setState((prev) => ({
      ...prev,
      showGroupModal: false,
    }));
  };

  const handleGroupCreated = (groupData: any) => {
    const newGroup: Chat = {
      id: `group-${Date.now()}`,
      type: "group",
      participants: groupData.members,
      messages: [],
      unreadCount: 0,
      groupInfo: {
        id: `group-${Date.now()}`,
        name: groupData.name,
        members: groupData.members,
        admins: [currentUser.id],
        createdBy: currentUser.id,
        createdAt: new Date(),
        description: groupData.description,
      },
    };

    setState((prev) => ({
      ...prev,
      chats: [newGroup, ...prev.chats],
      showGroupModal: false,
    }));
  };
  // Message action handlers
  const handleEditMessage = (messageId: string, newContent: string) => {
    setState((prev) => ({
      ...prev,
      chats: prev.chats.map((chat) =>
        chat.id === prev.selectedChatId
          ? {
              ...chat,
              messages: chat.messages.map((msg) =>
                msg.id === messageId
                  ? { ...msg, content: newContent, edited: true }
                  : msg
              ),
            }
          : chat
      ),
    }));
  };

  const handleDeleteMessage = (messageId: string) => {
    setState((prev) => ({
      ...prev,
      chats: prev.chats.map((chat) =>
        chat.id === prev.selectedChatId
          ? {
              ...chat,
              messages: chat.messages.filter((msg) => msg.id !== messageId),
            }
          : chat
      ),
    }));
  };

  const handleReactToMessage = (messageId: string, emoji: string) => {
    setState((prev) => ({
      ...prev,
      chats: prev.chats.map((chat) =>
        chat.id === prev.selectedChatId
          ? {
              ...chat,
              messages: chat.messages.map((msg) =>
                msg.id === messageId
                  ? {
                      ...msg,
                      reactions: [
                        ...(msg.reactions || []),
                        { emoji, userId: currentUser.id },
                      ],
                    }
                  : msg
              ),
            }
          : chat
      ),
    }));
  };
  return (
    <div className="h-[calc(100vh-200px)] flex">
      {/* Chat List */}
      {state.showChatList && (
        <div className={`${state.isMobileView ? "w-full" : "w-80"} h-full`}>
          <ChatSidebar
            chats={state.chats}
            selectedChatId={state.selectedChatId}
            currentUserId={currentUser.id}
            onChatSelect={handleChatSelect}
            onNewChat={() => {}}
            onNewGroup={handleCreateGroup}
          />
        </div>
      )}

      {/* Chat Window */}
      {currentChat && !state.showChatList && (
        <div className="flex-1 h-full">
          <ChatWindow
            chat={currentChat}
            currentUserId={currentUser.id}
            onSendMessage={handleSendMessage}
            onEditMessage={handleEditMessage}
            onDeleteMessage={handleDeleteMessage}
            onReactToMessage={handleReactToMessage}
            onBack={handleBackToList}
          />
        </div>
      )}

      {/* Empty State */}
      {!currentChat && !state.showChatList && (
        <div className="flex-1 flex items-center justify-center">
          <p
            className={`text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Select a chat to start messaging
          </p>
        </div>
      )}

      {/* Group Chat Modal */}
      <GroupChatModal
        isOpen={state.showGroupModal}
        onClose={handleCloseGroupModal}
        onCreateGroup={handleGroupCreated}
        contacts={[]}
      />
    </div>
  );
};

export default MessagesSection;
