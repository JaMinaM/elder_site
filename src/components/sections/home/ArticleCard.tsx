"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Heart, Bookmark, Share2, User, Tag } from "lucide-react";
import { formatTimeAgo } from "@/utils/helpers";
import type { ArticleCardProps } from "./types";

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onLike,
  onSave,
  onShare,
}) => {
  return (
    <Card className="bg-white dark:bg-gray-800 hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        {/* Article Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                {article.author}
              </h4>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{formatTimeAgo(article.publishDate)}</span>
                <span>•</span>
                <span>{article.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {article.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{article.excerpt}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full 
                  bg-blue-50 text-blue-700 text-sm dark:bg-blue-900 dark:text-blue-200"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* Article Image */}
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          )}
        </div>

        {/* Article Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onLike(article.id)}
                className="flex items-center gap-2 text-gray-500 hover:text-red-500 
                  dark:text-gray-400 dark:hover:text-red-400 transition-colors"
              >
                <Heart
                  className={`w-5 h-5 ${
                    article.likes > 0 ? "fill-current text-red-500" : ""
                  }`}
                />
                <span>{article.likes}</span>
              </button>
              <button
                onClick={() => onSave(article.id)}
                className="flex items-center gap-2 text-gray-500 hover:text-blue-500 
                  dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                <Bookmark
                  className={`w-5 h-5 ${
                    article.saves > 0 ? "fill-current text-blue-500" : ""
                  }`}
                />
                <span>{article.saves}</span>
              </button>
            </div>
            <button
              onClick={() => onShare(article.id)}
              className="p-2 text-gray-500 hover:text-blue-500 
                dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
