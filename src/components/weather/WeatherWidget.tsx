"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, Cloud, Wind } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";

export const WeatherWidget = () => {
  const isDarkMode = useDarkMode();

  return (
    <Card className={`${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sun className="w-8 h-8 text-yellow-500" />
            <div>
              <h3
                className={`text-lg font-medium ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                72°F
              </h3>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                San Francisco
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Wind className="w-4 h-4" />
              <span>8 mph</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Sunny</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
