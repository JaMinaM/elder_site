import { Chat, ChatUser, ChatMessage, ChatGroup } from "./types";

export const SAMPLE_USERS: ChatUser[] = [
  {
    id: "user1",
    name: "Sarah Johnson",
    status: "online",
    lastSeen: new Date(),
  },
  {
    id: "user2",
    name: "Robert Davis",
    status: "offline",
    lastSeen: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "user3",
    name: "Mary Wilson",
    status: "away",
    lastSeen: new Date(Date.now() - 1000 * 60 * 5),
  },
];

export const SAMPLE_MESSAGES: ChatMessage[] = [
  {
    id: "msg1",
    senderId: "user1",
    content: "Hi! How are you doing today?",
    type: "text",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    status: "read",
  },
  {
    id: "msg2",
    senderId: "current-user",
    content: "I'm doing great, thanks for asking! How about you?",
    type: "text",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    status: "delivered",
  },
  {
    id: "msg3",
    senderId: "user1",
    content:
      "I'm good too! Would you like to join our virtual book club meeting tomorrow?",
    type: "text",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    status: "delivered",
  },
];

export const SAMPLE_GROUPS: ChatGroup[] = [
  {
    id: "group1",
    name: "Book Club",
    members: SAMPLE_USERS,
    admins: ["user1"],
    createdBy: "user1",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    description: "Weekly book discussion group",
  },
  {
    id: "group2",
    name: "Gardening Tips",
    members: SAMPLE_USERS.slice(1),
    admins: ["user2"],
    createdBy: "user2",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    description: "Share gardening advice and experiences",
  },
];

export const SAMPLE_CHATS: Chat[] = [
  {
    id: "chat1",
    type: "direct",
    participants: [SAMPLE_USERS[0]],
    messages: SAMPLE_MESSAGES,
    lastMessage: SAMPLE_MESSAGES[SAMPLE_MESSAGES.length - 1],
    unreadCount: 1,
  },
  {
    id: "chat2",
    type: "group",
    participants: SAMPLE_USERS,
    messages: [],
    unreadCount: 0,
    groupInfo: SAMPLE_GROUPS[0],
  },
];
