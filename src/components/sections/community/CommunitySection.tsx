"use client";

import React from "react";
import { Book, Bike, Camera } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const CommunitySection = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Community Groups
          </h2>
          <CommunityGroups />
          <UpcomingEvents />
        </CardContent>
      </Card>
    </div>
  );
};

const CommunityGroups = () => {
  const groups = [
    {
      name: "Book Club",
      members: 156,
      icon: <Book className="w-6 h-6" />,
    },
    {
      name: "Walking Group",
      members: 89,
      icon: <Bike className="w-6 h-6" />,
    },
    {
      name: "Photo Club",
      members: 134,
      icon: <Camera className="w-6 h-6" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {groups.map((group, index) => (
        <div
          key={index}
          className="p-4 border rounded-lg hover:shadow-md dark:bg-gray-700 
            dark:border-gray-600 transition-shadow duration-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              {group.icon}
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {group.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {group.members} members
              </p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              className="w-full py-2 text-sm bg-blue-50 text-blue-600 
              rounded-lg hover:bg-blue-100 dark:bg-blue-900/50 dark:text-blue-300 
              dark:hover:bg-blue-800/50 transition-colors duration-200"
            >
              Join Group
            </button>
            <button
              className="w-full py-2 text-sm bg-gray-50 text-gray-600 
              rounded-lg hover:bg-gray-100 dark:bg-gray-600 dark:text-gray-200 
              dark:hover:bg-gray-500 transition-colors duration-200"
            >
              Learn More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const UpcomingEvents = () => {
  return (
    <div
      className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/50 rounded-lg 
      transition-colors duration-200"
    >
      <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
        Upcoming Events
      </h3>
      <div className="space-y-2">
        <p className="text-sm text-blue-600 dark:text-blue-300">
          Book Club Meeting - Tomorrow at 2 PM
        </p>
        <p className="text-sm text-blue-600 dark:text-blue-300">
          Walking Group - Saturday at 9 AM
        </p>
        <p className="text-sm text-blue-600 dark:text-blue-300">
          Photo Club Exhibition - Next Week
        </p>
      </div>
    </div>
  );
};
