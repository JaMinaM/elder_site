export interface PostMedia {
  type: "image" | "video";
  url: string;
  alt?: string;
}

export interface PostComment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: Date;
  likes: number;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  media?: PostMedia[];
  likes: number;
  comments: PostComment[];
  shares: number;
  timestamp: Date;
  privacy: "public" | "friends" | "family";
}

export interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string, comment: string) => void;
  onShare?: (postId: string) => void;
  currentUserId?: string;
}
export interface PostCreatorProps {
  onSubmit: (post: {
    content: string;
    media?: File[];
    privacy: "public" | "friends" | "family";
  }) => void;
  currentUser?: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export type PrivacyOption = {
  value: "public" | "friends" | "family";
  label: string;
  icon: React.ReactNode;
  description: string;
};
