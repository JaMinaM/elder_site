"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { type InterestGroupCardProps } from "./types";
import {
  Users,
  Calendar,
  MessageCircle,
  ChevronRight,
  ImageIcon,
} from "lucide-react";
import { formatTimeAgo } from "@/utils/helpers";
import { useDarkMode } from "@/hooks/useDarkMode";

export const InterestGroupCard: React.FC<InterestGroupCardProps> = ({
  group,
  onJoin,
  onLeave,
  onViewDetails,
}) => {
  const isDarkMode = useDarkMode();
  const isMember = false; // This would be determined by checking current user's membership

  const getGroupStats = () => ({
    members: group.members.length,
    events: group.events.length,
    discussions: group.discussions.length,
    media: group.media.length,
  });

  const stats = getGroupStats();

  return (
    <Card
      className={`${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } hover:shadow-md transition-all duration-200`}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3
              className={`text-xl font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {group.name}
            </h3>
            <p
              className={`mt-1 text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {group.description}
            </p>
          </div>
          {group.avatar && (
            <div className="w-16 h-16 rounded-lg overflow-hidden">
              <img
                src={group.avatar}
                alt={group.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Users
              className={`w-5 h-5 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <span
              className={`text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {stats.members} members
            </span>
          </div>
          {stats.events > 0 && (
            <div className="flex items-center gap-2">
              <Calendar
                className={`w-5 h-5 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {stats.events} events
              </span>
            </div>
          )}
          {stats.discussions > 0 && (
            <div className="flex items-center gap-2">
              <MessageCircle
                className={`w-5 h-5 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {stats.discussions} discussions
              </span>
            </div>
          )}
          {stats.media > 0 && (
            <div className="flex items-center gap-2">
              <ImageIcon
                className={`w-5 h-5 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {stats.media} media items
              </span>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => (isMember ? onLeave(group.id) : onJoin(group.id))}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${
                isMember
                  ? "border border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              }`}
          >
            {isMember ? "Leave Group" : "Join Group"}
          </button>
          <button
            onClick={() => onViewDetails(group.id)}
            className="p-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 
              dark:hover:text-blue-400 transition-colors"
            aria-label="View group details"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          Created {formatTimeAgo(group.createdDate)}
          {group.meetingSchedule && ` • Meets ${group.meetingSchedule}`}
        </div>
      </CardContent>
    </Card>
  );
};

export default InterestGroupCard;
