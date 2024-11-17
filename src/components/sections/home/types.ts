// Article Types
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: Date;
  category: string;
  readTime: number;
  likes: number;
  saves: number;
  tags: string[];
  image?: string;
}

// Event Types
export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  organizer: string;
  category: string;
  attendees: number;
  interested: number;
  isVirtual: boolean;
  link?: string;
  image?: string;
}

// Feed Types
export type FeedItemType = "post" | "article" | "event";

export interface FeedItem {
  type: FeedItemType;
  content: Article | Event;
  timestamp: Date;
}

// Filter Types
export interface FeedFilters {
  contentTypes: FeedItemType[];
  categories: string[];
  timeRange: "today" | "week" | "month" | "all";
}

// Component Props
export interface ArticleCardProps {
  article: Article;
  onLike: (id: string) => void;
  onSave: (id: string) => void;
  onShare: (id: string) => void;
}

export interface EventCardProps {
  event: Event;
  onInterested: (id: string) => void;
  onAttend: (id: string) => void;
  onShare: (id: string) => void;
}

export interface FeedFiltersProps {
  filters: FeedFilters;
  onFilterChange: (newFilters: FeedFilters) => void;
}
