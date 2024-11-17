"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Search, X, Check, Image as ImageIcon } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";
import type { GroupChatModalProps, ChatUser } from "./types";

export const GroupChatModal: React.FC<GroupChatModalProps> = ({
  isOpen,
  onClose,
  onCreateGroup,
  contacts,
}) => {
  const isDarkMode = useDarkMode();
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (groupName.trim() && selectedMembers.length > 0) {
      onCreateGroup({
        name: groupName.trim(),
        description: description.trim(),
        members: contacts.filter((contact) =>
          selectedMembers.includes(contact.id)
        ),
        admins: [],
        createdBy: "current-user",
      });
      onClose();
    }
  };

  const toggleMember = (contactId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(contactId)
        ? prev.filter((id) => id !== contactId)
        : [...prev, contactId]
    );
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Group Name Input */}
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
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className={`w-full p-2 rounded-lg border ${
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-200 text-gray-900"
          } focus:ring-2 focus:ring-blue-500`}
          placeholder="Enter group name"
          required
        />
      </div>

      {/* Description Input */}
      <div>
        <label
          className={`block text-sm font-medium mb-1 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`w-full p-2 rounded-lg border ${
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-200 text-gray-900"
          } focus:ring-2 focus:ring-blue-500`}
          placeholder="Enter group description"
          rows={3}
        />
      </div>
    </form>
  );
  const renderContactList = () => (
    <div className="mt-6">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search contacts..."
          className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-200 text-gray-900"
          } focus:ring-2 focus:ring-blue-500`}
        />
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {filteredContacts.map((contact) => (
          <button
            key={contact.id}
            onClick={() => toggleMember(contact.id)}
            className={`w-full flex items-center justify-between p-3 rounded-lg 
              transition-colors ${
                selectedMembers.includes(contact.id)
                  ? "bg-blue-50 dark:bg-blue-900/50"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center
                ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}
              >
                {contact.avatar ? (
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <Users className="w-5 h-5 text-gray-500" />
                )}
              </div>
              <div className="text-left">
                <p
                  className={`font-medium ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {contact.name}
                </p>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {contact.status}
                </p>
              </div>
            </div>
            {selectedMembers.includes(contact.id) && (
              <Check className="w-5 h-5 text-blue-500" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-50">
      <Card
        className={`w-full max-w-lg ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
      >
        <CardHeader className="relative">
          <CardTitle
            className={`text-xl font-semibold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Create New Group
          </CardTitle>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 
              dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </CardHeader>

        <CardContent>
          {renderForm()}
          {renderContactList()}

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg ${
                isDarkMode
                  ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!groupName.trim() || selectedMembers.length === 0}
              className={`px-4 py-2 rounded-lg ${
                !groupName.trim() || selectedMembers.length === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Create Group
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupChatModal;
