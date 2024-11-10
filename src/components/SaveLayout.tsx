"use client";

import React from 'react';
import { Save } from 'lucide-react';

interface SaveLayoutProps {
  onSave: () => void;
  className?: string;
}

export const SaveLayout = ({ onSave, className = '' }: SaveLayoutProps) => {
  return (
    <button
      onClick={onSave}
      className={`fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg 
        hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 
        text-lg font-medium ${className}`}
      aria-label="Save layout"
    >
      <Save className="w-6 h-6" />
      <span className="hidden md:inline">Save Layout</span>
    </button>
  );
};
