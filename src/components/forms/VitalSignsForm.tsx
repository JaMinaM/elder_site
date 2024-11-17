"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Clock,
  Calendar,
  Heart,
  Thermometer,
  Activity,
  Droplet,
  Weight,
  Stethoscope,
  Bell,
  AlertTriangle,
} from "lucide-react";
import {
  VitalSigns,
  VitalSignsFormProps,
  FormErrors,
  INITIAL_VITAL_SIGNS,
  VITAL_RANGES,
} from "./types";
import { validateVitalSigns } from "./validation";

const VitalSignsForm = ({
  onSubmit,
  initialData = null,
  isEditing = false,
}: VitalSignsFormProps) => {
  const [formData, setFormData] = useState<VitalSigns>(
    initialData || INITIAL_VITAL_SIGNS
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<string>("");
  const isDarkMode = document.documentElement.classList.contains("dark");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

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

    const validationErrors = validateVitalSigns(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await onSubmit(formData);
      setSubmitStatus("success");
      if (!isEditing) {
        setFormData(INITIAL_VITAL_SIGNS);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    }
  };

  const renderDateTimeFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Date Field */}
      <div className="relative">
        <label
          htmlFor="date"
          className={`block text-lg font-medium mb-2 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Date*
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar
              className={`h-5 w-5 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className={`block w-full pl-10 pr-3 py-3 text-lg rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.date
                ? "border-red-500"
                : isDarkMode
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            } transition-colors duration-200`}
          />
        </div>
        {errors.date && (
          <p className="mt-1 text-red-500 text-sm">{errors.date}</p>
        )}
      </div>
      {/* Time Field */}
      <div className="relative">
        <label
          htmlFor="time"
          className={`block text-lg font-medium mb-2 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Time*
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Clock
              className={`h-5 w-5 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            className={`block w-full pl-10 pr-3 py-3 text-lg rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.time
                ? "border-red-500"
                : isDarkMode
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            } transition-colors duration-200`}
          />
        </div>
        {errors.time && (
          <p className="mt-1 text-red-500 text-sm">{errors.time}</p>
        )}
      </div>
    </div>
  );
  const renderBloodPressureFields = () => (
    <div className="space-y-4">
      <h3
        className={`text-lg font-medium ${
          isDarkMode ? "text-gray-200" : "text-gray-700"
        }`}
      >
        Blood Pressure*
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Systolic Pressure */}
        <div className="relative">
          <label
            htmlFor="bloodPressureSystolic"
            className={`block text-sm font-medium mb-2 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Systolic (mmHg)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Activity
                className={`h-5 w-5 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
            </div>
            <input
              type="number"
              id="bloodPressureSystolic"
              name="bloodPressureSystolic"
              value={formData.bloodPressureSystolic}
              onChange={handleInputChange}
              className={`block w-full pl-10 pr-3 py-3 text-lg rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.bloodPressureSystolic
                  ? "border-red-500"
                  : isDarkMode
                  ? "border-gray-600 bg-gray-700 text-white"
                  : "border-gray-300 bg-white text-gray-900"
              } transition-colors duration-200`}
              placeholder="120"
            />
          </div>
          {errors.bloodPressureSystolic && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.bloodPressureSystolic}
            </p>
          )}
        </div>
        {/* Diastolic Pressure */}
        <div className="relative">
          <label
            htmlFor="bloodPressureDiastolic"
            className={`block text-sm font-medium mb-2 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Diastolic (mmHg)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Activity
                className={`h-5 w-5 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
            </div>
            <input
              type="number"
              id="bloodPressureDiastolic"
              name="bloodPressureDiastolic"
              value={formData.bloodPressureDiastolic}
              onChange={handleInputChange}
              className={`block w-full pl-10 pr-3 py-3 text-lg rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.bloodPressureDiastolic
                  ? "border-red-500"
                  : isDarkMode
                  ? "border-gray-600 bg-gray-700 text-white"
                  : "border-gray-300 bg-white text-gray-900"
              } transition-colors duration-200`}
              placeholder="80"
            />
          </div>
          {errors.bloodPressureDiastolic && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.bloodPressureDiastolic}
            </p>
          )}
        </div>
      </div>
    </div>
  );
  const renderCoreVitals = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Heart Rate */}
      <div className="relative">
        <label
          htmlFor="heartRate"
          className={`block text-lg font-medium mb-2 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Heart Rate (bpm)*
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Heart
              className={`h-5 w-5 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
          <input
            type="number"
            id="heartRate"
            name="heartRate"
            value={formData.heartRate}
            onChange={handleInputChange}
            className={`block w-full pl-10 pr-3 py-3 text-lg rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.heartRate
                ? "border-red-500"
                : isDarkMode
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            } transition-colors duration-200`}
            placeholder="72"
          />
        </div>
        {errors.heartRate && (
          <p className="mt-1 text-red-500 text-sm">{errors.heartRate}</p>
        )}
      </div>
      {/* const renderCoreVitals = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Heart Rate }
      <div className="relative">
        <label
          htmlFor="heartRate"
          className={`block text-lg font-medium mb-2 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Heart Rate (bpm)*
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Heart
              className={`h-5 w-5 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
          <input
            type="number"
            id="heartRate"
            name="heartRate"
            value={formData.heartRate}
            onChange={handleInputChange}
            className={`block w-full pl-10 pr-3 py-3 text-lg rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.heartRate
                ? "border-red-500"
                : isDarkMode
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            } transition-colors duration-200`}
            placeholder="72"
          />
        </div>
        {errors.heartRate && (
          <p className="mt-1 text-red-500 text-sm">{errors.heartRate}</p>
        )}
      </div> */}
      {/* Temperature */}
      <div className="relative">
        <label
          htmlFor="temperature"
          className={`block text-lg font-medium mb-2 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Temperature (°F)*
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Thermometer
              className={`h-5 w-5 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
          <input
            type="number"
            step="0.1"
            id="temperature"
            name="temperature"
            value={formData.temperature}
            onChange={handleInputChange}
            className={`block w-full pl-10 pr-3 py-3 text-lg rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.temperature
                ? "border-red-500"
                : isDarkMode
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            } transition-colors duration-200`}
            placeholder="98.6"
          />
        </div>
        {errors.temperature && (
          <p className="mt-1 text-red-500 text-sm">{errors.temperature}</p>
        )}
      </div>
      {/* Temperature */}
      <div className="relative">
        <label
          htmlFor="temperature"
          className={`block text-lg font-medium mb-2 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Temperature (°F)*
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Thermometer
              className={`h-5 w-5 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
          <input
            type="number"
            step="0.1"
            id="temperature"
            name="temperature"
            value={formData.temperature}
            onChange={handleInputChange}
            className={`block w-full pl-10 pr-3 py-3 text-lg rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.temperature
                ? "border-red-500"
                : isDarkMode
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            } transition-colors duration-200`}
            placeholder="98.6"
          />
        </div>
        {errors.temperature && (
          <p className="mt-1 text-red-500 text-sm">{errors.temperature}</p>
        )}
      </div>
      {/* Oxygen Level */}
      <div className="relative">
        <label
          htmlFor="oxygenLevel"
          className={`block text-lg font-medium mb-2 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Oxygen Level (%)*
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Droplet
              className={`h-5 w-5 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
          <input
            type="number"
            id="oxygenLevel"
            name="oxygenLevel"
            value={formData.oxygenLevel}
            onChange={handleInputChange}
            className={`block w-full pl-10 pr-3 py-3 text-lg rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.oxygenLevel
                ? "border-red-500"
                : isDarkMode
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            } transition-colors duration-200`}
            placeholder="98"
          />
        </div>
        {errors.oxygenLevel && (
          <p className="mt-1 text-red-500 text-sm">{errors.oxygenLevel}</p>
        )}
      </div>
    </div>
  );
  const renderOptionalMeasurements = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Glucose Level */}
      <div className="relative">
        <label
          htmlFor="glucoseLevel"
          className={`block text-lg font-medium mb-2 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Glucose Level (mg/dL)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Droplet
              className={`h-5 w-5 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
          <input
            type="number"
            id="glucoseLevel"
            name="glucoseLevel"
            value={formData.glucoseLevel}
            onChange={handleInputChange}
            className={`block w-full pl-10 pr-3 py-3 text-lg rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.glucoseLevel
                ? "border-red-500"
                : isDarkMode
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            } transition-colors duration-200`}
            placeholder="100"
          />
        </div>
        {errors.glucoseLevel && (
          <p className="mt-1 text-red-500 text-sm">{errors.glucoseLevel}</p>
        )}
      </div>
      {/* Weight */}
      <div className="relative">
        <label
          htmlFor="weight"
          className={`block text-lg font-medium mb-2 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Weight (lbs)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Weight
              className={`h-5 w-5 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            className={`block w-full pl-10 pr-3 py-3 text-lg rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.weight
                ? "border-red-500"
                : isDarkMode
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            } transition-colors duration-200`}
            placeholder="150"
          />
        </div>
        {errors.weight && (
          <p className="mt-1 text-red-500 text-sm">{errors.weight}</p>
        )}
      </div>
    </div>
  );
  const renderAdditionalInfo = () => (
    <div className="space-y-4">
      {/* Taken By Field */}
      <div className="relative">
        <label
          htmlFor="takenBy"
          className={`block text-lg font-medium mb-2 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Taken By
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Stethoscope
              className={`h-5 w-5 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
          <input
            type="text"
            id="takenBy"
            name="takenBy"
            value={formData.takenBy}
            onChange={handleInputChange}
            className={`block w-full pl-10 pr-3 py-3 text-lg rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.takenBy
                ? "border-red-500"
                : isDarkMode
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            } transition-colors duration-200`}
            placeholder="Name of person taking measurements"
          />
        </div>
      </div>
      {/* Device Used Field */}
      <div className="relative">
        <label
          htmlFor="deviceUsed"
          className={`block text-lg font-medium mb-2 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Device Used
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Activity
              className={`h-5 w-5 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
          <input
            type="text"
            id="deviceUsed"
            name="deviceUsed"
            value={formData.deviceUsed}
            onChange={handleInputChange}
            className={`block w-full pl-10 pr-3 py-3 text-lg rounded-lg focus:ring-2 focus:ring-blue-500 ${
              isDarkMode
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            } transition-colors duration-200`}
            placeholder="Device or equipment used"
          />
        </div>
      </div>
      {/* Notes Field */}
      <div className="relative">
        <label
          htmlFor="notes"
          className={`block text-lg font-medium mb-2 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows={3}
          className={`block w-full px-3 py-2 text-lg rounded-lg focus:ring-2 focus:ring-blue-500 ${
            isDarkMode
              ? "border-gray-600 bg-gray-700 text-white"
              : "border-gray-300 bg-white text-gray-900"
          } transition-colors duration-200`}
          placeholder="Additional notes or observations"
        />
      </div>
    </div>
  );
  const renderAlertSettings = () => (
    <div
      className={`p-4 rounded-lg border ${
        isDarkMode
          ? "bg-gray-800 border-gray-700"
          : "bg-gray-50 border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Bell
            className={`h-5 w-5 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          />
          <label
            htmlFor="alerts"
            className={`text-lg ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Enable Alerts
          </label>
        </div>
        <input
          type="checkbox"
          id="alerts"
          name="alerts"
          checked={formData.alerts}
          onChange={handleInputChange}
          className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
      </div>
      {formData.alerts && (
        <div className="mt-4 pl-4 border-l-2 border-blue-500">
          <div
            className={`flex items-center ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <AlertTriangle className="h-5 w-5 mr-2" />
            <span>
              You will be notified if readings fall outside normal ranges
            </span>
          </div>
        </div>
      )}
    </div>
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
          {isEditing ? "Edit Vital Signs" : "Record Vital Signs"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Form Sections */}
          <div className="space-y-8">
            {renderDateTimeFields()}
            {renderBloodPressureFields()}
            {renderCoreVitals()}

            {/* Optional Measurements Section */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3
                className={`text-lg font-medium mb-4 ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Additional Measurements
              </h3>
              {renderOptionalMeasurements()}
            </div>

            {/* Additional Information Section */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              {renderAdditionalInfo()}
            </div>

            {/* Alert Settings Section */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              {renderAlertSettings()}
            </div>
          </div>
          {/* Submit Button and Status */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-4">
              <button
                type="submit"
                className={`w-full flex justify-center py-3 px-4 border border-transparent 
                rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-blue-500 ${
                  isDarkMode ? "focus:ring-offset-gray-800" : ""
                } 
                transition-colors duration-200`}
              >
                {isEditing ? "Update Vital Signs" : "Record Vital Signs"}
              </button>

              {/* Success Message */}
              {submitStatus === "success" && (
                <div className="flex items-center justify-center p-4 rounded-lg bg-green-50 dark:bg-green-900">
                  <p
                    className={`text-center ${
                      isDarkMode ? "text-green-200" : "text-green-800"
                    }`}
                  >
                    Vital signs successfully{" "}
                    {isEditing ? "updated" : "recorded"}!
                  </p>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === "error" && (
                <div className="flex items-center justify-center p-4 rounded-lg bg-red-50 dark:bg-red-900">
                  <p
                    className={`text-center ${
                      isDarkMode ? "text-red-200" : "text-red-800"
                    }`}
                  >
                    There was an error. Please try again.
                  </p>
                </div>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default VitalSignsForm;
