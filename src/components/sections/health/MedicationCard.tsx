"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const MedicationCard = () => {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold dark:text-white">Medication Reminders</h2>
          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 
            text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 
            dark:focus:ring-blue-400 rounded px-2">
            Add Medication
          </button>
        </div>
        <div className="space-y-4">
          {[
            {
              name: "Lisinopril",
              dosage: "10mg",
              time: "8:00 AM",
              status: "Taken",
              nextDose: "Tomorrow 8:00 AM",
            },
            {
              name: "Metformin",
              dosage: "500mg",
              time: "1:00 PM",
              status: "Due in 2 hours",
              nextDose: "Today 1:00 PM",
            },
            {
              name: "Vitamin D",
              dosage: "1000 IU",
              time: "6:00 PM",
              status: "Upcoming",
              nextDose: "Today 6:00 PM",
            },
          ].map((med, index) => (
            <div
              key={index}
              className="p-4 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 
                hover:shadow-md dark:hover:bg-gray-600 transition-all duration-200"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium dark:text-white">{med.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Dosage: {med.dosage}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Time: {med.time}</p>
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
                  <p className="text-sm text-gray-500 dark:text-gray-400">Next: {med.nextDose}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
