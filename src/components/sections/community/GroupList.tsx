"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { InterestGroupCard } from "./InterestGroupCard";
import type { GroupListProps } from "./types";
import { useDarkMode } from "@/hooks/useDarkMode";
import { type InterestGroupCardProps } from "./types";

export const GroupList: React.FC<GroupListProps> = ({
  groups,
  onJoinGroup,
  onLeaveGroup,
  onViewGroupDetails,
}) => {
  const isDarkMode = useDarkMode();

  if (groups.length === 0) {
    return (
      <Card className={`${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
        <CardContent className="p-6 text-center">
          <p
            className={`text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            No groups found. Try adjusting your filters or create a new group!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <InterestGroupCard
          key={group.id}
          group={group}
          onJoin={onJoinGroup}
          onLeave={onLeaveGroup}
          onViewDetails={onViewGroupDetails}
        />
      ))}
    </div>
  );
};

export default GroupList;
