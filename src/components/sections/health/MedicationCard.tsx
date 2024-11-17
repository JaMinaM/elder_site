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

interface MedicationItem {
  id: string;
  name: string;
  dosage: string;
  time: string;
  status: string;
  nextDose: string;
}

export const MedicationCard = () => {
  const [medications, setMedications] = useState<MedicationItem[]>([
    {
      id: "med1",
      name: "Lisinopril",
      dosage: "10mg",
      time: "8:00 AM",
      status: "Taken",
      nextDose: "Tomorrow 8:00 AM",
    },
    {
      id: "med2",
      name: "Metformin",
      dosage: "500mg",
      time: "1:00 PM",
      status: "Due in 2 hours",
      nextDose: "Today 1:00 PM",
    },
    {
      id: "med3",
      name: "Vitamin D",
      dosage: "1000 IU",
      time: "6:00 PM",
      status: "Upcoming",
      nextDose: "Today 6:00 PM",
    },
  ]);

  useEffect(() => {
    const savedOrder = localStorage.getItem("medicationOrder");
    if (savedOrder) {
      try {
        setMedications(JSON.parse(savedOrder));
      } catch (e) {
        console.error("Error loading saved medication order:", e);
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
      const oldIndex = medications.findIndex((item) => item.id === active.id);
      const newIndex = medications.findIndex((item) => item.id === over.id);

      const newOrder = arrayMove(medications, oldIndex, newIndex);
      setMedications(newOrder);
      localStorage.setItem("medicationOrder", JSON.stringify(newOrder));
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold dark:text-white">
            Medication Reminders
          </h2>
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={medications.map((med) => med.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {medications.map((med) => (
                <DraggableCard key={med.id} id={med.id}>
                  <div
                    className="p-4 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 
                    hover:shadow-md dark:hover:bg-gray-600 transition-all duration-200"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium dark:text-white">
                          {med.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Dosage: {med.dosage}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Time: {med.time}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-sm ${
                            med.status === "Taken"
                              ? "text-green-600 dark:text-green-400"
                              : med.status.includes("Due")
                              ? "text-orange-600 dark:text-orange-400"
                              : "text-gray-600 dark:text-gray-300"
                          }`}
                        >
                          {med.status}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Next: {med.nextDose}
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
