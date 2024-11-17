"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { formatTimeAgo } from "@/utils/helpers";
import {
  Heart,
  MessageCircle,
  Share,
  MoreVertical,
  Image as ImageIcon,
  Play,
} from "lucide-react";
import { PostCardProps } from "@/types/post";

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onComment,
  onShare,
  currentUserId,
}) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const isDarkMode = document.documentElement.classList.contains("dark");
  const handleLike = () => {
    onLike?.(post.id);
  };

  const handleShare = () => {
    onShare?.(post.id);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment?.(post.id, commentText);
      setCommentText("");
    }
  };

  const displayedComments = showAllComments
    ? post.comments
    : post.comments.slice(0, 2);

  const remainingComments = post.comments.length - 2;
  const renderMedia = () => {
    if (!post.media?.length) return null;

    return (
      <div className="mt-4 space-y-2">
        {post.media.map((media, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800"
          >
            {media.type === "image" ? (
              <img
                src={media.url}
                alt={media.alt || ""}
                className="w-full h-auto object-cover rounded-lg"
              />
            ) : (
              <div className="relative aspect-video">
                <video
                  src={media.url}
                  controls
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="w-12 h-12 text-white opacity-80" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  return (
    <Card className={`${isDarkMode ? "bg-gray-800" : "bg-white"} mb-4`}>
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
              {post.userAvatar ? (
                <img
                  src={post.userAvatar}
                  alt={post.userName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  {post.userName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <h3
                className={`font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {post.userName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatTimeAgo(post.timestamp)}
                <span className="mx-1">•</span>
                {post.privacy}
              </p>
            </div>
          </div>
          <button
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="More options"
          >
            <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        {/* Content */}
        <div className="mt-4">
          <p
            className={`text-lg ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            {post.content}
          </p>
          {renderMedia()}
        </div>

        {/* Interaction Stats */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 fill-red-500 text-red-500" />
            <span>{post.likes} likes</span>
          </div>
          <div className="flex items-center gap-4">
            <span>{post.comments.length} comments</span>
            <span>{post.shares} shares</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex items-center justify-between border-t border-b border-gray-200 dark:border-gray-700 py-2">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${
                post.likes > 0 ? "fill-red-500 text-red-500" : ""
              }`}
            />
            <span className={isDarkMode ? "text-gray-200" : "text-gray-700"}>
              Like
            </span>
          </button>
          <button
            onClick={() => setIsCommentOpen(!isCommentOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className={isDarkMode ? "text-gray-200" : "text-gray-700"}>
              Comment
            </span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Share className="w-5 h-5" />
            <span className={isDarkMode ? "text-gray-200" : "text-gray-700"}>
              Share
            </span>
          </button>
        </div>
        {/* Comments Section */}
        {isCommentOpen && (
          <div className="mt-4">
            <form onSubmit={handleCommentSubmit} className="mb-4">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                  bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                    disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Post Comment
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {displayedComments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                    {comment.userAvatar ? (
                      <img
                        src={comment.userAvatar}
                        alt={comment.userName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                        {comment.userName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
                      <p className="font-medium text-sm text-gray-900 dark:text-white">
                        {comment.userName}
                      </p>
                      <p className="text-gray-800 dark:text-gray-200">
                        {comment.content}
                      </p>
                    </div>
                    <div className="mt-1 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{formatTimeAgo(comment.timestamp)}</span>
                      <button className="hover:text-gray-700 dark:hover:text-gray-300">
                        Like
                      </button>
                      <button className="hover:text-gray-700 dark:hover:text-gray-300">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {remainingComments > 0 && (
                <button
                  onClick={() => setShowAllComments(true)}
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  View {remainingComments} more{" "}
                  {remainingComments === 1 ? "comment" : "comments"}
                </button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;
