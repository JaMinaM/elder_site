"use client";
import React, { useState } from "react";
import { Calendar, Clock, MapPin, User, Phone, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    doctorName: "",
    specialty: "",
    date: "",
    time: "",
    location: "",
    phoneNumber: "",
    notes: "",
    reminders: true,
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState("");

  const specialties = [
    "Primary Care",
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Dentistry",
    "Physical Therapy",
    "Other",
  ];

  const validateForm = () => {
    let newErrors = {};
    if (!formData.doctorName.trim()) {
      newErrors.doctorName = "Doctor name is required";
    }
    if (!formData.specialty) {
      newErrors.specialty = "Specialty is required";
    }
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    if (!formData.time) {
      newErrors.time = "Time is required";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ""))) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("");

    if (validateForm()) {
      try {
        // Here you would typically make an API call to save the appointment
        console.log("Submitting appointment:", formData);
        setSubmitStatus("success");
        // Reset form after successful submission
        setFormData({
          doctorName: "",
          specialty: "",
          date: "",
          time: "",
          location: "",
          phoneNumber: "",
          notes: "",
          reminders: true,
        });
      } catch (error) {
        console.error("Error submitting appointment:", error);
        setSubmitStatus("error");
      }
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-gray-800">
          Schedule New Appointment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Doctor Information */}
          <div className="space-y-4">
            <div className="relative">
              <label
                htmlFor="doctorName"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Doctor's Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="doctorName"
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.doctorName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Dr. John Smith"
                />
              </div>
              {errors.doctorName && (
                <p className="mt-1 text-red-500">{errors.doctorName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="specialty"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Specialty
              </label>
              <select
                id="specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleInputChange}
                className={`block w-full py-3 px-4 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.specialty ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select a specialty</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
              {errors.specialty && (
                <p className="mt-1 text-red-500">{errors.specialty}</p>
              )}
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="date"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.date ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.date && (
                <p className="mt-1 text-red-500">{errors.date}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="time"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Time
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.time ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.time && (
                <p className="mt-1 text-red-500">{errors.time}</p>
              )}
            </div>
          </div>

          {/* Location and Phone */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="location"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="123 Medical Center Dr."
                />
              </div>
              {errors.location && (
                <p className="mt-1 text-red-500">{errors.location}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="(555) 123-4567"
                />
              </div>
              {errors.phoneNumber && (
                <p className="mt-1 text-red-500">{errors.phoneNumber}</p>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label
              htmlFor="notes"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Notes
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={4}
                className="block w-full pl-10 pr-3 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
                placeholder="Add any additional notes or special instructions..."
              />
            </div>
          </div>

          {/* Reminders Toggle */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="reminders"
              name="reminders"
              checked={formData.reminders}
              onChange={handleInputChange}
              className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="reminders"
              className="text-lg font-medium text-gray-700"
            >
              Send me reminders about this appointment
            </label>
          </div>

          {/* Submit Button and Status */}
          <div className="space-y-4">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Schedule Appointment
            </button>

            {submitStatus === "success" && (
              <p className="text-green-600 text-center">
                Appointment scheduled successfully!
              </p>
            )}
            {submitStatus === "error" && (
              <p className="text-red-600 text-center">
                There was an error scheduling your appointment. Please try
                again.
              </p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AppointmentForm;