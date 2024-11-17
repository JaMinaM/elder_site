"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
  showCloseButton?: boolean;
  onSubmit?: (e: React.FormEvent) => void;
}

export const ModalForm: React.FC<ModalFormProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-2xl",
  showCloseButton = true,
  onSubmit,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const isDarkMode = document.documentElement.classList.contains("dark");

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-black            bg-opacity-50 overflow-y-auto">
      <div className="my-8 w-full"></div>
      <div
        ref={modalRef}
        className={`w-full ${maxWidth} animate-in fade-in duration-200`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <Card
          className={`${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white"
          } max-h-[90vh] overflow-y-auto`}
        >
          <CardHeader className="relative">
            <CardTitle
              id="modal-title"
              className={`text-2xl font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {title}
            </CardTitle>
            {showCloseButton && (
              <button
                onClick={onClose}
                className={`absolute top-4 right-4 p-2 rounded-lg transition-colors
                  ${
                    isDarkMode
                      ? "hover:bg-gray-700 text-gray-400 hover:text-white"
                      : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                  }`}
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModalForm;
