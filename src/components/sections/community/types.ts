import { type ClassValue } from "clsx";

export type GroupCategory =
  | "book-club"
  | "hobby"
  | "travel"
  | "grandparenting"
  | "retirement"
  | "health"
  | "technology";

export interface GroupMember {
  id: string;
  name: string;
  avatar?: string;
  role: "admin" | "moderator" | "member";
  joinedDate: Date;
}

export interface GroupEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  isVirtual: boolean;
  link?: string;
  attendees: GroupMember[];
}

export interface GroupDiscussion {
  id: string;
  title: string;
  content: string;
  author: GroupMember;
  timestamp: Date;
  likes: number;
  comments: GroupComment[];
  media?: GroupMedia[];
}

export interface GroupComment {
  id: string;
  content: string;
  author: GroupMember;
  timestamp: Date;
  likes: number;
}

export interface GroupMedia {
  id: string;
  type: "image" | "video" | "document";
  url: string;
  title: string;
  uploadedBy: GroupMember;
  uploadDate: Date;
}

export interface InterestGroup {
  id: string;
  name: string;
  description: string;
  category: GroupCategory;
  privacy: "public" | "private";
  members: GroupMember[];
  events: GroupEvent[];
  discussions: GroupDiscussion[];
  media: GroupMedia[];
  createdDate: Date;
  meetingSchedule?: string;
  avatar?: string;
  coverImage?: string;
}

// Component Props
export interface InterestGroupCardProps {
  group: InterestGroup;
  onJoin: (groupId: string) => void;
  onLeave: (groupId: string) => void;
  onViewDetails: (groupId: string) => void;
}

export interface GroupListProps {
  groups: InterestGroup[];
  onJoinGroup: (groupId: string) => void;
  onLeaveGroup: (groupId: string) => void;
  onViewGroupDetails: (groupId: string) => void;
}

export interface GroupFiltersProps {
  selectedCategories: GroupCategory[];
  onCategoryChange: (categories: GroupCategory[]) => void;
  onSearch: (query: string) => void;
}

export interface CreateGroupFormProps {
  onSubmit: (groupData: Omit<InterestGroup, "id" | "createdDate">) => void;
  onCancel: () => void;
}

export interface GroupDetailsProps {
  group: InterestGroup;
  currentUserId: string;
  onJoin: (groupId: string) => void;
  onLeave: (groupId: string) => void;
  onCreateDiscussion: (
    discussion: Omit<GroupDiscussion, "id" | "timestamp">
  ) => void;
  onCreateEvent: (event: Omit<GroupEvent, "id">) => void;
  onUploadMedia: (media: File[]) => void;
}
