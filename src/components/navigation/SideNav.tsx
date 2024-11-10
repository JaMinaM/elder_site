"use client";
import React from "react";
import { Home, Heart, MessageCircle, Users } from "lucide-react";
import { Heart as HeartFilled } from "lucide-react";

interface SideNavProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export const SideNav = ({ activePage, setActivePage }: SideNavProps) => {
  const navItems = [
    { id: "home", label: "Home", icon: <Home className="w-5 h-5" /> },
    {
      id: "health",
      label: "Health",
      icon:
        activePage === "health" ? (
          <HeartFilled className="w-5 h-5 text-red-500 fill-red-500" />
        ) : (
          <Heart className="w-5 h-5 text-red-500" />
        ),
    },
    {
      id: "social",
      label: "Social",
      icon: <MessageCircle className="w-5 h-5" />,
    },
    {
      id: "community",
      label: "Community",
      icon: <Users className="w-5 h-5" />,
    },
  ];

  return (
    <nav className="space-y-1">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActivePage(item.id)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 
            ${
              activePage === item.id
                ? "bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            }
            focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400`}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};
