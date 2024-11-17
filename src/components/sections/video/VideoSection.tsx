"use client";

import React, { useState, useEffect } from "react";
import { VideoCallCard } from "./VideoCallCard";
import { EmergencyContactsCard } from "./EmergencyContactsCard";
import { RecentCallsCard } from "./RecentCallsCard";
import { FavoriteContactsCard } from "./FavoriteContactsCard";
import { QuickDialCard } from "./QuickDialCard";
import { CallSchedulerCard } from "./CallSchedulerCard";
import type { Contact, Call, ScheduledCall } from "./types";
import { useDarkMode } from "@/hooks/useDarkMode";

// Sample data - replace with real data later
const SAMPLE_CONTACTS: Contact[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    relationship: "Daughter",
    avatar: null,
    isEmergency: true,
    isFavorite: true,
    status: "online",
    lastCall: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: "2",
    name: "Dr. Smith",
    relationship: "Primary Care",
    avatar: null,
    isEmergency: true,
    isFavorite: false,
    status: "offline",
    lastCall: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
  },
  {
    id: "3",
    name: "Robert Johnson",
    relationship: "Son",
    avatar: null,
    isEmergency: true,
    isFavorite: true,
    status: "online",
    lastCall: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
];
const SAMPLE_CALLS: Call[] = [
  {
    id: "call1",
    contactId: "1",
    contactName: "Sarah Johnson",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    duration: 1200,
    type: "outgoing",
  },
  {
    id: "call2",
    contactId: "3",
    contactName: "Robert Johnson",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    duration: 600,
    type: "incoming",
  },
  {
    id: "call3",
    contactId: "2",
    contactName: "Dr. Smith",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    duration: 0,
    type: "missed",
  },
];

const SAMPLE_SCHEDULED_CALLS: ScheduledCall[] = [
  {
    id: "sched1",
    contactId: "1",
    contactName: "Sarah Johnson",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24),
    time: "10:00",
    duration: 30,
    recurring: true,
    reminderSet: true,
    notes: "Weekly catch-up",
  },
  {
    id: "sched2",
    contactId: "2",
    contactName: "Dr. Smith",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    time: "14:30",
    duration: 15,
    recurring: false,
    reminderSet: true,
    notes: "Follow-up appointment",
  },
];
export const VideoSection = () => {
  const [contacts] = useState<Contact[]>(SAMPLE_CONTACTS);
  const [calls, setCalls] = useState<Call[]>(SAMPLE_CALLS);
  const [scheduledCalls, setScheduledCalls] = useState<ScheduledCall[]>(
    SAMPLE_SCHEDULED_CALLS
  );
  const isDarkMode = useDarkMode();

  // useEffect(() => {
  //   const observer = new MutationObserver((mutations) => {
  //     mutations.forEach((mutation) => {
  //       if (mutation.attributeName === "class") {
  //         setIsDarkMode(document.documentElement.classList.contains("dark"));
  //       }
  //     });
  //   });

  //   observer.observe(document.documentElement, {
  //     attributes: true,
  //   });

  //   return () => observer.disconnect();
  // }, []);

  const handleCall = (contactId: string) => {
    console.log(`Initiating call with contact: ${contactId}`);
    // Implement actual call functionality
  };

  const handleScheduleCall = (call: Omit<ScheduledCall, "id">) => {
    const newCall = {
      ...call,
      id: `sched${Date.now()}`,
    };
    setScheduledCalls([newCall, ...scheduledCalls]);
  };
  const handleCancelScheduledCall = (callId: string) => {
    setScheduledCalls(scheduledCalls.filter((call) => call.id !== callId));
  };

  const handleToggleFavorite = (contactId: string) => {
    // In a real app, this would update the backend
    console.log(`Toggling favorite status for contact: ${contactId}`);
  };

  return (
    <div className="space-y-6">
      {/* Main Video Call Card */}
      <VideoCallCard onCall={handleCall} onSchedule={handleCall} />

      {/* Emergency Contacts */}
      <EmergencyContactsCard contacts={contacts} onCall={handleCall} />

      {/* Recent Calls */}
      <RecentCallsCard calls={calls} onCallBack={handleCall} />

      {/* Favorite Contacts */}
      <FavoriteContactsCard
        contacts={contacts}
        onCall={handleCall}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Quick Dial */}
      <QuickDialCard contacts={contacts} onCall={handleCall} />

      {/* Call Scheduler */}
      <CallSchedulerCard
        contacts={contacts}
        scheduledCalls={scheduledCalls}
        onSchedule={handleScheduleCall}
        onCancel={handleCancelScheduledCall}
      />
    </div>
  );
};

export default VideoSection;
