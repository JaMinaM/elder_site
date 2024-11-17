"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PostCard } from "./PostCard";
import { PostCreator } from "./PostCreator";
import {
  User,
  Image as ImageIcon,
  Camera,
  Edit2,
  Users,
  Settings,
  Share2,
  MapPin,
  Calendar,
  Link as LinkIcon,
} from "lucide-react";

// Sample user data - replace with real data later
const SAMPLE_USER = {
  id: "1",
  username: "JaMina Engram",
  bio: "Embracing life's adventures, one story at a time! 📚 Love gardening, crafts, and family time.",
  profileImage: null, // URL for profile image
  bannerImage: null, // URL for banner image
  location: "San Francisco, CA",
  joinedDate: "January 2024",
  website: "goldenconnect.com/jamina",
  followers: 128,
  following: 95,
  posts: 45,
};
const ProfileHeader = ({ user, isDarkMode }) => {
  const [isHoveringBanner, setIsHoveringBanner] = useState(false);
  const [isHoveringProfile, setIsHoveringProfile] = useState(false);

  return (
    <Card
      className={`${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } overflow-hidden mb-6`}
    >
      {/* Banner Section */}
      <div
        className="relative h-48 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800"
        onMouseEnter={() => setIsHoveringBanner(true)}
        onMouseLeave={() => setIsHoveringBanner(false)}
      >
        {user.bannerImage && (
          <img
            src={user.bannerImage}
            alt="Profile banner"
            className="w-full h-full object-cover"
          />
        )}
        {isHoveringBanner && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-gray-800 hover:bg-gray-100">
              <Camera className="w-5 h-5" />
              <span>Change Banner</span>
            </button>
          </div>
        )}
      </div>

      {/* Profile Section */}
      <CardContent className="relative px-6 pb-6">
        {/* Profile Image */}
        <div className="absolute -top-16 left-6">
          <div
            className="relative w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-gray-200 dark:bg-gray-700"
            onMouseEnter={() => setIsHoveringProfile(true)}
            onMouseLeave={() => setIsHoveringProfile(false)}
          >
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-16 h-16 text-gray-400 dark:text-gray-500" />
              </div>
            )}
            {isHoveringProfile && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <Camera className="w-8 h-8 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="ml-40 pt-4">
          {/* Content continued in next chunk */}
          {/* User Info and Actions */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1
                className={`text-2xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {user.username}
              </h1>
              <p
                className={`mt-1 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {user.bio}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? "border-gray-700 hover:bg-gray-700 text-gray-300"
                    : "border-gray-200 hover:bg-gray-50 text-gray-700"
                } transition-colors`}
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
              <button
                className={`p-2 rounded-lg border ${
                  isDarkMode
                    ? "border-gray-700 hover:bg-gray-700 text-gray-300"
                    : "border-gray-200 hover:bg-gray-50 text-gray-700"
                } transition-colors`}
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Meta Information */}
          <div
            className={`flex flex-wrap gap-4 mb-4 text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Joined {user.joinedDate}</span>
            </div>
            {user.website && (
              <div className="flex items-center gap-1">
                <LinkIcon className="w-4 h-4" />
                <a
                  href={user.website}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex gap-6">
            <button className="group">
              <span
                className={`font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {user.followers.toLocaleString()}
              </span>
              <span
                className={`ml-1 group-hover:underline ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Followers
              </span>
            </button>
            <button className="group">
              <span
                className={`font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {user.following.toLocaleString()}
              </span>
              <span
                className={`ml-1 group-hover:underline ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Following
              </span>
            </button>
            <div>
              <span
                className={`font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {user.posts.toLocaleString()}
              </span>
              <span
                className={`ml-1 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Posts
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export const SocialSection = () => {
  const [posts, setPosts] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsDarkMode(document.documentElement.classList.contains("dark"));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
    });

    return () => observer.disconnect();
  }, []);

  const handleCreatePost = ({ content, media, privacy }) => {
    const newPost = {
      id: `post-${Date.now()}`,
      userId: SAMPLE_USER.id,
      userName: SAMPLE_USER.username,
      content,
      media: media?.map((file, index) => ({
        type: file.type.startsWith("image/") ? "image" : "video",
        url: URL.createObjectURL(file),
        alt: `Media ${index + 1}`,
      })),
      likes: 0,
      comments: [],
      shares: 0,
      timestamp: new Date(),
      privacy,
    };

    setPosts([newPost, ...posts]);
  };
  const handleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleComment = (postId, commentText) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: `comment-${Date.now()}`,
                  userId: SAMPLE_USER.id,
                  userName: SAMPLE_USER.username,
                  content: commentText,
                  timestamp: new Date(),
                  likes: 0,
                },
              ],
            }
          : post
      )
    );
  };

  const handleShare = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, shares: post.shares + 1 } : post
      )
    );
  };
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <ProfileHeader user={SAMPLE_USER} isDarkMode={isDarkMode} />

      {/* Main Content */}
      <Card className={`${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}>
        <CardContent className="p-6">
          <PostCreator
            onSubmit={handleCreatePost}
            currentUser={{
              id: SAMPLE_USER.id,
              name: SAMPLE_USER.username,
            }}
          />

          <div className="space-y-6 mt-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
                currentUserId={SAMPLE_USER.id}
              />
            ))}

            {posts.length === 0 && (
              <div className="text-center py-8">
                <p
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  No posts yet. Create your first post above!
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialSection;
