"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, User, AlertCircle } from "lucide-react";
import type { EmergencyContactsCardProps } from "./types";
import { useDarkMode } from "@/hooks/useDarkMode";

export const EmergencyContactsCard = ({
  contacts,
  onCall,
}: EmergencyContactsCardProps) => {
  const isDarkMode = useDarkMode();
  const emergencyContacts = contacts.filter((contact) => contact.isEmergency);

  return (
    <Card className={`${isDarkMode ? "bg-gray-800" : "bg-white"} mb-6`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <h2
              className={`text-xl font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Emergency Contacts
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {emergencyContacts.map((contact) => (
            <div
              key={contact.id}
              className={`p-4 rounded-lg border ${
                isDarkMode
                  ? "border-gray-700 bg-gray-700"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center 
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
                      className={`w-6 h-6 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3
                    className={`font-medium ${
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
                    className={`mt-2 flex items-center gap-1 text-sm ${
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
                </div>
                <button
                  onClick={() => onCall(contact.id)}
                  className={`p-2 rounded-lg ${
                    contact.status === "online"
                      ? "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-400 dark:hover:bg-red-800/50"
                      : isDarkMode
                      ? "bg-gray-600 text-gray-400"
                      : "bg-gray-100 text-gray-400"
                  } transition-colors ${
                    contact.status !== "online" && "cursor-not-allowed"
                  }`}
                  disabled={contact.status !== "online"}
                  title={
                    contact.status === "online"
                      ? "Start emergency call"
                      : "Contact unavailable"
                  }
                >
                  <Phone className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {emergencyContacts.length === 0 && (
          <div className="text-center py-6">
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              No emergency contacts set. Add emergency contacts from your
              contacts list.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmergencyContactsCard;
