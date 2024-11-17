"use client";

// Common Types
export interface FormErrors {
  [key: string]: string;
}

// Emergency Contact Types
export interface EmergencyContact {
  id?: string;
  name: string;
  relationship: string;
  primaryPhone: string;
  secondaryPhone?: string;
  email?: string;
  address?: string;
  priority: "Primary" | "Secondary" | "Tertiary";
  notes?: string;
  canMakeDecisions: boolean;
}

export interface EmergencyContactFormProps {
  onSubmit: (contact: EmergencyContact) => void;
  initialData?: EmergencyContact;
  isEditing?: boolean;
}

export const RELATIONSHIP_OPTIONS = [
  "Spouse",
  "Child",
  "Parent",
  "Sibling",
  "Friend",
  "Neighbor",
  "Caregiver",
  "Doctor",
  "Other",
] as const;

export const CONTACT_PRIORITY_OPTIONS = [
  { value: "Primary", label: "Primary Contact (First to Call)" },
  { value: "Secondary", label: "Secondary Contact (Second to Call)" },
  { value: "Tertiary", label: "Tertiary Contact (Third to Call)" },
] as const;

export const INITIAL_FORM_STATE: EmergencyContact = {
  name: "",
  relationship: "",
  primaryPhone: "",
  secondaryPhone: "",
  email: "",
  address: "",
  priority: "Primary",
  notes: "",
  canMakeDecisions: false,
};

// Vital Signs Types
export interface VitalSigns {
  id?: string;
  date: string;
  time: string;
  bloodPressureSystolic: string;
  bloodPressureDiastolic: string;
  heartRate: string;
  temperature: string;
  oxygenLevel: string;
  glucoseLevel?: string;
  weight?: string;
  notes?: string;
  takenBy?: string;
  deviceUsed?: string;
  alerts?: boolean;
}

export interface VitalSignsFormProps {
  onSubmit: (vitalSigns: VitalSigns) => void;
  initialData?: VitalSigns | null;
  isEditing?: boolean;
}

export const INITIAL_VITAL_SIGNS: VitalSigns = {
  date: new Date().toISOString().split("T")[0],
  time: new Date().toTimeString().split(" ")[0].slice(0, 5),
  bloodPressureSystolic: "",
  bloodPressureDiastolic: "",
  heartRate: "",
  temperature: "",
  oxygenLevel: "",
  glucoseLevel: "",
  weight: "",
  notes: "",
  takenBy: "",
  deviceUsed: "",
  alerts: true,
};

export const VITAL_RANGES = {
  bloodPressureSystolic: { min: 90, max: 140, unit: "mmHg" },
  bloodPressureDiastolic: { min: 60, max: 90, unit: "mmHg" },
  heartRate: { min: 60, max: 100, unit: "bpm" },
  temperature: { min: 97, max: 99, unit: "°F" },
  oxygenLevel: { min: 95, max: 100, unit: "%" },
  glucoseLevel: { min: 70, max: 140, unit: "mg/dL" },
} as const;

// Add to existing types.ts file
export interface Appointment {
  id?: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  phoneNumber: string;
  notes: string;
  reminders: boolean;
}

export interface AppointmentFormProps {
  onSubmit: (appointment: Appointment) => void;
  initialData?: Appointment;
  isEditing?: boolean;
}

export const INITIAL_APPOINTMENT_STATE: Appointment = {
  doctorName: "",
  specialty: "",
  date: "",
  time: "",
  location: "",
  phoneNumber: "",
  notes: "",
  reminders: true,
};

export const SPECIALTIES = [
  "Primary Care",
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Dentistry",
  "Physical Therapy",
  "Other",
] as const;

// Add to existing types.ts file
export interface Medication {
  id?: string;
  name: string;
  dosage: string;
  frequency: string;
  timeOfDay: string[];
  startDate: string;
  endDate?: string;
  instructions: string;
  sideEffects?: string;
  prescribedBy: string;
  pharmacy?: string;
  refillDate?: string;
  notifications: boolean;
  priority: "High" | "Medium" | "Low";
  reminderTime?: string;
  reminderDays?: string[];
  refillReminders?: boolean;
  missedDoseAlerts?: boolean;
  devicePreference?: "all" | "mobile" | "desktop";
}

export interface MedicationFormProps {
  onSubmit: (medication: Medication) => void;
  initialData?: Medication;
  isEditing?: boolean;
}

export const TIME_OPTIONS = [
  "Morning",
  "Afternoon",
  "Evening",
  "Bedtime",
  "With meals",
  "Before meals",
  "After meals",
] as const;

export const MEDICATION_PRIORITY_OPTIONS = [
  {
    value: "High",
    label: "High Priority",
    description: "Critical medication that must be taken on schedule",
    colorClass: "text-red-500",
    borderClass: "border-red-200",
    darkBorderClass: "dark:border-red-800",
  },
  {
    value: "Medium",
    label: "Medium Priority",
    description: "Important medication with some flexibility in timing",
    colorClass: "text-yellow-500",
    borderClass: "border-yellow-200",
    darkBorderClass: "dark:border-yellow-800",
  },
  {
    value: "Low",
    label: "Low Priority",
    description: "Supplemental or as-needed medication",
    colorClass: "text-blue-500",
    borderClass: "border-blue-200",
    darkBorderClass: "dark:border-blue-800",
  },
] as const;

export const INITIAL_MEDICATION_STATE: Medication = {
  name: "",
  dosage: "",
  frequency: "",
  timeOfDay: [],
  startDate: "",
  endDate: "",
  instructions: "",
  sideEffects: "",
  prescribedBy: "",
  pharmacy: "",
  refillDate: "",
  notifications: true,
  priority: "Medium",
  reminderTime: "",
  reminderDays: [],
  refillReminders: false,
  missedDoseAlerts: false,
  devicePreference: "all",
};
