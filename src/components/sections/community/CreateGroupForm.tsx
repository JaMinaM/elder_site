"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type InterestGroupCardProps } from "./types";
import {
  Users,
  Lock,
  Image as ImageIcon,
  Calendar,
  Upload,
  X,
} from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";
import type { CreateGroupFormProps } from "./types";
import { GROUP_CATEGORIES } from "./data";

export const CreateGroupForm: React.FC<CreateGroupFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const isDarkMode = useDarkMode();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    privacy: "public",
    meetingSchedule: "",
    avatar: null as File | null,
    coverImage: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: "avatar" | "coverImage"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [fileType]: file,
      }));
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert formData to the expected InterestGroup format
    const groupData = {
      name: formData.name,
      description: formData.description,
      category: formData.category as GroupCategory,
      privacy: formData.privacy as "public" | "private",
      meetingSchedule: formData.meetingSchedule || undefined,
      members: [],
      events: [],
      discussions: [],
      media: [],
    };
    onSubmit(groupData);
  };

  return (
    <Card
      className={`w-full max-w-2xl mx-auto ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <CardHeader>
        <CardTitle
          className={`text-2xl font-bold text-center ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Create New Group
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Group Name*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-200 text-gray-900"
                } focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Description*
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-200 text-gray-900"
                } focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Category*
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-200 text-gray-900"
                } focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Select a category</option>
                {GROUP_CATEGORIES.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Privacy Settings */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Privacy
            </label>
            <div className="flex gap-4">
              {["public", "private"].map((privacy) => (
                <label key={privacy} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="privacy"
                    value={privacy}
                    checked={formData.privacy === privacy}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="capitalize text-sm text-gray-700 dark:text-gray-300">
                    {privacy}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Meeting Schedule */}
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Meeting Schedule (Optional)
            </label>
            <input
              type="text"
              name="meetingSchedule"
              value={formData.meetingSchedule}
              onChange={handleInputChange}
              placeholder="e.g., Every Monday at 2 PM"
              className={`w-full px-3 py-2 rounded-lg border ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-200 text-gray-900"
              } focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className={`px-4 py-2 rounded-lg text-sm font-medium 
                ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } transition-colors`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium 
                hover:bg-blue-700 transition-colors"
            >
              Create Group
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateGroupForm;
