"use client";

import React, { useState } from "react";
import {
  Home,
  Heart,
  MessageCircle,
  Users,
  Video,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
  Mail,
} from "lucide-react";
import {
  Home as HomeFilled,
  Heart as HeartFilled,
  MessageCircle as MessageCircleFilled,
  Users as UsersFilled,
  Video as VideoFilled,
  Mail as MailFilled,
} from "lucide-react";

interface SideNavProps {
  activePage: string;
  setActivePage: (page: string) => void;
  pageVisibility: {
    [key: string]: boolean;
  };
  pageOrder: {
    [key: string]: number;
  };
  togglePageVisibility: (page: string) => void;
  reorderPages: (oldIndex: number, newIndex: number) => void;
  mobileMenuOpen?: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
}

export const SideNav: React.FC<SideNavProps> = ({
  activePage,
  setActivePage,
  pageVisibility,
  pageOrder,
  togglePageVisibility,
  reorderPages,
  mobileMenuOpen = false,
  setMobileMenuOpen,
}) => {
  const [showHiddenPages, setShowHiddenPages] = useState(false);
  const navItems = [
    {
      id: "home",
      label: "Home",
      icon:
        activePage === "home" ? (
          <HomeFilled className="w-5 h-5 text-blue-500 fill-blue-500" />
        ) : (
          <Home className="w-5 h-5" />
        ),
      order: pageOrder.home || 0,
    },
    {
      id: "health",
      label: "Health",
      icon:
        activePage === "health" ? (
          <HeartFilled className="w-5 h-5 text-red-500 fill-red-500" />
        ) : (
          <Heart className="w-5 h-5 text-red-500" />
        ),
      order: pageOrder.health || 1,
    },
    {
      id: "social",
      label: "Social",
      icon:
        activePage === "social" ? (
          <MessageCircleFilled className="w-5 h-5 text-green-500 fill-green-500" />
        ) : (
          <MessageCircle className="w-5 h-5 text-green-500" />
        ),
      order: pageOrder.social || 2,
    },
    {
      id: "messages",
      label: "Messages",
      icon:
        activePage === "messages" ? (
          <MailFilled className="w-5 h-5 text-indigo-500 fill-indigo-500" />
        ) : (
          <Mail className="w-5 h-5 text-indigo-500" />
        ),
      order: pageOrder.messages || 3,
    },
    {
      id: "community",
      label: "Community",
      icon:
        activePage === "community" ? (
          <UsersFilled className="w-5 h-5 text-purple-500 fill-purple-500" />
        ) : (
          <Users className="w-5 h-5 text-purple-500" />
        ),
      order: pageOrder.community || 4,
    },
    {
      id: "video",
      label: "Video Chat",
      icon:
        activePage === "video" ? (
          <VideoFilled className="w-5 h-5 text-yellow-500 fill-yellow-500" />
        ) : (
          <Video className="w-5 h-5 text-yellow-500" />
        ),
      order: pageOrder.video || 5,
    },
  ].sort((a, b) => {
    if (a.id === "home") return -1;
    if (b.id === "home") return 1;
    return a.order - b.order;
  });

  const handleMove = (currentIndex: number, direction: "up" | "down") => {
    if (currentIndex === 0) return; // Can't move Home

    const newIndex =
      direction === "up"
        ? Math.max(1, currentIndex - 1)
        : Math.min(navItems.length - 1, currentIndex + 1);

    if (currentIndex !== newIndex) {
      reorderPages(currentIndex, newIndex);
    }
  };

  const filteredNavItems = navItems.filter(
    (item) => showHiddenPages || pageVisibility[item.id]
  );

  return (
    <nav
      className={`
        space-y-1 fixed md:relative left-0 top-0 h-screen md:h-auto 
        bg-white dark:bg-gray-800 shadow-lg md:shadow-none 
        transition-all duration-300 ease-in-out z-40 p-4
        ${
          mobileMenuOpen
            ? "translate-x-0 w-64"
            : "-translate-x-full md:translate-x-0 w-64"
        }
      `}
    >
      {filteredNavItems.map((item, index) => (
        <div key={item.id} className="relative group">
          <div
            onClick={() => setActivePage(item.id)}
            className={`
              flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer
              transition-colors duration-200
              ${
                activePage === item.id
                  ? "bg-blue-50 dark:bg-blue-900"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800"
              }
            `}
          >
            <div className="flex items-center gap-3 flex-1">
              <span className="flex items-center text-lg font-medium">
                {item.icon}
                <span
                  className={`ml-3 ${
                    activePage === item.id
                      ? item.id === "home"
                        ? "text-blue-600 dark:text-blue-300"
                        : item.id === "health"
                        ? "text-red-600 dark:text-red-300"
                        : item.id === "social"
                        ? "text-green-600 dark:text-green-300"
                        : item.id === "community"
                        ? "text-purple-600 dark:text-purple-300"
                        : "text-yellow-600 dark:text-yellow-300"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {item.label}
                </span>
              </span>
            </div>

            {item.id !== "home" && (
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMove(index, "up");
                  }}
                  disabled={index <= 1}
                  className={`p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700
                    ${index <= 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                  aria-label="Move up"
                >
                  <ChevronUp className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMove(index, "down");
                  }}
                  disabled={index >= filteredNavItems.length - 1}
                  className={`p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700
                    ${
                      index >= filteredNavItems.length - 1
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  aria-label="Move down"
                >
                  <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePageVisibility(item.id);
              }}
              className={`p-2 rounded-full opacity-0 group-hover:opacity-100
                transition-all duration-200 ml-2
                ${
                  activePage === item.id
                    ? "hover:bg-blue-100 dark:hover:bg-blue-800"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }
              `}
              aria-label={`${pageVisibility[item.id] ? "Hide" : "Show"} ${
                item.label
              }`}
            >
              {pageVisibility[item.id] ? (
                <Eye className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              ) : (
                <EyeOff className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={() => setShowHiddenPages(!showHiddenPages)}
        className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3
          text-sm font-medium text-gray-700 dark:text-gray-300
          hover:text-gray-900 dark:hover:text-gray-100
          hover:bg-gray-50 dark:hover:bg-gray-800
          rounded-lg transition-colors duration-200"
      >
        {showHiddenPages ? (
          <>
            <EyeOff className="w-4 h-4" />
            <span>Hide Hidden Pages</span>
          </>
        ) : (
          <>
            <Eye className="w-4 h-4" />
            <span>Show Hidden Pages</span>
          </>
        )}
      </button>
    </nav>
  );
};

export default SideNav;
