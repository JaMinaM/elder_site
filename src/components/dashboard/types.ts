"use client";

export interface DashboardCard {
  id: string;
  title: string;
  color: "blue" | "green" | "purple" | "red";
  count: string;
  subtitle: string;
}

export interface DashboardCardsProps {
  dashboardCards: DashboardCard[];
  isEditMode: boolean;
  moveCard: (index: number, direction: "up" | "down") => void;
  setActivePage: (page: string) => void;
}
