"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Phone,
  Heart,
  AlertCircle,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { ModalForm } from "@/components/forms/ModalForm";
import EmergencyContactForm from "@/components/forms/EmergencyContactForm";

interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  type: "Primary" | "Medical" | "Secondary" | "Backup";
  notes?: string;
}
export const EmergencyContactsCard = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    {
      id: "contact1",
      name: "Sarah Johnson",
      relation: "Daughter",
      phone: "(555) 123-4567",
      type: "Primary",
      notes: "Available 24/7 for emergencies",
    },
    {
      id: "contact2",
      name: "Dr. Smith",
      relation: "Primary Care Physician",
      phone: "(555) 987-6543",
      type: "Medical",
      notes: "Office hours: Mon-Fri 9AM-5PM",
    },
    {
      id: "contact3",
      name: "John Anderson",
      relation: "Son",
      phone: "(555) 234-5678",
      type: "Secondary",
      notes: "Lives nearby - 10 minutes away",
    },
  ]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const handleAddClick = () => {
    setShowContactForm(true);
  };
  useEffect(() => {
    const savedContacts = localStorage.getItem("emergencyContacts");
    if (savedContacts) {
      try {
        setContacts(JSON.parse(savedContacts));
      } catch (e) {
        console.error("Error loading saved contacts:", e);
      }
    }
  }, []);

  const moveContact = (index: number, direction: "up" | "down") => {
    const newContacts = [...contacts];
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < contacts.length) {
      [newContacts[index], newContacts[newIndex]] = [
        newContacts[newIndex],
        newContacts[index],
      ];
      setContacts(newContacts);
      localStorage.setItem("emergencyContacts", JSON.stringify(newContacts));
    }
  };

  const getTypeStyles = (type: EmergencyContact["type"]) => {
    const baseStyles =
      "px-3 py-1 rounded-full text-sm font-medium transition-colors";
    switch (type) {
      case "Primary":
        return `${baseStyles} bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300`;
      case "Medical":
        return `${baseStyles} bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300`;
      case "Secondary":
        return `${baseStyles} bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300`;
      case "Backup":
        return `${baseStyles} bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300`;
    }
  };

  const getContactIcon = (type: EmergencyContact["type"]) => {
    switch (type) {
      case "Primary":
        return <Heart className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case "Medical":
        return (
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
        );
      default:
        return <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400" />;
    }
  };
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Phone className="w-6 h-6" />
            Emergency Contacts
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleAddClick()}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 
                dark:hover:text-blue-300 text-sm font-medium transition-colors 
                px-4 py-2 rounded-lg border border-blue-200 dark:border-blue-800"
            >
              Add Contact
            </button>
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 
                dark:hover:text-blue-300 text-sm font-medium transition-colors 
                px-4 py-2 rounded-lg border border-blue-200 dark:border-blue-800"
              aria-label={
                isEditMode ? "Save contact order" : "Reorder contacts"
              }
            >
              {isEditMode ? "Save Order" : "Reorder"}
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {isEditMode && (
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
              Use the arrow buttons to reorder your contacts by priority
            </p>
          )}

          {contacts.map((contact, index) => (
            <div
              key={contact.id}
              className="p-5 border rounded-lg bg-white dark:bg-gray-700 
                dark:border-gray-600 hover:shadow-md
                transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="mt-1">{getContactIcon(contact.type)}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {contact.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg mt-1">
                      {contact.relation}
                    </p>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-blue-600 hover:text-blue-700 
                        dark:text-blue-400 dark:hover:text-blue-300 
                        text-lg mt-2 inline-block"
                      aria-label={`Call ${contact.name} at ${contact.phone}`}
                    >
                      {contact.phone}
                    </a>
                    {contact.notes && (
                      <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                        {contact.notes}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={getTypeStyles(contact.type)}
                    aria-label={`Contact priority: ${contact.type}`}
                  >
                    {contact.type}
                  </span>
                  {isEditMode && (
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => moveContact(index, "up")}
                        disabled={index === 0}
                        className="p-1 text-gray-600 hover:text-gray-900 
                          dark:text-gray-400 dark:hover:text-gray-200
                          disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label={`Move ${contact.name} up in priority`}
                      >
                        <ChevronUp className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => moveContact(index, "down")}
                        disabled={index === contacts.length - 1}
                        className="p-1 text-gray-600 hover:text-gray-900 
                          dark:text-gray-400 dark:hover:text-gray-200
                          disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label={`Move ${contact.name} down in priority`}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

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
      </CardContent>
    </Card>
  );
};

export default EmergencyContactsCard;
