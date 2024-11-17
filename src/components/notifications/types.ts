"use client";

export interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: Date;
  type: "health" | "social" | "community";
  read: boolean;
}

export interface NotificationPanelProps {
  notifications: Notification[];
  onClose: () => void;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}
