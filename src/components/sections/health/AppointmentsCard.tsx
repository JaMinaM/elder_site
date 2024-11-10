"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const AppointmentsCard = () => {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold dark:text-white">Upcoming Appointments</h2>
          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 
            text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 
            dark:focus:ring-blue-400 rounded px-2">
            Schedule New
          </button>
        </div>
        <div className="space-y-4">
          {[
            {
              doctor: "Dr. Smith",
              specialty: "Primary Care",
              date: "Nov 15, 2024",
              time: "10:30 AM",
              location: "Main Street Medical",
            },
            {
              doctor: "Dr. Beverly Johnson",
              specialty: "Therapist",
              date: "Nov 18, 2024",
              time: "9:30 AM",
              location: "Main Street Medical",
            },
            {
              doctor: "Dr. Johnson",
              specialty: "Cardiologist",
              date: "Nov 20, 2024",
              time: "2:15 PM",
              location: "Heart Care Center",
            },
          ].map((appt, index) => (
            <div
              key={index}
              className="p-4 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 
                hover:shadow-md dark:hover:bg-gray-600 transition-all duration-200"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium dark:text-white">{appt.doctor}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{appt.specialty}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{appt.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium dark:text-white">{appt.date}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{appt.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
