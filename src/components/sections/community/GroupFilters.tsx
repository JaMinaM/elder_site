"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Tag } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";
import type { GroupFiltersProps } from "./types";
import { GROUP_CATEGORIES } from "./data";
import { type InterestGroupCardProps } from "./types";

export const GroupFilters: React.FC<GroupFiltersProps> = ({
  selectedCategories,
  onCategoryChange,
  onSearch,
}) => {
  const isDarkMode = useDarkMode();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const toggleCategory = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    onCategoryChange(newCategories);
  };

  return (
    <Card className={`${isDarkMode ? "bg-gray-800" : "bg-white"} mb-6`}>
      <CardContent className="p-6">
        {/* Search Input */}
        <div className="relative mb-4">
          <Search
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 
            ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search groups..."
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {GROUP_CATEGORIES.map((category) => (
            <button
              key={category.value}
              onClick={() => toggleCategory(category.value)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm
                transition-colors duration-200 ${
                  selectedCategories.includes(category.value)
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}
            >
              <Tag className="w-4 h-4" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupFilters;
