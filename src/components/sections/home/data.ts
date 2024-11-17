export const SAMPLE_ARTICLES = [
  {
    id: "article-1",
    title: "Stay Active: Exercise Tips for All Ages",
    excerpt:
      "Discover gentle yet effective exercises that can help maintain flexibility and strength...",
    content: "Full article content here...",
    author: "Dr. Sarah Johnson",
    publishDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
    category: "health",
    readTime: 5,
    likes: 42,
    saves: 15,
    tags: ["wellness", "fitness"],
  },
  {
    id: "article-2",
    title: "Understanding Digital Privacy",
    excerpt:
      "Essential tips for staying safe online while connecting with family and friends...",
    content: "Full article content here...",
    author: "Tech Expert Team",
    publishDate: new Date(Date.now() - 1000 * 60 * 60 * 48),
    category: "technology",
    readTime: 7,
    likes: 35,
    saves: 28,
    tags: ["privacy", "technology", "safety"],
  },
];

export const SAMPLE_EVENTS = [
  {
    id: "event-1",
    title: "Community Book Club Meeting",
    description:
      'Join us for a discussion of "The Midnight Library" by Matt Haig...',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    time: "2:00 PM",
    location: "Local Library Community Room",
    organizer: "City Library",
    category: "social",
    attendees: 12,
    interested: 25,
    isVirtual: false,
  },
  {
    id: "event-2",
    title: "Virtual Yoga Session",
    description: "Gentle yoga class suitable for all skill levels...",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24),
    time: "10:00 AM",
    location: "Online",
    organizer: "Community Wellness Center",
    category: "health",
    attendees: 8,
    interested: 15,
    isVirtual: true,
    link: "https://meeting-link.example",
  },
];
