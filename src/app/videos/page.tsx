/* eslint-disable @next/next/no-img-element */
"use client";

import { useTheme } from "@/shared/lib/theme-context";
import { Video } from "@/shared/types";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ExternalLink, Play } from "lucide-react";
import { useEffect, useState } from "react";

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch("/api/videos");
      if (response.ok) {
        const videosData = await response.json();
        setVideos(videosData);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const extractVideoId = (url: string): string => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
    );
    return match ? match[1] : "";
  };

  const openVideo = (video: Video) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="text-5xl md:text-6xl font-bold font-display mb-6"
              style={{ color: theme.text }}
            >
              Video Content
            </h1>
            <p
              className="text-xl opacity-80 max-w-2xl mx-auto"
              style={{ color: theme.text }}
            >
              Watch my design process, tutorials, and creative insights
            </p>
          </motion.div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => openVideo(video)}
              >
                <div
                  className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  style={{ backgroundColor: theme.background }}
                >
                  {/* Video Thumbnail */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-all duration-300">
                      <motion.div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: theme.primary }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play
                          size={24}
                          className="text-white ml-1"
                          fill="currentColor"
                        />
                      </motion.div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-4 right-4">
                      <span
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{
                          backgroundColor: "rgba(0,0,0,0.8)",
                          color: "white",
                        }}
                      >
                        Watch Now
                      </span>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="p-6">
                    <h3
                      className="text-xl font-bold mb-2 group-hover:opacity-80 transition-opacity duration-200"
                      style={{ color: theme.text }}
                    >
                      {video.title}
                    </h3>
                    <p
                      className="text-sm opacity-70 mb-4 line-clamp-2"
                      style={{ color: theme.text }}
                    >
                      {video.description}
                    </p>

                    {/* Date */}
                    <div className="flex items-center space-x-2 text-xs opacity-60">
                      <Calendar size={14} style={{ color: theme.text }} />
                      <span style={{ color: theme.text }}>
                        {video.createdAt.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Videos */}
          {videos.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="text-6xl mb-4 opacity-50"
                style={{ color: theme.primary }}
              >
                🎥
              </div>
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: theme.text }}
              >
                No videos available
              </h3>
              <p className="opacity-70" style={{ color: theme.text }}>
                Check back soon for new content
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideo}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black bg-opacity-75" />

            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h3
                  className="text-2xl font-bold"
                  style={{ color: theme.text }}
                >
                  {selectedVideo.title}
                </h3>
                <button
                  onClick={closeVideo}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <ExternalLink size={20} style={{ color: theme.text }} />
                </button>
              </div>

              {/* Video Content */}
              <div className="p-6">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${extractVideoId(
                      selectedVideo.youtubeUrl
                    )}`}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>

                <p className="text-sm opacity-70" style={{ color: theme.text }}>
                  {selectedVideo.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs opacity-60">
                    <Calendar size={14} style={{ color: theme.text }} />
                    <span style={{ color: theme.text }}>
                      {selectedVideo.createdAt.toLocaleString()}
                    </span>
                  </div>

                  <a
                    href={selectedVideo.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <span>Watch on YouTube</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
