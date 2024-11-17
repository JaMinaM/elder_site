"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Video, Calendar, Phone } from "lucide-react";
import { VideoCallCardProps } from "./types";
import { useDarkMode } from "@/hooks/useDarkMode";

export const VideoCallCard = ({ onCall, onSchedule }: VideoCallCardProps) => {
  const isDarkMode = useDarkMode();

  return (
    <Card className={`${isDarkMode ? "bg-gray-800" : "bg-white"} mb-6`}>
      <CardContent className="p-6">
        <div className="text-center">
          <h2
            className={`text-2xl font-semibold mb-6 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Video Call Center
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Start Video Call */}
            <button
              onClick={() => onCall("new")}
              className={`p-6 rounded-lg border-2 border-dashed flex flex-col items-center gap-4
                ${
                  isDarkMode
                    ? "border-gray-700 hover:border-blue-500 hover:bg-gray-700"
                    : "border-gray-200 hover:border-blue-500 hover:bg-blue-50"
                } transition-all duration-200`}
            >
              <div
                className={`p-4 rounded-full ${
                  isDarkMode ? "bg-gray-700" : "bg-blue-100"
                }`}
              >
                <Video
                  className={`w-8 h-8 ${
                    isDarkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                />
              </div>
              <div>
                <h3
                  className={`text-lg font-medium ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Start Video Call
                </h3>
                <p
                  className={`mt-1 text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Connect with family and friends
                </p>
              </div>
            </button>

            {/* Schedule Call */}
            <button
              onClick={() => onSchedule("new")}
              className={`p-6 rounded-lg border-2 border-dashed flex flex-col items-center gap-4
                ${
                  isDarkMode
                    ? "border-gray-700 hover:border-blue-500 hover:bg-gray-700"
                    : "border-gray-200 hover:border-blue-500 hover:bg-blue-50"
                } transition-all duration-200`}
            >
              <div
                className={`p-4 rounded-full ${
                  isDarkMode ? "bg-gray-700" : "bg-blue-100"
                }`}
              >
                <Calendar
                  className={`w-8 h-8 ${
                    isDarkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                />
              </div>
              <div>
                <h3
                  className={`text-lg font-medium ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Schedule Call
                </h3>
                <p
                  className={`mt-1 text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Plan a future video chat
                </p>
              </div>
            </button>
          </div>

          {/* Emergency Call Section */}
          <div className="mt-6">
            <button
              onClick={() => onCall("emergency")}
              className="w-full p-4 bg-red-600 hover:bg-red-700 text-white rounded-lg
                flex items-center justify-center gap-3 transition-colors duration-200"
            >
              <Phone className="w-6 h-6" />
              <span className="text-lg font-medium">Emergency Video Call</span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCallCard;
