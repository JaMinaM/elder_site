"use client";

import React from "react";

interface PageHeaderProps {
  title: string;
}

export const PageHeader = ({ title }: PageHeaderProps) => (
  <div className="mb-6 px-4">
    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
  </div>
);
