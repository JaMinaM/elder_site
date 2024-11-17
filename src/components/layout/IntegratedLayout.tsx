"use client";
import React, { useState, useEffect } from "react";
import { useLayoutState } from "@/hooks/useLayoutState";
import { NotificationPanel } from "@/components/notifications/NotificationPanel";
import { SideNav } from "@/components/navigation/SideNav";
import { HealthSection } from "@/components/sections/health/HealthSection";
import { SocialSection } from "@/components/sections/social/SocialSection";
import { CommunitySection } from "@/components/sections/community/CommunitySection";
import { HomeSection } from "@/components/sections/home/HomeSection";
import { VideoSection } from "@/components/sections/video";
import { Bell, Settings, Menu, Sun, Moon, ContrastIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const IntegratedLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [showThemeTooltip, setShowThemeTooltip] = useState(false);
  const [showContrastTooltip, setShowContrastTooltip] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsDarkMode(document.documentElement.classList.contains("dark"));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
    });

    return () => observer.disconnect();
  }, []);
  const {
    notifications,
    setNotifications,
    showNotifications,
    setShowNotifications,
    activePage,
    setActivePage,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isEditMode,
    setIsEditMode,
    dashboardCards,
    moveCard,
    pageVisibility,
    pageOrder,
    togglePageVisibility,
    reorderPages,
    isOpen, // Add these
    setIsOpen, // two lines
  } = useLayoutState();

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  const toggleContrast = () => {
    const newContrast = !highContrast;
    setHighContrast(newContrast);
    document.documentElement.classList.toggle("high-contrast", newContrast);
  };

  const renderContent = () => {
    switch (activePage) {
      case "health":
        return <HealthSection />;
      case "social":
        return <SocialSection />;
      case "community":
        return <CommunitySection />;
      case "video":
        return <VideoSection />;
      default:
        return <HomeSection setActivePage={setActivePage} />;
    }
  };
  return (
    <div
      className={`min-h-screen transition-colors duration-200
      ${isDarkMode ? "dark bg-gray-900" : "bg-slate-100"}
      ${highContrast ? "high-contrast" : ""}`}
    >
      {/* Header */}
      <header
        className={`${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-b"
        } shadow-sm`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                className="md:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className={`w-6 h-6 ${isDarkMode ? "text-white" : ""}`} />
              </button>
              <button
                onClick={() => setActivePage("home")}
                className={`text-2xl font-bold ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                } ml-2 hover:text-blue-700 transition-colors`}
                aria-label="Go to Home Page"
              >
                GoldenConnect
              </button>
            </div>
            <nav className="flex items-center gap-4">
              {/* Theme Toggle Buttons */}
              <div className="flex gap-2">
                <div className="relative">
                  <button
                    onClick={toggleTheme}
                    onMouseEnter={() => setShowThemeTooltip(true)}
                    onMouseLeave={() => setShowThemeTooltip(false)}
                    className={`p-2 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-700 text-yellow-400"
                        : "bg-blue-50 text-gray-700"
                    } hover:bg-opacity-80 transition-colors duration-200`}
                    aria-label={
                      isDarkMode
                        ? "Switch to Light Mode"
                        : "Switch to Dark Mode"
                    }
                  >
                    {isDarkMode ? (
                      <Sun className="w-6 h-6" />
                    ) : (
                      <Moon className="w-6 h-6" />
                    )}
                  </button>
                  {showThemeTooltip && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg whitespace-nowrap">
                      {isDarkMode
                        ? "Switch to Light Mode"
                        : "Switch to Dark Mode"}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button
                    onClick={toggleContrast}
                    onMouseEnter={() => setShowContrastTooltip(true)}
                    onMouseLeave={() => setShowContrastTooltip(false)}
                    className={`p-2 rounded-lg ${
                      highContrast
                        ? "bg-yellow-400 text-black"
                        : "bg-gray-200 text-gray-700"
                    } hover:bg-opacity-80 transition-colors duration-200`}
                    aria-label={
                      highContrast ? "Normal Contrast" : "High Contrast"
                    }
                  >
                    <ContrastIcon className="w-6 h-6" />
                  </button>
                  {showContrastTooltip && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg whitespace-nowrap">
                      {highContrast
                        ? "Switch to Normal Contrast"
                        : "Switch to High Contrast"}
                    </div>
                  )}
                </div>
              </div>
              <div className="relative">
                <button
                  className="p-2 relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell
                    className={`w-6 h-6 ${isDarkMode ? "text-white" : ""}`}
                  />
                  {notifications.filter((n) => !n.read).length > 0 && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                </button>
                {showNotifications && (
                  <NotificationPanel
                    notifications={notifications}
                    onClose={() => setShowNotifications(false)}
                    setNotifications={setNotifications}
                  />
                )}
              </div>
              <button className="p-2">
                <Settings
                  className={`w-6 h-6 ${isDarkMode ? "text-white" : ""}`}
                />
              </button>
            </nav>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden md:block w-64">
            <Card
              className={`${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white"
              } shadow-sm`}
            >
              <CardContent className="p-4">
                <SideNav
                  activePage={activePage}
                  setActivePage={setActivePage}
                  pageVisibility={pageVisibility}
                  pageOrder={pageOrder}
                  togglePageVisibility={togglePageVisibility}
                  reorderPages={reorderPages}
                  mobileMenuOpen={isMobileMenuOpen}
                  setMobileMenuOpen={setIsMobileMenuOpen} // Add this line
                />
              </CardContent>
            </Card>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 bg-white dark:bg-gray-800 rounded-lg">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default IntegratedLayout;
