import { InterestGroup, GroupMember } from "./types";

// Sample members
const sampleMembers: GroupMember[] = [
  {
    id: "member1",
    name: "Sarah Johnson",
    role: "admin",
    joinedDate: new Date(2024, 0, 15),
  },
  {
    id: "member2",
    name: "Robert Davis",
    role: "moderator",
    joinedDate: new Date(2024, 1, 1),
  },
  {
    id: "member3",
    name: "Mary Wilson",
    role: "member",
    joinedDate: new Date(2024, 1, 10),
  },
];

export const SAMPLE_GROUPS: InterestGroup[] = [
  {
    id: "group1",
    name: "Classic Literature Book Club",
    description:
      "Monthly discussions of classic literature and their modern relevance.",
    category: "book-club",
    privacy: "public",
    members: sampleMembers,
    events: [
      {
        id: "event1",
        title: "Pride and Prejudice Discussion",
        description:
          "Monthly book discussion focusing on Jane Austen's masterpiece.",
        date: new Date(2024, 3, 15),
        time: "14:00",
        location: "Community Center",
        isVirtual: false,
        attendees: sampleMembers.slice(0, 2),
      },
    ],
    discussions: [
      {
        id: "disc1",
        title: "Your Favorite Jane Austen Character",
        content:
          "Let's discuss our favorite characters from Pride and Prejudice!",
        author: sampleMembers[0],
        timestamp: new Date(2024, 3, 1),
        likes: 5,
        comments: [],
      },
    ],
    media: [],
    createdDate: new Date(2024, 0, 1),
    meetingSchedule: "Every third Saturday of the month",
  },
  {
    id: "group2",
    name: "Gardening Enthusiasts",
    description: "Share tips, experiences, and photos of your garden journey.",
    category: "hobby",
    privacy: "public",
    members: sampleMembers.slice(1),
    events: [
      {
        id: "event2",
        title: "Spring Planting Workshop",
        description:
          "Learn about the best plants for spring and planting techniques.",
        date: new Date(2024, 3, 20),
        time: "10:00",
        location: "Community Garden",
        isVirtual: false,
        attendees: sampleMembers.slice(1),
      },
    ],
    discussions: [],
    media: [],
    createdDate: new Date(2024, 0, 15),
  },
  {
    id: "group3",
    name: "Travel Stories",
    description: "Share your travel experiences and plan future adventures.",
    category: "travel",
    privacy: "public",
    members: sampleMembers,
    events: [],
    discussions: [],
    media: [],
    createdDate: new Date(2024, 1, 1),
  },
  {
    id: "group4",
    name: "Grandparents Connect",
    description: "Share experiences and tips about grandparenting.",
    category: "grandparenting",
    privacy: "public",
    members: sampleMembers.slice(0, 2),
    events: [],
    discussions: [],
    media: [],
    createdDate: new Date(2024, 1, 15),
  },
];

export const GROUP_CATEGORIES = [
  { value: "book-club", label: "Book Clubs" },
  { value: "hobby", label: "Hobbies" },
  { value: "travel", label: "Travel" },
  { value: "grandparenting", label: "Grandparenting" },
  { value: "retirement", label: "Retirement" },
  { value: "health", label: "Health & Wellness" },
  { value: "technology", label: "Technology" },
];
