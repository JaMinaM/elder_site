import { ReactNode } from 'react';

export type WeatherData = {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  name: string;
};

export type DashboardCard = {
  id: string;
  title: string;
  color: 'blue' | 'green' | 'purple';
  count: string;
  subtitle: string;
  icon?: ReactNode;
};

export type Notification = {
  id: number;
  title: string;
  message: string;
  timestamp: Date;
  type: "health" | "social" | "community";
  read: boolean;
};
