"use client";

import React, { useState } from "react";
import { Heart, Activity, ThermometerIcon, Wind } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { DraggableSection } from "@/components/dnd/DraggableSection";
import { MedicationCard } from "./MedicationCard";
import { EmergencyContactsCard } from "./EmergencyContactsCard";
import { AppointmentsCard } from "./AppointmentsCard";
import { SaveLayout } from "@/components/SaveLayout";
import { useLayoutState } from "@/hooks/useLayoutState";
import MedicationForm from "@/components/forms/MedicationForm";
import AppointmentForm from "@/components/forms/AppointmentForm";
import EmergencyContactForm from "@/components/forms/EmergencyContactForm";
import VitalSignsForm from "@/components/forms/VitalSignsForm";
import { ModalForm } from "@/components/forms/ModalForm";

export const HealthSection = () => {
  const { dashboardCards, setDashboardCards, isEditMode, setIsEditMode } =
    useLayoutState();

  const [showMedicationForm, setShowMedicationForm] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showVitalSignsForm, setShowVitalSignsForm] = useState(false);

  const handleAddClick = (type: string) => {
    switch (type) {
      case "medication":
        setShowMedicationForm(true);
        break;
      case "appointment":
        setShowAppointmentForm(true);
        break;
      case "contact":
        setShowContactForm(true);
        break;
      case "readings":
        setShowVitalSignsForm(true);
        break;
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = dashboardCards.findIndex(
        (card) => card.id === active.id
      );
      const newIndex = dashboardCards.findIndex((card) => card.id === over.id);
      const newOrder = arrayMove(dashboardCards, oldIndex, newIndex);
      setDashboardCards(newOrder);
      localStorage.setItem("healthSectionOrder", JSON.stringify(newOrder));
    }
  };

  const handleSaveLayout = () => {
    localStorage.setItem("healthSectionOrder", JSON.stringify(dashboardCards));
    setIsEditMode(false);
  };

  return (
    <div className="space-y-6">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={dashboardCards.map((card) => card.id)}
          strategy={verticalListSortingStrategy}
        >
          {dashboardCards.map((section) => (
            <DraggableSection key={section.id} id={section.id}>
              <div className="relative dark:bg-gray-800 rounded-lg">
                {section.id === "vital-signs" && (
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-semibold dark:text-white">
                        Vital Signs
                      </h2>
                      <button
                        onClick={() => handleAddClick("readings")}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Update Readings
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                          icon: (
                            <Wind className="text-green-500 dark:text-green-400" />
                          ),
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
                )}
                {section.id === "medications" && (
                  <div>
                    <MedicationCard />
                    <button
                      onClick={() => handleAddClick("medication")}
                      className="absolute top-6 right-6 text-blue-600 dark:text-blue-400 hover:text-blue-800"
                    >
                      Add Medication
                    </button>
                  </div>
                )}

                {section.id === "appointments" && (
                  <div>
                    <AppointmentsCard />
                    <button
                      onClick={() => handleAddClick("appointment")}
                      className="absolute top-6 right-6 text-blue-600 dark:text-blue-400 hover:text-blue-800"
                    >
                      Schedule New
                    </button>
                  </div>
                )}

                {section.id === "emergency-contacts" && (
                  <div>
                    <EmergencyContactsCard />
                    <button
                      onClick={() => handleAddClick("contact")}
                      className="absolute top-6 right-6 text-blue-600 dark:text-blue-400 hover:text-blue-800"
                    ></button>
                  </div>
                )}
              </div>
            </DraggableSection>
          ))}
        </SortableContext>
      </DndContext>

      {isEditMode && <SaveLayout onSave={handleSaveLayout} className="z-50" />}

      {/* Standardized Modal Forms */}
      {showVitalSignsForm && (
        <ModalForm
          isOpen={showVitalSignsForm}
          onClose={() => setShowVitalSignsForm(false)}
          title="Record Vital Signs"
        >
          <VitalSignsForm
            onSubmit={(data) => {
              console.log("Vital signs form submitted:", data);
              setShowVitalSignsForm(false);
            }}
          />
        </ModalForm>
      )}

      {showMedicationForm && (
        <ModalForm
          isOpen={showMedicationForm}
          onClose={() => setShowMedicationForm(false)}
          title="Add Medication"
        >
          <MedicationForm
            onSubmit={(data) => {
              console.log("Medication form submitted:", data);
              setShowMedicationForm(false);
            }}
          />
        </ModalForm>
      )}

      {showAppointmentForm && (
        <ModalForm
          isOpen={showAppointmentForm}
          onClose={() => setShowAppointmentForm(false)}
          title="Schedule New Appointment"
        >
          <AppointmentForm
            onSubmit={(data) => {
              console.log("Appointment form submitted:", data);
              setShowAppointmentForm(false);
            }}
          />
        </ModalForm>
      )}

      {showContactForm && (
        <ModalForm
          isOpen={showContactForm}
          onClose={() => setShowContactForm(false)}
          title="Add Emergency Contact"
        >
          <EmergencyContactForm
            onSubmit={(data) => {
              console.log("Contact form submitted:", data);
              setShowContactForm(false);
            }}
          />
        </ModalForm>
      )}
    </div>
  );
};

export { HealthSection };
