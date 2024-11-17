"use client";

import React from "react";
import { LayoutGrid, Newspaper, CalendarDays, Clock, Tags } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { FeedFiltersProps } from "./types";

export const FeedFilters: React.FC<FeedFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const contentTypeOptions = [
    { value: "post", label: "Posts", icon: <LayoutGrid className="w-4 h-4" /> },
    {
      value: "article",
      label: "Articles",
      icon: <Newspaper className="w-4 h-4" />,
    },
    {
      value: "event",
      label: "Events",
      icon: <CalendarDays className="w-4 h-4" />,
    },
  ];

  const timeRangeOptions = [
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "all", label: "All Time" },
  ];

  const handleContentTypeChange = (type: string) => {
    const updatedTypes = filters.contentTypes.includes(type)
      ? filters.contentTypes.filter((t) => t !== type)
      : [...filters.contentTypes, type];

    onFilterChange({
      ...filters,
      contentTypes: updatedTypes,
    });
  };

  const handleTimeRangeChange = (range: string) => {
    onFilterChange({
      ...filters,
      timeRange: range as "today" | "week" | "month" | "all",
    });
  };

  return (
    <div className="mb-6 space-y-4">
      {/* Content Type Filters */}
      <div className="flex flex-wrap gap-2">
        {contentTypeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleContentTypeChange(option.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border 
              transition-colors duration-200
              ${
                filters.contentTypes.includes(option.value)
                  ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900 dark:border-blue-800 dark:text-blue-200"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
          >
            {option.icon}
            <span>{option.label}</span>
          </button>
        ))}
      </div>

      {/* Time Range Filter */}
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        <select
          value={filters.timeRange}
          onChange={(e) => handleTimeRangeChange(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 bg-white 
            text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 
            dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          {timeRangeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Active Filters Summary */}
      {(filters.contentTypes.length < 3 ||
        filters.timeRange !== "all" ||
        filters.categories.length > 0) && (
        <div
          className="flex flex-wrap items-center gap-2 p-3 bg-gray-50 
          rounded-lg dark:bg-gray-800"
        >
          <Tags className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Active Filters:
          </span>
          {filters.contentTypes.length < 3 && (
            <span className="text-sm text-blue-600 dark:text-blue-400">
              {filters.contentTypes.join(", ")}
            </span>
          )}
          {filters.timeRange !== "all" && (
            <span className="text-sm text-blue-600 dark:text-blue-400">
              {
                timeRangeOptions.find((o) => o.value === filters.timeRange)
                  ?.label
              }
            </span>
          )}
          {filters.categories.map((category) => (
            <span
              key={category}
              className="text-sm text-blue-600 dark:text-blue-400"
            >
              {category}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedFilters;
