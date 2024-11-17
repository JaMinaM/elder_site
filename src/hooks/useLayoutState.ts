"use client";

import { useState, useEffect } from "react";
import { Notification } from "@/components/notifications/types";
import { DashboardCard } from "@/components/dashboard/types";
import { initialNotifications } from "@/utils/helpers";

const DEFAULT_PAGE_VISIBILITY = {
  home: true,
  health: true,
  social: true,
  community: true,
  video: true,
};

const DEFAULT_PAGE_ORDER = {
  home: 0,
  health: 1,
  social: 2,
  community: 3,
  video: 4,
};

const initialDashboardCards: DashboardCard[] = [
  {
    id: "vital-signs",
    title: "Vital Signs",
    color: "blue",
    count: "",
    subtitle: "Current Health Stats",
  },
  {
    id: "medications",
    title: "Medication Reminders",
    color: "green",
    count: "2/3",
    subtitle: "Evening medication due",
  },
  {
    id: "appointments",
    title: "Appointments",
    color: "purple",
    count: "3",
    subtitle: "Next: Dr. Smith - Tomorrow",
  },
  {
    id: "emergency-contacts",
    title: "Emergency Contacts",
    color: "red",
    count: "4",
    subtitle: "Family & Medical Contacts",
  },
];
export const useLayoutState = () => {
  const getInitialPageVisibility = () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("pageVisibility");
      return saved ? JSON.parse(saved) : DEFAULT_PAGE_VISIBILITY;
    }
    return DEFAULT_PAGE_VISIBILITY;
  };

  const getInitialPageOrder = () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("pageOrder");
      return saved ? JSON.parse(saved) : DEFAULT_PAGE_ORDER;
    }
    return DEFAULT_PAGE_ORDER;
  };

  // State declarations
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [dashboardCards, setDashboardCards] = useState<DashboardCard[]>(
    initialDashboardCards
  );
  const [pageVisibility, setPageVisibility] = useState(
    getInitialPageVisibility
  );
  const [pageOrder, setPageOrder] = useState(getInitialPageOrder);
  // Load saved card order
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMainOrder = localStorage.getItem("healthSectionOrder");
      if (savedMainOrder) {
        try {
          const parsedOrder = JSON.parse(savedMainOrder);
          setDashboardCards(parsedOrder);
        } catch (e) {
          console.error("Error loading saved card order:", e);
        }
      }
    }
  }, []);

  // Save page visibility whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("pageVisibility", JSON.stringify(pageVisibility));
    }
  }, [pageVisibility]);

  // Save page order whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("pageOrder", JSON.stringify(pageOrder));
    }
  }, [pageOrder]);

  const moveCard = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < dashboardCards.length) {
      const newCards = [...dashboardCards];
      [newCards[index], newCards[newIndex]] = [
        newCards[newIndex],
        newCards[index],
      ];
      setDashboardCards(newCards);
      localStorage.setItem("healthSectionOrder", JSON.stringify(newCards));
    }
  };

  const togglePageVisibility = (pageName: string) => {
    setPageVisibility((prev) => ({
      ...prev,
      [pageName]: !prev[pageName],
    }));
  };

  const reorderPages = (oldIndex: number, newIndex: number) => {
    const pages = Object.entries(pageOrder)
      .sort(([, a], [, b]) => a - b)
      .map(([page]) => page);

    // Don't allow reordering if trying to move Home
    if (pages[oldIndex] === "home" || pages[newIndex] === "home") {
      return;
    }

    const page = pages[oldIndex];
    const newOrder = { ...pageOrder };

    if (oldIndex < newIndex) {
      for (let i = oldIndex; i < newIndex; i++) {
        newOrder[pages[i]] = pageOrder[pages[i + 1]];
      }
    } else {
      for (let i = oldIndex; i > newIndex; i--) {
        newOrder[pages[i]] = pageOrder[pages[i - 1]];
      }
    }

    newOrder[page] = newIndex;
    setPageOrder(newOrder);
  };
  return {
    // Notifications
    notifications,
    setNotifications,
    showNotifications,
    setShowNotifications,

    // Navigation
    activePage,
    setActivePage,
    isMobileMenuOpen,
    setIsMobileMenuOpen,

    // Page Visibility and Order
    pageVisibility,
    pageOrder,
    togglePageVisibility,
    reorderPages,

    // Dashboard Cards
    isEditMode,
    setIsEditMode,
    dashboardCards,
    setDashboardCards,
    moveCard,
  };
};
