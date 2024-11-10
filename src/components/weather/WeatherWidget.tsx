"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, Cloud, CloudRain, Wind } from "lucide-react";

export const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState({
    temperature: "72°F",
    condition: "Sunny",
    humidity: "45%",
    windSpeed: "8 mph",
  });
  const isDarkMode = document.documentElement.classList.contains("dark");

  return (
    <Card className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white"}`}>
      <CardContent className="p-6">
        <div className="text-center">
          <h2
            className={`text-2xl font-semibold mb-6 ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Today's Weather
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className={`p-6 rounded-lg ${
                isDarkMode ? "bg-gray-700" : "bg-blue-50"
              }`}
            >
              <div className="flex flex-col items-center">
                <h3
                  className={`text-xl font-bold mb-2 ${
                    isDarkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  Local Weather
                </h3>
                <div className="flex items-center justify-center mb-4">
                  <Sun className="w-12 h-12 text-yellow-500" />
                </div>
                <p
                  className={`text-4xl font-bold ${
                    isDarkMode ? "text-blue-400" : "text-blue-700"
                  }`}
                >
                  {weatherData.temperature}
                </p>
                <p
                  className={`text-lg mt-2 ${
                    isDarkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  {weatherData.condition}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-lg ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-50"
                }`}
              >
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Humidity
                </p>
                <p
                  className={`text-xl font-bold ${
                    isDarkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  {weatherData.humidity}
                </p>
              </div>
              <div
                className={`p-4 rounded-lg ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-50"
                }`}
              >
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Wind
                </p>
                <p
                  className={`text-xl font-bold ${
                    isDarkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  {weatherData.windSpeed}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`mt-6 p-4 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-yellow-50"
            }`}
          >
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
