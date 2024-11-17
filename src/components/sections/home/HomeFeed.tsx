"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useDarkMode } from "@/hooks/useDarkMode";
import { ArticleCard } from "./ArticleCard";
import { EventCard } from "./EventCard";
import { FeedFilters } from "./FeedFilters";
import type { FeedFilters as FeedFiltersType, FeedItem } from "./types";
import { SAMPLE_ARTICLES, SAMPLE_EVENTS } from "./data";

export const HomeFeed = () => {
  const [filters, setFilters] = useState<FeedFiltersType>({
    contentTypes: ["post", "article", "event"],
    categories: [],
    timeRange: "all",
  });
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const isDarkMode = useDarkMode();

  useEffect(() => {
    const initialFeed: FeedItem[] = [
      ...SAMPLE_ARTICLES.map((article) => ({
        type: "article",
        content: article,
        timestamp: article.publishDate,
      })),
      ...SAMPLE_EVENTS.map((event) => ({
        type: "event",
        content: event,
        timestamp: event.date,
      })),
    ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    setFeedItems(initialFeed);
  }, []);

  const handleArticleInteraction = {
    like: (id: string) => {
      setFeedItems((prev) =>
        prev.map((item) => {
          if (item.type === "article" && item.content.id === id) {
            return {
              ...item,
              content: {
                ...item.content,
                likes: item.content.likes + 1,
              },
            };
          }
          return item;
        })
      );
    },
    save: (id: string) => {
      setFeedItems((prev) =>
        prev.map((item) => {
          if (item.type === "article" && item.content.id === id) {
            return {
              ...item,
              content: {
                ...item.content,
                saves: item.content.saves + 1,
              },
            };
          }
          return item;
        })
      );
    },
  };

  const handleEventInteraction = {
    interested: (id: string) => {
      setFeedItems((prev) =>
        prev.map((item) => {
          if (item.type === "event" && item.content.id === id) {
            return {
              ...item,
              content: {
                ...item.content,
                interested: item.content.interested + 1,
              },
            };
          }
          return item;
        })
      );
    },
    attend: (id: string) => {
      setFeedItems((prev) =>
        prev.map((item) => {
          if (item.type === "event" && item.content.id === id) {
            return {
              ...item,
              content: {
                ...item.content,
                attendees: item.content.attendees + 1,
              },
            };
          }
          return item;
        })
      );
    },
  };

  return (
    <Card className={`${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}>
      <CardContent className="p-6">
        <FeedFilters
          filters={filters}
          onFilterChange={(newFilters) => setFilters(newFilters)}
        />

        <div className="space-y-6">
          {feedItems.map((item) => {
            switch (item.type) {
              case "article":
                return (
                  <ArticleCard
                    key={item.content.id}
                    article={item.content}
                    onLike={handleArticleInteraction.like}
                    onSave={handleArticleInteraction.save}
                    onShare={(id) => console.log("Share article:", id)}
                  />
                );
              case "event":
                return (
                  <EventCard
                    key={item.content.id}
                    event={item.content}
                    onInterested={handleEventInteraction.interested}
                    onAttend={handleEventInteraction.attend}
                    onShare={(id) => console.log("Share event:", id)}
                  />
                );
              default:
                return null;
            }
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeFeed;
