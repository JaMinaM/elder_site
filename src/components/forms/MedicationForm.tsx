"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pill,
  Clock,
  Calendar,
  User,
  Phone,
  FileText,
  Bell,
  AlertCircle,
  Building2,
  AlertTriangle,
  AlertOctagon,
  Smartphone,
  RefreshCcw,
} from "lucide-react";
import {
  Medication,
  MedicationFormProps,
  FormErrors,
  INITIAL_MEDICATION_STATE,
  TIME_OPTIONS,
  MEDICATION_PRIORITY_OPTIONS,
} from "./types";
import { validateMedication } from "./validation";

const MedicationForm: React.FC<MedicationFormProps> = ({
  onSubmit,
  initialData,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<Medication>(
    initialData || INITIAL_MEDICATION_STATE
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState("");
  const isDarkMode = document.documentElement.classList.contains("dark");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === "checkbox") {
      if (name === "timeOfDay" || name === "reminderDays") {
        setFormData((prev) => ({
          ...prev,
          [name]: checked
            ? [...(prev[name as keyof Medication] as string[]), value]
            : (prev[name as keyof Medication] as string[]).filter(
                (item) => item !== value
              ),
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: checked,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("");

    const validationErrors = validateMedication(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await onSubmit(formData);
      setSubmitStatus("success");
      if (!isEditing) {
        setFormData(INITIAL_MEDICATION_STATE);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    }
  };

  const renderBasicFields = () => (
    <div className="space-y-4">{/* Form fields implementation */}</div>
  );

  const renderTimeOfDay = () => (
    <div className="relative">{/* Time of day implementation */}</div>
  );

  const renderDateFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Date fields implementation */}
    </div>
  );

  const renderPrescriptionInfo = () => (
    <div className="space-y-4">{/* Prescription info implementation */}</div>
  );

  const renderInstructions = () => (
    <div className="space-y-4">{/* Instructions implementation */}</div>
  );

  const renderPrioritySection = () => {
    return (
      <div className="space-y-4">
        <label
          className={`block text-lg font-medium mb-2 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Priority Level*
        </label>
        <div className="space-y-3">
          {MEDICATION_PRIORITY_OPTIONS.map((option) => (
            <div
              key={option.value}
              className={`flex items-center space-x-3 p-4 rounded-lg border transition-all duration-200 
                ${
                  formData.priority === option.value
                    ? `${option.borderClass} ${option.darkBorderClass}`
                    : isDarkMode
                    ? "border-gray-700"
                    : "border-gray-200"
                }`}
            >
              <input
                type="radio"
                id={option.value}
                name="priority"
                value={option.value}
                checked={formData.priority === option.value}
                onChange={handleInputChange}
                className="w-6 h-6 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className={`h-5 w-5 ${option.colorClass}`} />
                  <label
                    htmlFor={option.value}
                    className={`text-lg font-medium ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    {option.label}
                  </label>
                </div>
                <p
                  className={`mt-1 text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {option.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderReminderSettings = () => (
    <div className="space-y-4">{/* Reminder settings implementation */}</div>
  );

  return (
    <Card
      className={`w-full max-w-4xl mx-auto ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white"
      }`}
    >
      <CardHeader>
        <CardTitle
          className={`text-2xl font-bold text-center ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {isEditing ? "Edit Medication" : "Add New Medication"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              {renderBasicFields()}
              {renderTimeOfDay()}
              {renderDateFields()}
            </div>
            <div className="space-y-8">
              {renderPrescriptionInfo()}
              {renderInstructions()}
              {renderPrioritySection()}
            </div>
          </div>
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            {renderReminderSettings()}
          </div>
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-4">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                {isEditing ? "Update Medication" : "Add Medication"}
              </button>
              {submitStatus === "success" && (
                <p className="text-green-600 text-center">
                  Medication successfully {isEditing ? "updated" : "added"}!
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-600 text-center">
                  There was an error. Please try again.
                </p>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MedicationForm;
