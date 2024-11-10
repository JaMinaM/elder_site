﻿"use client";

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@/components/ui/card';

interface DraggableCardProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const DraggableCard = ({ id, children, className = '' }: DraggableCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-grab active:cursor-grabbing ${isDragging ? 'shadow-lg' : ''} ${className}`}
    >
      <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
        {children}
      </Card>
    </div>
  );
};