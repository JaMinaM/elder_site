"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const EmergencyContactsCard = () => {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold dark:text-white">Emergency Contacts</h2>
          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 
            text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 
            dark:focus:ring-blue-400 rounded px-2">
            Add Contact
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              name: "Sarah Johnson",
              relation: "Daughter",
              phone: "(555) 123-4567",
              type: "Primary",
            },
            {
              name: "Dr. Smith",
              relation: "Primary Care",
              phone: "(555) 987-6543",
              type: "Medical",
            },
            {
              name: "John Johnson",
              relation: "Son",
              phone: "(555) 234-5678",
              type: "Secondary",
            },
            {
              name: "Kelly Price",
              relation: "Sister",
              phone: "(555) 234-5678",
              type: "When-all-else-Fails",
            },
          ].map((contact, index) => (
            <div
              key={index}
              className="p-4 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 
                hover:shadow-md dark:hover:bg-gray-600 transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium dark:text-white">{contact.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{contact.relation}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{contact.phone}</p>
                </div>
                <span
                  className={`text-sm px-2 py-1 rounded transition-colors duration-200 ${
                    contact.type === "Primary"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      : contact.type === "Medical"
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300"
                  }`}
                >
                  {contact.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
