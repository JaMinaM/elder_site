import { EmergencyContact, FormErrors, Appointment, VitalSigns, VITAL_RANGES } from "./types";

export const validateEmergencyContact = (
  data: EmergencyContact
): FormErrors => {
  const errors: FormErrors = {};

  // Name validation
  if (!data.name.trim()) {
    errors.name = "Contact name is required";
  } else if (data.name.length < 2) {
    errors.name = "Name must be at least 2 characters long";
  }

  // Relationship validation
  if (!data.relationship) {
    errors.relationship = "Relationship is required";
  }

  // Phone validation
  if (!data.primaryPhone) {
    errors.primaryPhone = "Primary phone number is required";
  } else if (
    !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
      data.primaryPhone
    )
  ) {
    errors.primaryPhone = "Please enter a valid phone number";
  }

  // Secondary phone validation (optional but must be valid if provided)
  if (
    data.secondaryPhone &&
    !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
      data.secondaryPhone
    )
  ) {
    errors.secondaryPhone = "Please enter a valid phone number";
  }

  // Email validation (optional but must be valid if provided)
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Priority validation
  if (!data.priority) {
    errors.priority = "Please select a priority level";
  }

  return errors;
};

export const validateAppointment = (data: Appointment): FormErrors => {
  const errors: FormErrors = {};

  // Doctor Name validation
  if (!data.doctorName.trim()) {
    errors.doctorName = "Doctor name is required";
  }

  // Specialty validation
  if (!data.specialty) {
    errors.specialty = "Specialty is required";
  }

  // Date validation
  if (!data.date) {
    errors.date = "Date is required";
  } else {
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      errors.date = "Date cannot be in the past";
    }
  }

  // Time validation
  if (!data.time) {
    errors.time = "Time is required";
  }

  // Location validation
  if (!data.location.trim()) {
    errors.location = "Location is required";
  }

  // Phone Number validation
  if (!data.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required";
  } else {
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneRegex.test(data.phoneNumber)) {
      errors.phoneNumber = "Please enter a valid phone number";
    }
  }

  return errors;
};

export const validateVitalSigns = (data: VitalSigns): FormErrors => {
  const errors: FormErrors = {};

  // Date and Time validation
  if (!data.date) {
    errors.date = "Date is required";
  }
  if (!data.time) {
    errors.time = "Time is required";
  }

  // Blood Pressure validation
  const systolic = parseFloat(data.bloodPressureSystolic);
  if (!data.bloodPressureSystolic) {
    errors.bloodPressureSystolic = "Systolic pressure is required";
  } else if (isNaN(systolic) || systolic < VITAL_RANGES.bloodPressureSystolic.min || systolic > VITAL_RANGES.bloodPressureSystolic.max) {
    errors.bloodPressureSystolic = `Systolic pressure should be between ${VITAL_RANGES.bloodPressureSystolic.min} and ${VITAL_RANGES.bloodPressureSystolic.max} ${VITAL_RANGES.bloodPressureSystolic.unit}`;
  }

  const diastolic = parseFloat(data.bloodPressureDiastolic);
  if (!data.bloodPressureDiastolic) {
    errors.bloodPressureDiastolic = "Diastolic pressure is required";
  } else if (isNaN(diastolic) || diastolic < VITAL_RANGES.bloodPressureDiastolic.min || diastolic > VITAL_RANGES.bloodPressureDiastolic.max) {
    errors.bloodPressureDiastolic = `Diastolic pressure should be between ${VITAL_RANGES.bloodPressureDiastolic.min} and ${VITAL_RANGES.bloodPressureDiastolic.max} ${VITAL_RANGES.bloodPressureDiastolic.unit}`;
  }

  // Heart Rate validation
  const heartRate = parseFloat(data.heartRate);
  if (!data.heartRate) {
    errors.heartRate = "Heart rate is required";
  } else if (isNaN(heartRate) || heartRate < VITAL_RANGES.heartRate.min || heartRate > VITAL_RANGES.heartRate.max) {
    errors.heartRate = `Heart rate should be between ${VITAL_RANGES.heartRate.min} and ${VITAL_RANGES.heartRate.max} ${VITAL_RANGES.heartRate.unit}`;
  }

  // Temperature validation
  const temp = parseFloat(data.temperature);
  if (!data.temperature) {
    errors.temperature = "Temperature is required";
  } else if (isNaN(temp) || temp < VITAL_RANGES.temperature.min || temp > VITAL_RANGES.temperature.max) {
    errors.temperature = `Temperature should be between ${VITAL_RANGES.temperature.min} and ${VITAL_RANGES.temperature.max} ${VITAL_RANGES.temperature.unit}`;
  }

  // Oxygen Level validation
  const oxygen = parseFloat(data.oxygenLevel);
  if (!data.oxygenLevel) {
    errors.oxygenLevel = "Oxygen level is required";
  } else if (isNaN(oxygen) || oxygen < VITAL_RANGES.oxygenLevel.min || oxygen > VITAL_RANGES.oxygenLevel.max) {
    errors.oxygenLevel = `Oxygen level should be between ${VITAL_RANGES.oxygenLevel.min} and ${VITAL_RANGES.oxygenLevel.max} ${VITAL_RANGES.oxygenLevel.unit}`;
  }

  // Optional Glucose Level validation
  if (data.glucoseLevel) {
    const glucose = parseFloat(data.glucoseLevel);
    if (isNaN(glucose) || glucose < VITAL_RANGES.glucoseLevel.min || glucose > VITAL_RANGES.glucoseLevel.max) {
      errors.glucoseLevel = `Glucose level should be between ${VITAL_RANGES.glucoseLevel.min} and ${VITAL_RANGES.glucoseLevel.max} ${VITAL_RANGES.glucoseLevel.unit}`;
    }
  }

  return errors;
};

export const validateMedication = (data: Medication): FormErrors => {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Medication name is required";
  }

  if (!data.dosage.trim()) {
    errors.dosage = "Dosage is required";
  }

  if (!data.frequency.trim()) {
    errors.frequency = "Frequency is required";
  }

  if (data.timeOfDay.length === 0) {
    errors.timeOfDay = "Please select at least one time of day";
  }

  if (!data.startDate) {
    errors.startDate = "Start date is required";
  }

  if (!data.prescribedBy.trim()) {
    errors.prescribedBy = "Prescribing doctor is required";
  }

  if (data.startDate && data.endDate) {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    if (end < start) {
      errors.endDate = "End date cannot be before start date";
    }
  }

  if (!data.instructions.trim()) {
    errors.instructions = "Instructions are required";
  }

  return errors;
};
