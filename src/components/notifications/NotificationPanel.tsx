'use client';

import React, { useState, useEffect } from 'react';
import { X, Clock } from 'lucide-react';
import { Notification } from '@/types/types';
import { formatTimeAgo } from '@/utils/helpers';

interface NotificationPanelProps {
  notifications: Notification[];
  onClose: () => void;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

export const NotificationPanel = ({
  notifications,
  onClose,
  setNotifications,
}: NotificationPanelProps) => {
  const [activeFilter, setActiveFilter] = useState<"all" | "health" | "social" | "community">("all");

  useEffect(() => {
    const timer = setInterval(() => {
      setNotifications([...notifications]);
    }, 60000);

    return () => clearInterval(timer);
  }, [notifications, setNotifications]);

  const filteredNotifications = notifications
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .filter((notif) => {
      if (activeFilter === "all") return true;
      return notif.type === activeFilter;
    });

  const handleMarkAsRead = (notificationId: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) => ({ ...notif, read: true }))
    );
  };

  return (
    <div className="absolute right-0 top-12 w-96 bg-white rounded-lg shadow-lg border z-50">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          {["all", "health", "social", "community"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter as any)}
              className={`px-3 py-1 rounded-full text-sm capitalize ${
                activeFilter === filter
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleMarkAsRead(notif.id)}
              className={`p-3 rounded-lg cursor-pointer transform transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md active:translate-y-[0px] ${
                !notif.read ? "bg-blue-50" : "bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{notif.title}</h4>
                  <p className="text-sm text-gray-600">{notif.message}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {formatTimeAgo(notif.timestamp)}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    notif.type === "health"
                      ? "text-red-600 bg-red-50"
                      : notif.type === "social"
                      ? "text-blue-600 bg-blue-50"
                      : "text-green-600 bg-green-50"
                  }`}
                >
                  {notif.type}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t flex justify-between items-center">
          <button
            onClick={handleMarkAllAsRead}
            className="text-sm text-blue-600 hover:underline"
          >
            Mark all as read
          </button>
          <div className="flex gap-4">
            <button
              onClick={() => setNotifications([])}
              className="text-sm text-red-600 hover:underline"
            >
              Clear all
            </button>
            <button className="text-sm text-blue-600 hover:underline">
              See all notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
