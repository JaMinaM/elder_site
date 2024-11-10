"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const SocialSection = () => {
  const posts = [
    {
      author: "JaMina Engram",
      content: "Just finished my Social Media App!",
      time: "2 hours ago",
    },
    {
      author: "Robert Johnson",
      content:
        "Looking forward to the train ride across Canada for the next 2 weeks!",
      time: "4 hours ago",
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
        <CardContent className="p-6">
          <PostCreation />
          <div className="space-y-4">
            {posts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const PostCreation = () => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <input
        type="text"
        placeholder="Share what's on your mind..."
        className="flex-grow p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 
          dark:text-gray-100 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 
          dark:focus:ring-blue-400 transition-colors duration-200"
      />
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
        dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200"
      >
        Post
      </button>
    </div>
  );
};

const PostCard = ({ post }) => {
  return (
    <div
      className="p-4 border rounded-lg hover:shadow-md dark:bg-gray-800 
      dark:border-gray-700 transition-all duration-200"
    >
      <div className="flex justify-between mb-2">
        <h3 className="font-medium text-gray-900 dark:text-gray-100">
          {post.author}
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {post.time}
        </span>
      </div>
      <p className="text-gray-700 dark:text-gray-300">{post.content}</p>
      <div className="flex gap-4 mt-4">
        <button
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 
          dark:hover:text-blue-300 text-sm transition-colors duration-200"
        >
          Like
        </button>
        <button
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 
          dark:hover:text-blue-300 text-sm transition-colors duration-200"
        >
          Comment
        </button>
        <button
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 
          dark:hover:text-blue-300 text-sm transition-colors duration-200"
        >
          Share
        </button>
      </div>
    </div>
  );
};
