export const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
};

export const initialNotifications = [
  {
    id: 1,
    title: "Medication Reminder",
    message: "Time to take your evening medication",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    type: "health",
    read: false,
  },
  {
    id: 2,
    title: "New Message",
    message: "Sarah sent you a message",
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    type: "social",
    read: false,
  },
  {
    id: 3,
    title: "Book Club Meeting",
    message: "Meeting starts in 1 hour",
    timestamp: new Date(Date.now() - 55 * 60 * 1000),
    type: "community",
    read: true,
  },
] as const;
