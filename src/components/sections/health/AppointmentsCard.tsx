"use client";
import React, { useState, useEffect } from "react";
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
import { DraggableCard } from "@/components/dnd/DraggableCard";

interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
}

export const AppointmentsCard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "appt1",
      doctor: "Dr. Smith",
      specialty: "Primary Care",
      date: "Nov 15, 2024",
      time: "10:30 AM",
      location: "Main Street Medical",
    },
    {
      id: "appt2",
      doctor: "Dr. Beverly Johnson",
      specialty: "Therapist",
      date: "Nov 18, 2024",
      time: "9:30 AM",
      location: "Main Street Medical",
    },
    {
      id: "appt3",
      doctor: "Dr. Johnson",
      specialty: "Cardiologist",
      date: "Nov 20, 2024",
      time: "2:15 PM",
      location: "Heart Care Center",
    },
  ]);

  useEffect(() => {
    const savedOrder = localStorage.getItem("appointmentOrder");
    if (savedOrder) {
      try {
        setAppointments(JSON.parse(savedOrder));
      } catch (e) {
        console.error("Error loading saved appointment order:", e);
      }
    }
  }, []);

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
      const oldIndex = appointments.findIndex((appt) => appt.id === active.id);
      const newIndex = appointments.findIndex((appt) => appt.id === over.id);

      const newOrder = arrayMove(appointments, oldIndex, newIndex);
      setAppointments(newOrder);
      localStorage.setItem("appointmentOrder", JSON.stringify(newOrder));
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold dark:text-white">
            Upcoming Appointments
          </h2>
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={appointments.map((appt) => appt.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {appointments.map((appt) => (
                <DraggableCard key={appt.id} id={appt.id}>
                  <div
                    className="p-4 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 
                    hover:shadow-md dark:hover:bg-gray-600 transition-all duration-200"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium dark:text-white">
                          {appt.doctor}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {appt.specialty}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {appt.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium dark:text-white">
                          {appt.date}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {appt.time}
                        </p>
                      </div>
                    </div>
                  </div>
                </DraggableCard>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  );
};
