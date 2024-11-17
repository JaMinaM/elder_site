"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, User, Search } from "lucide-react";
import type { QuickDialCardProps } from "./types";
import { useDarkMode } from "@/hooks/useDarkMode";

export const QuickDialCard = ({ contacts, onCall }: QuickDialCardProps) => {
  const isDarkMode = useDarkMode();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.relationship.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className={`${isDarkMode ? "bg-gray-800" : "bg-white"} mb-6`}>
      <CardContent className="p-6">
        <h2
          className={`text-xl font-semibold mb-4 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Quick Dial
        </h2>

        {/* Search Input */}
        <div className="relative mb-6">
          <Search
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 
            ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search contacts..."
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredContacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => onCall(contact.id)}
              disabled={contact.status !== "online"}
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                contact.status === "online"
                  ? isDarkMode
                    ? "border-gray-700 bg-gray-700 hover:bg-gray-600"
                    : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                  : isDarkMode
                  ? "border-gray-700 bg-gray-700 opacity-60 cursor-not-allowed"
                  : "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
              } transition-colors`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center 
        ${isDarkMode ? "bg-gray-600" : "bg-gray-200"}`}
              >
                {contact.avatar ? (
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User
                    className={`w-5 h-5 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                )}
              </div>
              <div className="flex-1 text-left">
                <div
                  className={`font-medium ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {contact.name}
                </div>
                <div
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {contact.relationship}
                </div>
              </div>

              <div
                className={`flex items-center gap-1 ${
                  contact.status === "online"
                    ? "text-green-500"
                    : isDarkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    contact.status === "online" ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </div>
            </button>
          ))}
        </div>

        {filteredContacts.length === 0 && (
          <div className="text-center py-6">
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              {searchQuery
                ? "No contacts found matching your search"
                : "No contacts available"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuickDialCard;
