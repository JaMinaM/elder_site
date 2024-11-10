"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CardContent } from "@/components/ui/card";
import { DraggableCard } from "@/components/DraggableCard";
import { MedicationCard } from "./MedicationCard";
import { EmergencyContactsCard } from "./EmergencyContactsCard";
import { AppointmentsCard } from "./AppointmentsCard";
import { Heart, Activity, ThermometerIcon, Wind } from "lucide-react";
import { SaveLayout } from "@/components/SaveLayout";

export const HealthSection = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [addModalType, setAddModalType] = useState("");

  const handleAddClick = (type) => {
    setAddModalType(type);
    setShowAddModal(true);
    console.log(`Opening ${type} modal`);
  };

  const renderComponent = (id: string) => {
    switch (id) {
      case "vital-signs":
        return (
          <CardContent className="p-6 dark:bg-gray-800 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold dark:text-white">
                Vital Signs
              </h2>
              <button
                onClick={() => handleAddClick("readings")}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-lg 
                  hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                  rounded px-2 transition-colors duration-200"
              >
                Update Readings
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "Heart Rate",
                  value: "72 bpm",
                  status: "normal",
                  icon: (
                    <Heart className="text-red-500 dark:text-red-400 fill-current" />
                  ),
                },
                {
                  label: "Blood Pressure",
                  value: "120/80",
                  status: "normal",
                  icon: (
                    <Activity className="text-blue-500 dark:text-blue-400" />
                  ),
                },
                {
                  label: "Temperature",
                  value: "98.6°F",
                  status: "normal",
                  icon: (
                    <ThermometerIcon className="text-orange-500 dark:text-orange-400" />
                  ),
                },
                {
                  label: "Oxygen Level",
                  value: "98%",
                  status: "normal",
                  icon: <Wind className="text-green-500 dark:text-green-400" />,
                },
              ].map((metric, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:shadow-md transition-all duration-200 
                    dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gray-100 rounded-full dark:bg-gray-800">
                      {metric.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {metric.label}
                      </p>
                      <p className="text-xl font-semibold dark:text-white">
                        {metric.value}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        Status: {metric.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        );
      case "medications":
        return (
          <div className="relative dark:bg-gray-800 rounded-lg">
            <MedicationCard />
            <button
              onClick={() => handleAddClick("medication")}
              className="absolute top-6 right-6 text-blue-600 dark:text-blue-400 hover:text-blue-800 
                dark:hover:text-blue-300 text-lg hover:underline focus:outline-none focus:ring-2 
                focus:ring-blue-500 dark:focus:ring-blue-400 rounded px-2 transition-colors duration-200"
            >
              Add Medication
            </button>
          </div>
        );
      case "appointments":
        return (
          <div className="relative dark:bg-gray-800 rounded-lg">
            <AppointmentsCard />
            <button
              onClick={() => handleAddClick("appointment")}
              className="absolute top-6 right-6 text-blue-600 dark:text-blue-400 hover:text-blue-800 
                dark:hover:text-blue-300 text-lg hover:underline focus:outline-none focus:ring-2 
                focus:ring-blue-500 dark:focus:ring-blue-400 rounded px-2 transition-colors duration-200"
            >
              Schedule New
            </button>
          </div>
        );
      case "emergency-contacts":
        return (
          <div className="relative dark:bg-gray-800 rounded-lg">
            <EmergencyContactsCard />
            <button
              onClick={() => handleAddClick("contact")}
              className="absolute top-6 right-6 text-blue-600 dark:text-blue-400 hover:text-blue-800 
                dark:hover:text-blue-300 text-lg hover:underline focus:outline-none focus:ring-2 
                focus:ring-blue-500 dark:focus:ring-blue-400 rounded px-2 transition-colors duration-200"
            >
              Add Contact
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  // Modal Content
  const renderModal = () => {
    if (!showAddModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 max-w-lg">
          <h3 className="text-xl font-semibold mb-4 dark:text-white">
            {addModalType === "readings" && "Update Vital Signs"}
            {addModalType === "medication" && "Add New Medication"}
            {addModalType === "appointment" && "Schedule Appointment"}
            {addModalType === "contact" && "Add Emergency Contact"}
          </h3>
          <div className="mb-6">
            {/* Add your form fields here based on modal type */}
            <p className="text-gray-600 dark:text-gray-300">
              Form fields will go here
            </p>
          </div>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 
                dark:hover:text-white transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                console.log(`Saving ${addModalType}`);
                setShowAddModal(false);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 
                focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                transition-colors duration-200"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {renderComponent("vital-signs")}
      {renderComponent("medications")}
      {renderComponent("appointments")}
      {renderComponent("emergency-contacts")}
      {renderModal()}
    </div>
  );
};
