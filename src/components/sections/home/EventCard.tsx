"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Share2,
  Star,
  Video,
  Building,
} from "lucide-react";
import { formatTimeAgo } from "@/utils/helpers";
import type { EventCardProps } from "./types";

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onInterested,
  onAttend,
  onShare,
}) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="bg-white dark:bg-gray-800 hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        {/* Event Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {event.title}
            </h3>
            <div className="flex items-center gap-2 mt-2 text-gray-500 dark:text-gray-400">
              <Building className="w-4 h-4" />
              <span>{event.organizer}</span>
            </div>
          </div>
          {event.isVirtual && (
            <span
              className="flex items-center gap-1 px-3 py-1 rounded-full 
              bg-blue-50 text-blue-700 text-sm dark:bg-blue-900 dark:text-blue-200"
            >
              <Video className="w-4 h-4" />
              Virtual Event
            </span>
          )}
        </div>

        {/* Event Details */}
        <div className="space-y-3 mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            {event.description}
          </p>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <CalendarDays className="w-5 h-5" />
              <span>{formatDate(event.date)}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Clock className="w-5 h-5" />
              <span>{event.time}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <MapPin className="w-5 h-5" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>

        {/* Event Stats */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-600 dark:text-gray-300">
              {event.attendees} attending
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-600 dark:text-gray-300">
              {event.interested} interested
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <button
              onClick={() => onAttend(event.id)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Attend
            </button>
            <button
              onClick={() => onInterested(event.id)}
              className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg 
                hover:bg-gray-50 transition-colors dark:border-gray-600 
                dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Interested
            </button>
          </div>

          <button
            onClick={() => onShare(event.id)}
            className="p-2 text-gray-500 hover:text-blue-500 
              dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
