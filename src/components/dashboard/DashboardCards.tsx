'use client';

import { DashboardIcons } from './DashboardIcons';
import { Settings, ChevronRight } from 'lucide-react';

export const DashboardCards = ({
  dashboardCards,
  isEditMode,
  moveCard,
  setActivePage
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {dashboardCards.map((card, index) => (
        <div key={card.id} className="relative group">
          {/* Rest of your card code */}
          <div className="flex items-center gap-2">
            {DashboardIcons[card.id]}  {/* Use the icon here */}
            <h3 className={\ont-medium \\}>
              {card.title}
            </h3>
          </div>
          {/* Rest of your code */}
        </div>
      ))}
    </div>
  );
};
