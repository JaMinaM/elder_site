'use client';

import { useState, useEffect } from 'react';
import { DashboardCard, Notification } from '@/types/types';
import { initialNotifications } from '@/utils/helpers';

const initialDashboardCards: DashboardCard[] = [
  {
    id: 'activities',
    title: "Today's Activities",
    color: 'blue',
    count: '3',
    subtitle: 'Including Book Club at 2 PM',
  },
  {
    id: 'health',
    title: 'Health Tasks',
    color: 'green',
    count: '2/3',
    subtitle: 'Evening medication due',
  },
  {
    id: 'messages',
    title: 'Messages',
    color: 'purple',
    count: '5',
    subtitle: '3 from family',
  }
];

export const useLayoutState = () => {
  // Notifications State
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  // Navigation State
  const [activePage, setActivePage] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dashboard Cards State
  const [isEditMode, setIsEditMode] = useState(false);
  const [dashboardCards, setDashboardCards] = useState<DashboardCard[]>(initialDashboardCards);

  // Load saved card order from localStorage on mount
  useEffect(() => {
    const savedOrder = localStorage.getItem('dashboardCardOrder');
    if (savedOrder) {
      try {
        const parsedOrder = JSON.parse(savedOrder);
        setDashboardCards(parsedOrder);
      } catch (e) {
        console.error('Error loading saved card order:', e);
      }
    }
  }, []);

  const moveCard = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < dashboardCards.length) {
      const newCards = [...dashboardCards];
      [newCards[index], newCards[newIndex]] = [newCards[newIndex], newCards[index]];
      setDashboardCards(newCards);
      localStorage.setItem('dashboardCardOrder', JSON.stringify(newCards));
    }
  };

  return {
    notifications,
    setNotifications,
    selectedNotification,
    setSelectedNotification,
    showNotifications,
    setShowNotifications,
    activePage,
    setActivePage,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isEditMode,
    setIsEditMode,
    dashboardCards,
    setDashboardCards,
    moveCard,
  };
};
