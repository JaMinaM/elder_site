"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, User, Star } from "lucide-react";
import type { FavoriteContactsCardProps } from "./types";
import { useDarkMode } from "@/hooks/useDarkMode";

export const FavoriteContactsCard = ({
  contacts,
  onCall,
  onToggleFavorite,
}: FavoriteContactsCardProps) => {
  const isDarkMode = useDarkMode();
  const favoriteContacts = contacts.filter((contact) => contact.isFavorite);

  return (
    <Card className={`${isDarkMode ? "bg-gray-800" : "bg-white"} mb-6`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500 fill-current" />
            <h2
              className={`text-xl font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Favorite Contacts
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoriteContacts.map((contact) => (
            <div
              key={contact.id}
              className={`p-4 rounded-lg border ${
                isDarkMode
                  ? "border-gray-700 bg-gray-700"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center 
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
                        className={`w-8 h-8 ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      />
                    )}
                  </div>
                  <button
                    onClick={() => onToggleFavorite(contact.id)}
                    className="absolute -top-1 -right-1 p-1 rounded-full bg-white 
                      dark:bg-gray-800 shadow-lg"
                  >
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  </button>
                </div>

                <h3
                  className={`mt-3 font-medium ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {contact.name}
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {contact.relationship}
                </p>

                <div
                  className={`mt-2 mb-3 flex items-center gap-1 text-sm ${
                    contact.status === "online"
                      ? "text-green-500"
                      : isDarkMode
                      ? "text-gray-400"
                      : "text-gray-600"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      contact.status === "online"
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  />
                  {contact.status === "online" ? "Available" : "Unavailable"}
                </div>

                <button
                  onClick={() => onCall(contact.id)}
                  className={`w-full p-2 rounded-lg flex items-center justify-center gap-2 ${
                    contact.status === "online"
                      ? isDarkMode
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                      : isDarkMode
                      ? "bg-gray-600 text-gray-400"
                      : "bg-gray-100 text-gray-400"
                  } transition-colors ${
                    contact.status !== "online" && "cursor-not-allowed"
                  }`}
                  disabled={contact.status !== "online"}
                >
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {favoriteContacts.length === 0 && (
          <div className="text-center py-6">
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              No favorite contacts. Star your most contacted people to add them
              here.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FavoriteContactsCard;
