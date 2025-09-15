/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import ProtectedRoute from "@/components/protect";
import { useAuth } from "@/shared/lib/auth-context";
import { useTheme } from "@/shared/lib/theme-context";
import {
  AdminSettings,
  Project,
  Theme,
  Video as VideoType,
} from "@/shared/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Database,
  Eye,
  Image,
  LogOut,
  Palette,
  Plus,
  Save,
  Settings,
  Trash2,
  User,
  Video,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  );
}

function AdminDashboard() {
  const { theme, settings, updateTheme, updateSettings } = useTheme();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "theme" | "projects" | "videos" | "settings"
  >("dashboard");
  const [projects, setProjects] = useState<Project[]>([]);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tempTheme, setTempTheme] = useState<Theme>(theme);
  const [tempSettings, setTempSettings] = useState<AdminSettings>(settings);
  const [newProject, setNewProject] = useState<Partial<Project>>({});
  const [newVideo, setNewVideo] = useState<Partial<VideoType>>({});
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, videosRes, settingsRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/videos"),
        fetch("/api/settings"),
      ]);

      if (projectsRes.ok) {
        const projectsData = await projectsRes.json();
        setProjects(projectsData);
      }

      if (videosRes.ok) {
        const videosData = await videosRes.json();
        setVideos(videosData);
      }

      if (settingsRes.ok) {
        const settingsData = await settingsRes.json();
        setTempSettings(settingsData);
        setTempTheme(settingsData.theme);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleThemeChange = (key: keyof Theme, value: string) => {
    setTempTheme((prev) => ({ ...prev, [key]: value }));
  };

  const saveTheme = async () => {
    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: tempTheme }),
      });

      if (response.ok) {
        updateTheme(tempTheme);
        // Show success notification
      }
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  const addProject = async (formData: FormData) => {
    try {
      setIsUploading(true);
      const response = await fetch("/api/projects", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const project = await response.json();
        setProjects((prev) => [project, ...prev]);
        setNewProject({});
        setShowAddProject(false);
      } else {
        const error = await response.json();
        console.error("Error adding project:", error);
      }
    } catch (error) {
      console.error("Error adding project:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const addVideo = async () => {
    try {
      const response = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newVideo),
      });

      if (response.ok) {
        const video = await response.json();
        setVideos((prev) => [video, ...prev]);
        setNewVideo({});
        setShowAddVideo(false);
      }
    } catch (error) {
      console.error("Error adding video:", error);
    }
  };

  const deleteVideo = async (id: string) => {
    try {
      const response = await fetch(`/api/videos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setVideos((prev) => prev.filter((v) => v.id !== id));
      }
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "theme", label: "Theme", icon: Palette },
    { id: "projects", label: "Projects", icon: Image },
    { id: "videos", label: "Videos", icon: Video },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-lg font-medium" style={{ color: theme.text }}>
            Loading...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen pt-20"
      style={{ backgroundColor: theme.background }}
    >
      {/* Header */}
      <div className="border-b" style={{ borderColor: `${theme.primary}20` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: theme.text }}>
                Admin Dashboard
              </h1>
              <p className="text-sm opacity-70" style={{ color: theme.text }}>
                Manage your portfolio content and settings
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div
                className="flex items-center space-x-2 px-3 py-2 rounded-lg"
                style={{ backgroundColor: `${theme.primary}10` }}
              >
                <User size={20} style={{ color: theme.primary }} />
                <span
                  className="text-sm font-medium"
                  style={{ color: theme.text }}
                >
                  {user?.username}
                </span>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors duration-200"
              >
                <LogOut size={20} className="text-red-500" />
                <span className="text-sm text-red-500">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "text-white"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  style={{
                    backgroundColor:
                      activeTab === tab.id ? theme.primary : "transparent",
                    color: activeTab === tab.id ? "white" : theme.text,
                  }}
                >
                  <Icon size={20} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "dashboard" && (
              <DashboardTab projects={projects} videos={videos} theme={theme} />
            )}
            {activeTab === "theme" && (
              <ThemeTab
                tempTheme={tempTheme}
                handleThemeChange={handleThemeChange}
                saveTheme={saveTheme}
                theme={theme}
              />
            )}
            {activeTab === "projects" && (
              <ProjectsTab
                projects={projects}
                deleteProject={deleteProject}
                addProject={addProject}
                showAddProject={showAddProject}
                setShowAddProject={setShowAddProject}
                isUploading={isUploading}
                theme={theme}
              />
            )}
            {activeTab === "videos" && (
              <VideosTab
                videos={videos}
                deleteVideo={deleteVideo}
                theme={theme}
              />
            )}
            {activeTab === "settings" && (
              <SettingsTab
                tempSettings={tempSettings}
                setTempSettings={setTempSettings}
                theme={theme}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Dashboard Tab Component
function DashboardTab({
  projects,
  videos,
  theme,
}: {
  projects: Project[];
  videos: VideoType[];
  theme: Theme;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <motion.div
        className="p-6 rounded-2xl shadow-lg"
        style={{
          backgroundColor: theme.background,
          border: `1px solid ${theme.primary}20`,
        }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-70" style={{ color: theme.text }}>
              Total Projects
            </p>
            <p className="text-3xl font-bold" style={{ color: theme.primary }}>
              {projects.length}
            </p>
          </div>
          <Image size={32} style={{ color: theme.primary }} />
        </div>
      </motion.div>

      <motion.div
        className="p-6 rounded-2xl shadow-lg"
        style={{
          backgroundColor: theme.background,
          border: `1px solid ${theme.primary}20`,
        }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-70" style={{ color: theme.text }}>
              Total Videos
            </p>
            <p
              className="text-3xl font-bold"
              style={{ color: theme.secondary }}
            >
              {videos.length}
            </p>
          </div>
          <Video size={32} style={{ color: theme.secondary }} />
        </div>
      </motion.div>

      <motion.div
        className="p-6 rounded-2xl shadow-lg"
        style={{
          backgroundColor: theme.background,
          border: `1px solid ${theme.primary}20`,
        }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-70" style={{ color: theme.text }}>
              Categories
            </p>
            <p className="text-3xl font-bold" style={{ color: theme.accent }}>
              {new Set(projects.map((p) => p.category)).size}
            </p>
          </div>
          <Database size={32} style={{ color: theme.accent }} />
        </div>
      </motion.div>

      <motion.div
        className="p-6 rounded-2xl shadow-lg"
        style={{
          backgroundColor: theme.background,
          border: `1px solid ${theme.primary}20`,
        }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-70" style={{ color: theme.text }}>
              Total Views
            </p>
            <p className="text-3xl font-bold" style={{ color: theme.primary }}>
              1.2K
            </p>
          </div>
          <Eye size={32} style={{ color: theme.primary }} />
        </div>
      </motion.div>
    </div>
  );
}

// Theme Tab Component
function ThemeTab({ tempTheme, handleThemeChange, saveTheme, theme }: any) {
  return (
    <div className="space-y-6">
      <div
        className="p-6 rounded-2xl shadow-lg"
        style={{
          backgroundColor: theme.background,
          border: `1px solid ${theme.primary}20`,
        }}
      >
        <h2 className="text-2xl font-bold mb-6" style={{ color: theme.text }}>
          Theme Customization
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(tempTheme).map(([key, value]) => (
            <div key={key}>
              <label
                className="block text-sm font-medium mb-2 capitalize"
                style={{ color: theme.text }}
              >
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={value as string}
                  onChange={(e) =>
                    handleThemeChange(key as keyof Theme, e.target.value)
                  }
                  className="w-12 h-10 rounded border-2 cursor-pointer"
                  style={{ borderColor: theme.primary }}
                />
                <input
                  type="text"
                  value={value as string}
                  onChange={(e) =>
                    handleThemeChange(key as keyof Theme, e.target.value)
                  }
                  className="flex-1 px-3 py-2 rounded border-2 focus:outline-none"
                  style={{
                    backgroundColor: theme.background,
                    borderColor: `${theme.primary}30`,
                    color: theme.text,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={saveTheme}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200 hover:shadow-lg"
            style={{ backgroundColor: theme.primary }}
          >
            <Save size={20} />
            <span>Save Theme</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Projects Tab Component
function ProjectsTab({
  projects,
  deleteProject,
  addProject,
  showAddProject,
  setShowAddProject,
  isUploading,
  theme,
}: any) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    file: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.file
    ) {
      alert("Please fill in all required fields and select an image");
      return;
    }

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("description", formData.description);
    submitData.append("category", formData.category);
    submitData.append("tags", formData.tags);
    submitData.append("file", formData.file);

    await addProject(submitData);

    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      tags: "",
      file: null,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, file }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold" style={{ color: theme.text }}>
          Projects
        </h2>
        <button
          onClick={() => setShowAddProject(!showAddProject)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-semibold"
          style={{ backgroundColor: theme.primary }}
        >
          <Plus size={20} />
          <span>Add Project</span>
        </button>
      </div>

      {/* Add Project Form */}
      {showAddProject && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="p-6 rounded-2xl shadow-lg"
          style={{
            backgroundColor: theme.background,
            border: `1px solid ${theme.primary}20`,
          }}
        >
          <h3 className="text-xl font-bold mb-4" style={{ color: theme.text }}>
            Add New Project
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme.text }}
                >
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded border-2 focus:outline-none"
                  style={{
                    backgroundColor: theme.background,
                    borderColor: `${theme.primary}30`,
                    color: theme.text,
                  }}
                  required
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme.text }}
                >
                  Category *
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 rounded border-2 focus:outline-none"
                  style={{
                    backgroundColor: theme.background,
                    borderColor: `${theme.primary}30`,
                    color: theme.text,
                  }}
                  required
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: theme.text }}
              >
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 rounded border-2 focus:outline-none"
                style={{
                  backgroundColor: theme.background,
                  borderColor: `${theme.primary}30`,
                  color: theme.text,
                }}
                rows={3}
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: theme.text }}
              >
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, tags: e.target.value }))
                }
                placeholder="e.g., React, TypeScript, Web Development"
                className="w-full px-3 py-2 rounded border-2 focus:outline-none"
                style={{
                  backgroundColor: theme.background,
                  borderColor: `${theme.primary}30`,
                  color: theme.text,
                }}
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: theme.text }}
              >
                Project Image *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 rounded border-2 focus:outline-none"
                style={{
                  backgroundColor: theme.background,
                  borderColor: `${theme.primary}30`,
                  color: theme.text,
                }}
                required
              />
              {formData.file && (
                <p
                  className="text-sm mt-1"
                  style={{ color: theme.text, opacity: 0.7 }}
                >
                  Selected: {formData.file.name}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddProject(false)}
                className="px-4 py-2 rounded-lg border-2 transition-colors duration-200"
                style={{
                  borderColor: theme.primary,
                  color: theme.primary,
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUploading}
                className="flex items-center space-x-2 px-6 py-2 rounded-lg text-white font-semibold transition-all duration-200 disabled:opacity-50"
                style={{ backgroundColor: theme.primary }}
              >
                {isUploading ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    <span>Add Project</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: Project) => (
          <motion.div
            key={project.id}
            className="p-6 rounded-2xl shadow-lg"
            style={{
              backgroundColor: theme.background,
              border: `1px solid ${theme.primary}20`,
            }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold" style={{ color: theme.text }}>
                {project.title}
              </h3>
              <button
                onClick={() => deleteProject(project.id)}
                className="p-2 rounded text-red-500 hover:bg-red-50 transition-colors duration-200"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <p
              className="text-sm opacity-70 mb-2"
              style={{ color: theme.text }}
            >
              {project.description}
            </p>
            <div className="flex items-center justify-between">
              <span
                className="px-2 py-1 rounded text-xs"
                style={{
                  backgroundColor: `${theme.primary}20`,
                  color: theme.text,
                }}
              >
                {project.category}
              </span>
              <span
                className="text-xs opacity-50"
                style={{ color: theme.text }}
              >
                {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Videos Tab Component
function VideosTab({ videos, deleteVideo, theme }: any) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold" style={{ color: theme.text }}>
          Videos
        </h2>
        <button
          className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-semibold"
          style={{ backgroundColor: theme.primary }}
        >
          <Plus size={20} />
          <span>Add Video</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video: VideoType) => (
          <motion.div
            key={video.id}
            className="p-6 rounded-2xl shadow-lg"
            style={{
              backgroundColor: theme.background,
              border: `1px solid ${theme.primary}20`,
            }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold" style={{ color: theme.text }}>
                {video.title}
              </h3>
              <button
                onClick={() => deleteVideo(video.id)}
                className="p-2 rounded text-red-500 hover:bg-red-50 transition-colors duration-200"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <p
              className="text-sm opacity-70 mb-2"
              style={{ color: theme.text }}
            >
              {video.description}
            </p>
            <span className="text-xs opacity-50" style={{ color: theme.text }}>
              {new Date(video.createdAt).toLocaleDateString()}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Settings Tab Component
function SettingsTab({ tempSettings, setTempSettings, theme }: any) {
  return (
    <div className="space-y-6">
      <div
        className="p-6 rounded-2xl shadow-lg"
        style={{
          backgroundColor: theme.background,
          border: `1px solid ${theme.primary}20`,
        }}
      >
        <h2 className="text-2xl font-bold mb-6" style={{ color: theme.text }}>
          Site Settings
        </h2>

        <div className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: theme.text }}
            >
              Site Title
            </label>
            <input
              type="text"
              value={tempSettings.siteTitle}
              onChange={(e) =>
                setTempSettings((prev: any) => ({
                  ...prev,
                  siteTitle: e.target.value,
                }))
              }
              className="w-full px-3 py-2 rounded border-2 focus:outline-none"
              style={{
                backgroundColor: theme.background,
                borderColor: `${theme.primary}30`,
                color: theme.text,
              }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: theme.text }}
            >
              Site Description
            </label>
            <textarea
              value={tempSettings.siteDescription}
              onChange={(e) =>
                setTempSettings((prev: any) => ({
                  ...prev,
                  siteDescription: e.target.value,
                }))
              }
              className="w-full px-3 py-2 rounded border-2 focus:outline-none"
              style={{
                backgroundColor: theme.background,
                borderColor: `${theme.primary}30`,
                color: theme.text,
              }}
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
