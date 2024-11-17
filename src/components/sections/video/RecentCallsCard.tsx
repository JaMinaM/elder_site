"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Phone,
  User,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Clock,
} from "lucide-react";
import type { RecentCallsCardProps } from "./types";
import { formatTimeAgo } from "@/utils/helpers";
import { useDarkMode } from "@/hooks/useDarkMode";

export const RecentCallsCard = ({
  calls,
  onCallBack,
}: RecentCallsCardProps) => {
  const isDarkMode = useDarkMode();

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getCallIcon = (type: string) => {
    switch (type) {
      case "incoming":
        return <PhoneIncoming className="w-4 h-4 text-green-500" />;
      case "outgoing":
        return <PhoneOutgoing className="w-4 h-4 text-blue-500" />;
      case "missed":
        return <PhoneMissed className="w-4 h-4 text-red-500" />;
      default:
        return <Phone className="w-4 h-4" />;
    }
  };

  return (
    <Card className={`${isDarkMode ? "bg-gray-800" : "bg-white"} mb-6`}>
      <CardContent className="p-6">
        <h2
          className={`text-xl font-semibold mb-4 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Recent Calls
        </h2>

        <div className="space-y-4">
          {calls.map((call) => (
            <div
              key={call.id}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                isDarkMode
                  ? "border-gray-700 bg-gray-700"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center 
                  ${isDarkMode ? "bg-gray-600" : "bg-gray-200"}`}
                >
                  {call.contactAvatar ? (
                    <img
                      src={call.contactAvatar}
                      alt={call.contactName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User
                      className={`w-5 h-5 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3
                      className={`font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {call.contactName}
                    </h3>
                    {getCallIcon(call.type)}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock
                      className={`w-4 h-4 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                    <span
                      className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                    >
                      {formatTimeAgo(call.timestamp)}
                    </span>
                    {call.type !== "missed" && (
                      <span
                        className={
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }
                      >
                        • {formatDuration(call.duration)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onCallBack(call.contactId)}
                className={`p-2 rounded-lg ${
                  isDarkMode
                    ? "bg-gray-600 hover:bg-gray-500 text-gray-300"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                } transition-colors`}
                title="Call back"
              >
                <Phone className="w-5 h-5" />
              </button>
            </div>
          ))}

          {calls.length === 0 && (
            <div className="text-center py-6">
              <p
                className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                No recent calls
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentCallsCard;
