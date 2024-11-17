"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Video, Heart, HelpCircle } from "lucide-react";
import { WeatherWidget } from "@/components/weather/WeatherWidget";
import { HomeFeed } from "./HomeFeed";

const WelcomeCard = ({ setActivePage }) => {
  const quickActions = [
    {
      id: "emergency",
      label: "Emergency Call",
      icon: <AlertCircle className="w-6 h-6" />,
      color: "red",
      onClick: () => (window.location.href = "tel:911"),
    },
    {
      id: "video",
      label: "Video Chat",
      icon: <Video className="w-6 h-6" />,
      color: "blue",
      onClick: () => setActivePage("video"),
    },
    {
      id: "medication",
      label: "Medication",
      icon: <Heart className="w-6 h-6" />,
      color: "pink",
      onClick: () => setActivePage("health"),
    },
    {
      id: "help",
      label: "Help",
      icon: <HelpCircle className="w-6 h-6" />,
      color: "green",
      onClick: () => setActivePage("help"),
    },
  ];

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Welcome Back, JaMina!
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.onClick}
              className={`p-4 rounded-lg flex flex-col items-center gap-2 
                transition-all duration-200 
                ${
                  action.color === "red"
                    ? "bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
                    : action.color === "blue"
                    ? "bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                    : action.color === "pink"
                    ? "bg-pink-50 hover:bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300"
                    : "bg-green-50 hover:bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                }
                hover:shadow-md border-2 border-transparent
                ${
                  action.color === "red"
                    ? "hover:border-red-200 dark:hover:border-red-800"
                    : ""
                }`}
            >
              {action.icon}
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const HomeSection = ({ setActivePage }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-6">
      <WelcomeCard setActivePage={setActivePage} />
      <WeatherWidget />
      <HomeFeed />
    </div>
  );
};

export default HomeSection;
