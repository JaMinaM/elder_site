"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type InterestGroupCardProps } from "./types";
import {
  Users,
  Calendar,
  MessageCircle,
  Image as ImageIcon,
  Lock,
  Globe,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";
import type { GroupDetailsProps } from "./types";
import { formatTimeAgo } from "@/utils/helpers";

export const GroupDetails: React.FC<GroupDetailsProps> = ({
  group,
  currentUserId,
  onJoin,
  onLeave,
  onCreateDiscussion,
  onCreateEvent,
  onUploadMedia,
}) => {
  const isDarkMode = useDarkMode();
  const [activeTab, setActiveTab] = useState<
    "discussions" | "events" | "media" | "members"
  >("discussions");
  const [isCreatingDiscussion, setIsCreatingDiscussion] = useState(false);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  const isMember = group.members.some((member) => member.id === currentUserId);
  const isAdmin = group.members.some(
    (member) => member.id === currentUserId && member.role === "admin"
  );
  // Header render function
  const renderHeader = () => (
    <CardHeader className="space-y-4">
      {/* Group Title and Privacy */}
      <div className="flex justify-between items-start">
        <div>
          <h2
            className={`text-2xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {group.name}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            {group.privacy === "private" ? (
              <Lock className="w-4 h-4 text-gray-500" />
            ) : (
              <Globe className="w-4 h-4 text-gray-500" />
            )}
            <span
              className={`text-sm capitalize ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {group.privacy} Group
            </span>
          </div>
        </div>
        {isAdmin && (
          <button
            className={`p-2 rounded-lg ${
              isDarkMode
                ? "hover:bg-gray-700 text-gray-400"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <Settings className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Group Stats */}
      <div className="flex flex-wrap gap-4">
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
            {group.members.length} members
          </span>
        </div>
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
            {group.events.length} events
          </span>
        </div>
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
            {group.discussions.length} discussions
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {["discussions", "events", "media", "members"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px
              ${
                activeTab === tab
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
    </CardHeader>
  );
  // Discussions tab render function
  const renderDiscussions = () => (
    <div className="space-y-4">
      {/* Create Discussion Button */}
      {isMember && (
        <button
          onClick={() => setIsCreatingDiscussion(true)}
          className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 
            rounded-lg hover:bg-blue-100 dark:bg-blue-900/50 dark:text-blue-400 
            dark:hover:bg-blue-900/70 transition-colors"
        >
          Start New Discussion
        </button>
      )}

      {/* Discussions List */}
      <div className="space-y-4">
        {group.discussions.map((discussion) => (
          <div
            key={discussion.id}
            className={`p-4 rounded-lg border ${
              isDarkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3
                  className={`font-medium ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {discussion.title}
                </h3>
                <p
                  className={`mt-1 text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {discussion.content}
                </p>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>{discussion.author.name}</span>
              <span>•</span>
              <span>{formatTimeAgo(discussion.timestamp)}</span>
              <span>•</span>
              <span>{discussion.comments.length} comments</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  // Events tab render function
  const renderEvents = () => (
    <div className="space-y-4">
      {/* Create Event Button */}
      {isMember && (
        <button
          onClick={() => setIsCreatingEvent(true)}
          className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 
            rounded-lg hover:bg-blue-100 dark:bg-blue-900/50 dark:text-blue-400 
            dark:hover:bg-blue-900/70 transition-colors"
        >
          Create New Event
        </button>
      )}

      {/* Events List */}
      <div className="space-y-4">
        {group.events.map((event) => (
          <div
            key={event.id}
            className={`p-4 rounded-lg border ${
              isDarkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3
                  className={`font-medium ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {event.title}
                </h3>
                <p
                  className={`mt-1 text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {event.description}
                </p>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span
                      className={`text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span
                      className={`text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {event.attendees.length} attending
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  // Members tab render function
  const renderMembers = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {group.members.map((member) => (
        <div
          key={member.id}
          className={`p-4 rounded-lg border ${
            isDarkMode
              ? "bg-gray-700 border-gray-600"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center 
              ${isDarkMode ? "bg-gray-600" : "bg-gray-100"}`}
            >
              {member.avatar ? (
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <Users
                  className={`w-6 h-6 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              )}
            </div>
            <div>
              <h3
                className={`font-medium ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {member.name}
              </h3>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
              </p>
              <p
                className={`text-xs ${
                  isDarkMode ? "text-gray-500" : "text-gray-500"
                }`}
              >
                Joined {formatTimeAgo(member.joinedDate)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  // Main render
  return (
    <Card className={`${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
      {renderHeader()}
      <CardContent className="p-6">
        {/* Tab Content */}
        {activeTab === "discussions" && renderDiscussions()}
        {activeTab === "events" && renderEvents()}
        {activeTab === "members" && renderMembers()}
        {activeTab === "media" && (
          <div className="text-center text-gray-500 dark:text-gray-400">
            Media section coming soon...
          </div>
        )}

        {/* Join/Leave Button */}
        {!isAdmin && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => (isMember ? onLeave(group.id) : onJoin(group.id))}
              className={`w-full py-2 rounded-lg text-sm font-medium transition-colors
                ${
                  isMember
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                }`}
            >
              {isMember ? "Leave Group" : "Join Group"}
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GroupDetails;
