export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  relationship: string;
  isEmergency?: boolean;
  isFavorite?: boolean;
  lastCall?: Date;
  status: "online" | "offline" | "busy" | "away";
  phone?: string;
}

export interface Call {
  id: string;
  contactId: string;
  contactName: string;
  contactAvatar?: string;
  timestamp: Date;
  duration: number;
  type: "outgoing" | "incoming" | "missed";
  isEmergency?: boolean;
  notes?: string;
}

export interface ScheduledCall {
  id: string;
  contactId: string;
  contactName: string;
  date: Date;
  time: string;
  duration?: number;
  recurring?: boolean;
  reminderSet?: boolean;
  notes?: string;
}

export interface VideoCallCardProps {
  onCall: (contactId: string) => void;
  onSchedule: (contactId: string) => void;
}

export interface EmergencyContactsCardProps {
  contacts: Contact[];
  onCall: (contactId: string) => void;
}

export interface RecentCallsCardProps {
  calls: Call[];
  onCallBack: (contactId: string) => void;
}

export interface FavoriteContactsCardProps {
  contacts: Contact[];
  onCall: (contactId: string) => void;
  onToggleFavorite: (contactId: string) => void;
}

export interface QuickDialCardProps {
  contacts: Contact[];
  onCall: (contactId: string) => void;
}

export interface CallSchedulerCardProps {
  contacts: Contact[];
  scheduledCalls: ScheduledCall[];
  onSchedule: (call: Omit<ScheduledCall, "id">) => void;
  onCancel: (callId: string) => void;
}
