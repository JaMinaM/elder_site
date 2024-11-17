"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  User,
  X,
  Bell,
  AlertCircle,
  Check,
  Repeat,
} from "lucide-react";
import type { CallSchedulerCardProps } from "./types";
import { useDarkMode } from "@/hooks/useDarkMode";

export const CallSchedulerCard = ({
  contacts,
  scheduledCalls,
  onSchedule,
  onCancel,
}: CallSchedulerCardProps) => {
  const isDarkMode = useDarkMode();
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [formData, setFormData] = useState({
    contactId: "",
    date: "",
    time: "",
    duration: 30,
    recurring: false,
    reminderSet: true,
    notes: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSchedule({
      ...formData,
      contactName:
        contacts.find((c) => c.id === formData.contactId)?.name || "",
    });
    setFormData({
      contactId: "",
      date: "",
      time: "",
      duration: 30,
      recurring: false,
      reminderSet: true,
      notes: "",
    });
    setShowScheduleForm(false);
  };

  const formatDateTime = (date: Date, time: string) => {
    const formattedDate = new Date(date).toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    return `${formattedDate} at ${time}`;
  };

  return (
    <Card className={`${isDarkMode ? "bg-gray-800" : "bg-white"} mb-6`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-xl font-semibold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Scheduled Calls
          </h2>
          <button
            onClick={() => setShowScheduleForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
              transition-colors"
          >
            Schedule New Call
          </button>
        </div>
        {/* Schedule Form */}
        {showScheduleForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-6 p-4 border rounded-lg
            dark:border-gray-700"
          >
            <div className="space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Contact
                </label>
                <select
                  value={formData.contactId}
                  onChange={(e) =>
                    setFormData({ ...formData, contactId: e.target.value })
                  }
                  required
                  className={`w-full p-2 rounded-lg border ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-200 text-gray-900"
                  }`}
                >
                  <option value="">Select a contact</option>
                  {contacts.map((contact) => (
                    <option key={contact.id} value={contact.id}>
                      {contact.name} ({contact.relationship})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className={`w-full p-2 rounded-lg border ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-200 text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Time
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    required
                    className={`w-full p-2 rounded-lg border ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-200 text-gray-900"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Duration (minutes)
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      duration: Number(e.target.value),
                    })
                  }
                  className={`w-full p-2 rounded-lg border ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-200 text-gray-900"
                  }`}
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>1 hour</option>
                </select>
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.recurring}
                    onChange={(e) =>
                      setFormData({ ...formData, recurring: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded
                      focus:ring-blue-500"
                  />
                  <span
                    className={`text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Make this a recurring call
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.reminderSet}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reminderSet: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded
                      focus:ring-blue-500"
                  />
                  <span
                    className={`text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Set reminder
                  </span>
                </label>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Notes (optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows={3}
                  className={`w-full p-2 rounded-lg border ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-200 text-gray-900"
                  }`}
                  placeholder="Add any notes about this call..."
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowScheduleForm(false)}
                  className={`px-4 py-2 rounded-lg border ${
                    isDarkMode
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  } transition-colors`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg 
                    hover:bg-blue-700 transition-colors"
                >
                  Schedule Call
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Scheduled Calls List */}
        <div className="space-y-4">
          {scheduledCalls.map((call) => (
            <div
              key={call.id}
              className={`p-4 rounded-lg border ${
                isDarkMode
                  ? "border-gray-700 bg-gray-700"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center 
                    ${isDarkMode ? "bg-gray-600" : "bg-gray-200"}`}
                  >
                    <User
                      className={`w-5 h-5 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                  </div>

                  <div>
                    <h3
                      className={`font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {call.contactName}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar
                        className={`w-4 h-4 ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {formatDateTime(call.date, call.time)}
                      </span>
                    </div>
                    {call.duration && (
                      <div className="flex items-center gap-2 mt-1">
                        <Clock
                          className={`w-4 h-4 ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {call.duration} minutes
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      {call.recurring && (
                        <span
                          className="flex items-center gap-1 text-xs bg-blue-100 
                          dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-full"
                        >
                          <Repeat className="w-3 h-3" />
                          Recurring
                        </span>
                      )}
                      {call.reminderSet && (
                        <span
                          className="flex items-center gap-1 text-xs bg-green-100 
                          dark:bg-green-900 text-green-600 dark:text-green-300 px-2 py-1 rounded-full"
                        >
                          <Bell className="w-3 h-3" />
                          Reminder Set
                        </span>
                      )}
                    </div>
                    {call.notes && (
                      <p
                        className={`mt-2 text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {call.notes}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => onCancel(call.id)}
                  className={`p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 
                    text-red-600 dark:text-red-400 transition-colors`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          {scheduledCalls.length === 0 && (
            <div className="text-center py-6">
              <p
                className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                No scheduled calls. Click the button above to schedule one.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CallSchedulerCard;
