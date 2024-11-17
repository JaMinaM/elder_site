"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Book, Bike, Camera, ChevronLeft, Plus } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";
import { GroupList } from "./GroupList";
import { GroupFilters } from "./GroupFilters";
import { CreateGroupForm } from "./CreateGroupForm";
import { GroupDetails } from "./GroupDetails";
import { SAMPLE_GROUPS } from "./data";
import type { InterestGroup, GroupCategory } from "./types";

type ViewState = "list" | "details" | "create";

interface CommunityState {
  view: ViewState;
  selectedGroupId: string | null;
  selectedCategories: GroupCategory[];
  searchQuery: string;
  groups: InterestGroup[];
}
export const CommunitySection = () => {
  const isDarkMode = useDarkMode();
  const [state, setState] = useState<CommunityState>({
    view: "list",
    selectedGroupId: null,
    selectedCategories: [],
    searchQuery: "",
    groups: SAMPLE_GROUPS,
  });

  const currentUser = {
    id: "current-user",
    name: "Current User",
  };

  // Group interaction handlers
  const handleJoinGroup = (groupId: string) => {
    setState((prev) => ({
      ...prev,
      groups: prev.groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              members: [
                ...group.members,
                {
                  id: currentUser.id,
                  name: currentUser.name,
                  role: "member",
                  joinedDate: new Date(),
                },
              ],
            }
          : group
      ),
    }));
  };

  const handleLeaveGroup = (groupId: string) => {
    setState((prev) => ({
      ...prev,
      groups: prev.groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              members: group.members.filter(
                (member) => member.id !== currentUser.id
              ),
            }
          : group
      ),
    }));
  };
  // View and navigation handlers
  const handleViewDetails = (groupId: string) => {
    setState((prev) => ({
      ...prev,
      view: "details",
      selectedGroupId: groupId,
    }));
  };

  const handleBackToList = () => {
    setState((prev) => ({
      ...prev,
      view: "list",
      selectedGroupId: null,
    }));
  };

  const handleCreateGroup = () => {
    setState((prev) => ({
      ...prev,
      view: "create",
    }));
  };

  // Filter handlers
  const handleCategoryChange = (categories: GroupCategory[]) => {
    setState((prev) => ({
      ...prev,
      selectedCategories: categories,
    }));
  };

  const handleSearch = (query: string) => {
    setState((prev) => ({
      ...prev,
      searchQuery: query,
    }));
  };

  // Group creation handler
  const handleSubmitGroup = (
    groupData: Omit<InterestGroup, "id" | "createdDate">
  ) => {
    const newGroup: InterestGroup = {
      ...groupData,
      id: `group-${Date.now()}`,
      createdDate: new Date(),
      members: [
        {
          id: currentUser.id,
          name: currentUser.name,
          role: "admin",
          joinedDate: new Date(),
        },
      ],
      events: [],
      discussions: [],
      media: [],
    };

    setState((prev) => ({
      ...prev,
      groups: [newGroup, ...prev.groups],
      view: "list",
    }));
  };
  // Filter groups based on selected categories and search query
  const filteredGroups = state.groups.filter((group) => {
    const matchesCategories =
      state.selectedCategories.length === 0 ||
      state.selectedCategories.includes(group.category);

    const matchesSearch =
      state.searchQuery === "" ||
      group.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(state.searchQuery.toLowerCase());

    return matchesCategories && matchesSearch;
  });

  // Get current group for details view
  const currentGroup = state.selectedGroupId
    ? state.groups.find((group) => group.id === state.selectedGroupId)
    : null;

  // Render functions for different views
  const renderHeader = () => (
    <div className="flex justify-between items-center mb-6">
      {state.view !== "list" && (
        <button
          onClick={handleBackToList}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg 
            ${
              isDarkMode
                ? "hover:bg-gray-700 text-gray-300"
                : "hover:bg-gray-100 text-gray-700"
            }`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Groups</span>
        </button>
      )}
      {state.view === "list" && (
        <button
          onClick={handleCreateGroup}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white 
            rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Create Group</span>
        </button>
      )}
    </div>
  );
  // Main render
  return (
    <div className="space-y-6">
      <Card className={`${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}>
        <CardContent className="p-6">
          {/* Header with navigation and actions */}
          {renderHeader()}

          {/* Main Content */}
          {state.view === "list" && (
            <>
              <GroupFilters
                selectedCategories={state.selectedCategories}
                onCategoryChange={handleCategoryChange}
                onSearch={handleSearch}
              />
              <GroupList
                groups={filteredGroups}
                onJoinGroup={handleJoinGroup}
                onLeaveGroup={handleLeaveGroup}
                onViewGroupDetails={handleViewDetails}
              />
              {filteredGroups.length === 0 && (
                <div className="text-center py-8">
                  <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                    No groups found. Try adjusting your filters or create a new
                    group!
                  </p>
                </div>
              )}
            </>
          )}

          {state.view === "details" && currentGroup && (
            <GroupDetails
              group={currentGroup}
              currentUserId={currentUser.id}
              onJoin={handleJoinGroup}
              onLeave={handleLeaveGroup}
              onCreateDiscussion={(discussion) => {
                console.log("Create discussion:", discussion);
              }}
              onCreateEvent={(event) => {
                console.log("Create event:", event);
              }}
              onUploadMedia={(media) => {
                console.log("Upload media:", media);
              }}
            />
          )}

          {state.view === "create" && (
            <CreateGroupForm
              onSubmit={handleSubmitGroup}
              onCancel={handleBackToList}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunitySection;
