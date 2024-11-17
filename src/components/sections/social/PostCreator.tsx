"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Image as ImageIcon,
  Video,
  Globe2,
  Users,
  Home,
  X,
  ChevronDown,
} from "lucide-react";
import { PostCreatorProps, PrivacyOption } from "@/types/post";

const PRIVACY_OPTIONS: PrivacyOption[] = [
  {
    value: "public",
    label: "Public",
    icon: <Globe2 className="w-4 h-4" />,
    description: "Anyone can see this post",
  },
  {
    value: "friends",
    label: "Friends",
    icon: <Users className="w-4 h-4" />,
    description: "Only your friends can see this post",
  },
  {
    value: "family",
    label: "Family",
    icon: <Home className="w-4 h-4" />,
    description: "Only family members can see this post",
  },
];
export const PostCreator: React.FC<PostCreatorProps> = ({
  onSubmit,
  currentUser = { id: "1", name: "User" },
}) => {
  const [content, setContent] = useState("");
  const [privacy, setPrivacy] = useState<PrivacyOption["value"]>("friends");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([]);
  const [showPrivacyMenu, setShowPrivacyMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isDarkMode = document.documentElement.classList.contains("dark");

  const handleMediaSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setMediaFiles((prev) => [...prev, ...files]);

      // Create previews
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setMediaPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeMedia = (index: number) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(mediaPreviews[index]);
    setMediaPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() || mediaFiles.length > 0) {
      onSubmit({
        content: content.trim(),
        media: mediaFiles,
        privacy,
      });
      setContent("");
      setMediaFiles([]);
      setMediaPreviews([]);
    }
  };
  return (
    <Card className={`${isDarkMode ? "bg-gray-800" : "bg-white"} mb-6`}>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-1">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                      bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white
                      focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
              />

              {/* Media Previews */}
              {mediaPreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {mediaPreviews.map((preview, index) => (
                    <div
                      key={preview}
                      className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800"
                    >
                      <img
                        src={preview}
                        alt={`Selected media ${index + 1}`}
                        className="w-full h-40 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeMedia(index)}
                        className="absolute top-2 right-2 p-1 rounded-full bg-gray-900/60 text-white
                              hover:bg-gray-900/80 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleMediaSelect}
                    accept="image/*,video/*"
                    multiple
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 
                          text-gray-500 dark:text-gray-400 transition-colors"
                  >
                    <ImageIcon className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 
                          text-gray-500 dark:text-gray-400 transition-colors"
                  >
                    <Video className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowPrivacyMenu(!showPrivacyMenu)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 
                            dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm"
                    >
                      {
                        PRIVACY_OPTIONS.find(
                          (option) => option.value === privacy
                        )?.icon
                      }
                      {
                        PRIVACY_OPTIONS.find(
                          (option) => option.value === privacy
                        )?.label
                      }
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {showPrivacyMenu && (
                      <div
                        className="absolute right-0 mt-1 w-64 rounded-lg shadow-lg bg-white dark:bg-gray-800 
                            border border-gray-200 dark:border-gray-700 py-1"
                      >
                        {PRIVACY_OPTIONS.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setPrivacy(option.value);
                              setShowPrivacyMenu(false);
                            }}
                            className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-100 
                                  dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                          >
                            {option.icon}
                            <div>
                              <div className="font-medium">{option.label}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {option.description}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={!content.trim() && mediaFiles.length === 0}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                          disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PostCreator;
