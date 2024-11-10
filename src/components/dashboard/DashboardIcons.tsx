'use client';

import { Calendar, Heart, MessageCircle } from 'lucide-react';

export const DashboardIcons = {
  activities: <Calendar className="w-6 h-6" />,
  health: <Heart className="w-6 h-6" />,
  messages: <MessageCircle className="w-6 h-6" />
} as const;
