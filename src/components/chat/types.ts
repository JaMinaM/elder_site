export type MessageStatus = "sent" | "delivered" | "read";
export type ChatType = "direct" | "group";
export type MessageType = "text" | "image" | "video" | "file";

export interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  status: "online" | "offline" | "away";
  lastSeen?: Date;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  type: MessageType;
  timestamp: Date;
  status: MessageStatus;
  mediaUrl?: string;
  replyTo?: string;
  edited?: boolean;
  reactions?: MessageReaction[];
}

export interface MessageReaction {
  emoji: string;
  userId: string;
}

export interface ChatGroup {
  id: string;
  name: string;
  avatar?: string;
  members: ChatUser[];
  admins: string[];
  createdBy: string;
  createdAt: Date;
  description?: string;
}

export interface Chat {
  id: string;
  type: ChatType;
  participants: ChatUser[];
  messages: ChatMessage[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  groupInfo?: ChatGroup;
  pinnedMessages?: string[];
  isArchived?: boolean;
}

// Component Props
export interface ChatSidebarProps {
  chats: Chat[];
  selectedChatId: string | null;
  currentUserId: string;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
  onNewGroup: () => void;
}

export interface ChatWindowProps {
  chat: Chat;
  currentUserId: string;
  onSendMessage: (
    content: string,
    type: MessageType,
    mediaUrl?: string
  ) => void;
  onEditMessage: (messageId: string, newContent: string) => void;
  onDeleteMessage: (messageId: string) => void;
  onReactToMessage: (messageId: string, emoji: string) => void;
}

export interface MessageBubbleProps {
  message: ChatMessage;
  isOwnMessage: boolean;
  sender: ChatUser;
  onEdit?: (messageId: string, newContent: string) => void;
  onDelete?: (messageId: string) => void;
  onReact?: (messageId: string, emoji: string) => void;
}

export interface ChatInputProps {
  onSendMessage: (
    content: string,
    type: MessageType,
    mediaUrl?: string
  ) => void;
  onTyping?: () => void;
  disabled?: boolean;
}

export interface GroupChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGroup: (groupData: Omit<ChatGroup, "id" | "createdAt">) => void;
  contacts: ChatUser[];
}

export interface ChatHeaderProps {
  chat: Chat;
  currentUserId: string;
  onBack: () => void;
  onViewInfo: () => void;
  onArchiveChat: () => void;
  onLeaveGroup?: () => void;
}
// Add these interfaces to your existing types.ts file
export interface ChatNotification {
  id: string;
  sender: string;
  content: string;
  chatId: string;
  timestamp: Date;
  type: "message" | "mention" | "groupInvite";
  read?: boolean;
}

export interface ChatNotificationProps {
  message: ChatNotification;
  onClose: () => void;
  onClick: () => void;
  autoClose?: boolean;
  duration?: number;
}
