"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User,
  Heart,
  Phone,
  Mail,
  MapPin,
  Shield,
  AlertCircle,
} from "lucide-react";
import {
  EmergencyContact,
  EmergencyContactFormProps,
  FormErrors,
  INITIAL_FORM_STATE,
  RELATIONSHIP_OPTIONS,
  CONTACT_PRIORITY_OPTIONS,
} from "./types";
import { validateEmergencyContact } from "./validation";

const EmergencyContactForm = ({
  onSubmit,
  initialData,
  isEditing = false,
}: EmergencyContactFormProps) => {
  const [formData, setFormData] = useState<EmergencyContact>(
    initialData || INITIAL_FORM_STATE
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
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("");

    const validationErrors = validateEmergencyContact(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await onSubmit(formData);
      setSubmitStatus("success");
      if (!isEditing) {
        setFormData(INITIAL_FORM_STATE);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    }
  };

  const renderBasicContactFields = () => (
    <div className="space-y-4">
      {/* Name Field */}
      <div className="relative">
        <label
          htmlFor="name"
          className={`block text-lg font-medium mb-2 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Contact Name*
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User
              className={`h-5 w-5 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`block w-full pl-10 pr-3 py-3 text-lg rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.name
                ? "border-red-500"
                : isDarkMode
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            } transition-colors duration-200`}
            placeholder="Full Name"
          />
        </div>
        {errors.name && (
          <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
        )}
      </div>
      {/* Relationship Field */}
      <div className="relative">
        <label
          htmlFor="relationship"
          className={`block text-lg font-medium mb-2 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Relationship*
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Heart
              className={`h-5 w-5 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
          <select
            id="relationship"
            name="relationship"
            value={formData.relationship}
            onChange={handleInputChange}
            className={`block w-full pl-10 pr-3 py-3 text-lg rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.relationship
                ? "border-red-500"
                : isDarkMode
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            } transition-colors duration-200`}
          >
            <option value="">Select Relationship</option>
            {RELATIONSHIP_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        {errors.relationship && (
          <p className="mt-1 text-red-500 text-sm">{errors.relationship}</p>
        )}
      </div>

      {/* Primary Phone Field */}
      <div className="relative">
        <label
          htmlFor="primaryPhone"
          className={`block text-lg font-medium mb-2 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Primary Phone*
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone
              className={`h-5 w-5 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
          <input
            type="tel"
            id="primaryPhone"
            name="primaryPhone"
            value={formData.primaryPhone}
            onChange={handleInputChange}
            className={`block w-full pl-10 pr-3 py-3 text-lg rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.primaryPhone
                ? "border-red-500"
                : isDarkMode
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            } transition-colors duration-200`}
            placeholder="(555) 123-4567"
          />
        </div>
        {errors.primaryPhone && (
          <p className="mt-1 text-red-500 text-sm">{errors.primaryPhone}</p>
        )}
      </div>
    </div>
  );
  const renderAdditionalContactFields = () => (
    <div className="space-y-4">
      {/* Secondary Phone Field */}
      <div className="relative">
        <label
          htmlFor="secondaryPhone"
          className={`block text-lg font-medium mb-2 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Alternative Phone
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone
              className={`h-5 w-5 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
          <input
            type="tel"
            id="secondaryPhone"
            name="secondaryPhone"
            value={formData.secondaryPhone}
            onChange={handleInputChange}
            className={`block w-full pl-10 pr-3 py-3 text-lg rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.secondaryPhone
                ? "border-red-500"
                : isDarkMode
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            } transition-colors duration-200`}
            placeholder="(555) 123-4567"
          />
        </div>
        {errors.secondaryPhone && (
          <p className="mt-1 text-red-500 text-sm">{errors.secondaryPhone}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="relative">
        <label
          htmlFor="email"
          className={`block text-lg font-medium mb-2 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail
              className={`h-5 w-5 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`block w-full pl-10 pr-3 py-3 text-lg rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.email
                ? "border-red-500"
                : isDarkMode
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            } transition-colors duration-200`}
            placeholder="email@example.com"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
        )}
      </div>
      {/* const renderAdditionalContactFields = () => (
    <div className="space-y-4">
      {/* Secondary Phone Field }
      <div className="relative">
        <label
          htmlFor="secondaryPhone"
          className={`block text-lg font-medium mb-2 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Alternative Phone
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone
              className={`h-5 w-5 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
          <input
            type="tel"
            id="secondaryPhone"
            name="secondaryPhone"
            value={formData.secondaryPhone}
            onChange={handleInputChange}
            className={`block w-full pl-10 pr-3 py-3 text-lg rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.secondaryPhone
                ? "border-red-500"
                : isDarkMode
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            } transition-colors duration-200`}
            placeholder="(555) 123-4567"
          />
        </div>
        {errors.secondaryPhone && (
          <p className="mt-1 text-red-500 text-sm">{errors.secondaryPhone}</p>
        )}
      </div>
      {/* Email Field */}
      <div className="relative">
        <label
          htmlFor="email"
          className={`block text-lg font-medium mb-2 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail
              className={`h-5 w-5 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`block w-full pl-10 pr-3 py-3 text-lg rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.email
                ? "border-red-500"
                : isDarkMode
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            } transition-colors duration-200`}
            placeholder="email@example.com"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
        )}
      </div>

      {/* Address Field */}
      <div className="relative">
        <label
          htmlFor="address"
          className={`block text-lg font-medium mb-2 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin
              className={`h-5 w-5 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows={3}
            className={`block w-full pl-10 pr-3 py-3 text-lg rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.address
                ? "border-red-500"
                : isDarkMode
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            } transition-colors duration-200`}
            placeholder="Full address"
          />
        </div>
        {errors.address && (
          <p className="mt-1 text-red-500 text-sm">{errors.address}</p>
        )}
      </div>
    </div>
  );
  const renderPrioritySection = () => (
    <div className="space-y-4">
      <label
        className={`block text-lg font-medium mb-2 ${
          isDarkMode ? "text-gray-200" : "text-gray-700"
        }`}
      >
        Contact Priority*
      </label>
      <div className="space-y-3">
        {CONTACT_PRIORITY_OPTIONS.map((option) => (
          <div
            key={option.value}
            className="flex items-center space-x-3 p-3 rounded-lg border transition-colors duration-200"
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
            <div className="flex items-center space-x-2">
              <AlertCircle
                className={`h-5 w-5 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <label
                htmlFor={option.value}
                className={`text-lg ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {option.label}
              </label>
            </div>
          </div>
        ))}
      </div>
      {errors.priority && (
        <p className="mt-1 text-red-500 text-sm">{errors.priority}</p>
      )}
    </div>
  );
  const renderPermissionsSection = () => (
    <div
      className={`p-4 rounded-lg border ${
        isDarkMode
          ? "bg-gray-800 border-gray-700"
          : "bg-gray-50 border-gray-200"
      }`}
    >
      <div className="flex items-center space-x-3">
        <Shield
          className={`h-6 w-6 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        />
        <div className="flex flex-col">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="canMakeDecisions"
              name="canMakeDecisions"
              checked={formData.canMakeDecisions}
              onChange={handleInputChange}
              className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="canMakeDecisions"
              className={`text-lg font-medium ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Medical Decision Authority
            </label>
          </div>
          <p
            className={`mt-1 text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Check this box if this contact has authority to make medical
            decisions on your behalf
          </p>
        </div>
      </div>
    </div>
  );
  return (
    <Card
      className={`w-full max-w-2xl mx-auto ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white"
      }`}
    >
      <CardHeader>
        <CardTitle
          className={`text-2xl font-bold text-center ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {isEditing ? "Edit Emergency Contact" : "Add Emergency Contact"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderBasicContactFields()}
          {renderAdditionalContactFields()}
          {renderPrioritySection()}
          {renderPermissionsSection()}
          <div className="space-y-4">
            <button
              type="submit"
              className={`w-full flex justify-center py-3 px-4 border border-transparent 
                  shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                  ${isDarkMode ? "focus:ring-offset-gray-800" : ""} 
                  transition-colors duration-200`}
            >
              {isEditing ? "Update Contact" : "Add Contact"}
            </button>

            {submitStatus === "success" && (
              <p className="text-green-500 text-center">
                Contact {isEditing ? "updated" : "added"} successfully!
              </p>
            )}
            {submitStatus === "error" && (
              <p className="text-red-500 text-center">
                There was an error. Please try again.
              </p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EmergencyContactForm;
