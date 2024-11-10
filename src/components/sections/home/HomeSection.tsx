"use client";

import React, { useState, useEffect } from "react";
import { AlertCircle, Video, Heart, HelpCircle } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { WeatherWidget } from "@/components/weather/WeatherWidget";
import { Card, CardContent } from "@/components/ui/card";

export const HomeSection = ({ setActivePage }) => {
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState([
    { id: "welcome", content: <WelcomeCard setActivePage={setActivePage} /> },
    { id: "weather", content: <WeatherWidget /> },
  ]);

  useEffect(() => {
    setMounted(true);
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

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const renderContent = () => (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.id}>{item.content}</div>
      ))}
    </div>
  );

  if (!mounted) {
    return renderContent();
  }

  return (
    <div className="space-y-6">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id}>
              {item.content}
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

const SortableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

const WelcomeCard = ({ setActivePage }) => {
  const statsCards = [
    {
      title: "Today's Activities",
      count: "3",
      subtitle: "Including Book Club at 2 PM",
      color: "blue",
      onClick: () => {
        console.log("Navigating to community");
        setActivePage("community");
      },
    },
    {
      title: "Health Tasks",
      count: "2/3",
      subtitle: "Evening medication due",
      color: "green",
      onClick: () => {
        console.log("Navigating to health");
        setActivePage("health");
      },
    },
    {
      title: "Messages",
      count: "5",
      subtitle: "3 from family",
      color: "purple",
      onClick: () => {
        console.log("Navigating to social");
        setActivePage("social");
      },
    },
  ];

  const quickActions = [
    {
      id: "emergency",
      label: "Emergency Call",
      icon: <AlertCircle className="w-6 h-6" />,
      color: "red",
      onClick: () => (window.location.href = "tel:911"),
    },
    {
      id: "video",
      label: "Video Chat",
      icon: <Video className="w-6 h-6" />,
      color: "blue",
      onClick: () => setActivePage("social"),
    },
    {
      id: "medication",
      label: "Medication",
      icon: <Heart className="w-6 h-6" />,
      color: "pink",
      onClick: () => setActivePage("health"),
    },
    {
      id: "help",
      label: "Help",
      icon: <HelpCircle className="w-6 h-6" />,
      color: "green",
      onClick: () => setActivePage("help"),
    },
  ];

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Welcome Back, JaMina!
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statsCards.map((card) => (
            <button
              key={card.title}
              onClick={card.onClick}
              className={`p-4 ${
                card.color === "blue"
                  ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200"
                  : card.color === "green"
                  ? "bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-200"
                  : "bg-purple-50 dark:bg-purple-900/50 text-purple-700 dark:text-purple-200"
              } rounded-lg text-left hover:shadow-md transition-all duration-200`}
            >
              <h3 className="font-medium">{card.title}</h3>
              <p className="text-2xl font-bold">{card.count}</p>
              <p className="text-sm">{card.subtitle}</p>
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.onClick}
              className={`p-4 ${
                action.color === "red"
                  ? "bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-200"
                  : action.color === "blue"
                  ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200"
                  : action.color === "pink"
                  ? "bg-pink-50 dark:bg-pink-900/50 text-pink-700 dark:text-pink-200"
                  : "bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-200"
              } rounded-lg flex flex-col items-center gap-2 hover:shadow-md border-2 border-transparent 
              ${
                action.color === "red"
                  ? "hover:border-red-200 dark:hover:border-red-800"
                  : ""
              } 
              transition-all duration-200`}
            >
              {action.icon}
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
