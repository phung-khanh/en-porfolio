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

/* -------------------- Dashboard Wrapper -------------------- */
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
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  /* -------------------- Fetch Data -------------------- */
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

  /* -------------------- Handlers -------------------- */
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
      if (response.ok) updateTheme(tempTheme);
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
      }
    } catch (error) {
      console.error("Error adding project:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const response = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (response.ok) setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const deleteVideo = async (id: string) => {
    try {
      const response = await fetch(`/api/videos/${id}`, { method: "DELETE" });
      if (response.ok) setVideos((prev) => prev.filter((v) => v.id !== id));
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  /* -------------------- Tabs -------------------- */
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "theme", label: "Theme", icon: Palette },
    { id: "projects", label: "Projects", icon: Image },
    { id: "videos", label: "Videos", icon: Video },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  /* -------------------- Loading -------------------- */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 backdrop-blur-3xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-lg font-medium text-dark">Loading...</p>
        </motion.div>
      </div>
    );
  }

  /* -------------------- Layout -------------------- */
  return (
    <div className="relative min-h-screen pt-20 text-dark">
      {/* Liquid Background Animation */}
      <motion.div
        className="fixed inset-0 -z-10 backdrop-blur-3xl"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(59,130,246,0.3), rgba(168,85,247,0.3), rgba(236,72,153,0.3))",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Header */}
      <div className="border-b border-white/20 backdrop-blur-xl bg-white/5">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center py-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-sm opacity-70">Manage your content & settings</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md">
              <User size={20} />
              <span className="text-sm font-medium">{user?.username}</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/40 transition-all"
            >
              <LogOut size={20} />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-wrap gap-3 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-blue-500 text-dark shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === "dashboard" && (
              <DashboardTab projects={projects} videos={videos} />
            )}
            {activeTab === "theme" && (
              <ThemeTab
                tempTheme={tempTheme}
                handleThemeChange={handleThemeChange}
                saveTheme={saveTheme}
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
              />
            )}
            {activeTab === "videos" && (
              <VideosTab videos={videos} deleteVideo={deleteVideo} />
            )}
            {activeTab === "settings" && (
              <SettingsTab
                tempSettings={tempSettings}
                setTempSettings={setTempSettings}
                updateSettings={updateSettings}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* -------------------- Dashboard Tab -------------------- */
function DashboardTab({ projects, videos }: any) {
  const cards = [
    {
      label: "Total Projects",
      value: projects.length,
      icon: Image,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Total Videos",
      value: videos.length,
      icon: Video,
      color: "from-pink-500 to-red-500",
    },
    {
      label: "Categories",
      value: new Set(projects.map((p: any) => p.category)).size,
      icon: Database,
      color: "from-purple-500 to-indigo-500",
    },
    {
      label: "Total Views",
      value: "1.2K",
      icon: Eye,
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className="p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg"
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-70">{card.label}</p>
              <p className="text-3xl font-bold">{card.value}</p>
            </div>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`p-3 rounded-full bg-gradient-to-r ${card.color}`}
            >
              <card.icon size={28} className="text-dark" />
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* -------------------- Theme Tab -------------------- */
function ThemeTab({ tempTheme, handleThemeChange, saveTheme }: any) {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Theme Customization</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(tempTheme).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-2 capitalize">
                {key}
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={value as string}
                  onChange={(e) =>
                    handleThemeChange(key as keyof Theme, e.target.value)
                  }
                  className="w-12 h-10 rounded border-2 border-amber-50 cursor-pointer"
                />
                <input
                  type="text"
                  value={value as string}
                  onChange={(e) =>
                    handleThemeChange(key as keyof Theme, e.target.value)
                  }
                  className="flex-1 px-3 py-2 rounded border-2 border-white/30 bg-white/50 backdrop-blur-lg"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <motion.button
            onClick={saveTheme}
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg text-dark font-semibold bg-gradient-to-r from-blue-500 to-pink-500 shadow-lg"
          >
            <Save size={20} />
            <span>Save Theme</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Projects Tab -------------------- */
function ProjectsTab({
  projects,
  deleteProject,
  addProject,
  showAddProject,
  setShowAddProject,
  isUploading,
}: any) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg text-dark font-semibold bg-gradient-to-r from-blue-500 to-pink-500"
          onClick={() => setShowAddProject(!showAddProject)}
        >
          <Plus size={20} />
          <span>Add Project</span>
        </motion.button>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: Project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg"
            whileHover={{ y: -5 }}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold">{project.title}</h3>
              <button
                onClick={() => deleteProject(project.id)}
                className="p-2 rounded text-red-400 hover:bg-red-500/20"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <p className="text-sm opacity-70 mb-2">{project.description}</p>
            <div className="flex items-center justify-between">
              <span className="px-2 py-1 rounded text-xs bg-white/10">
                {project.category}
              </span>
              <span className="text-xs opacity-50">
                {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* -------------------- Videos Tab -------------------- */
function VideosTab({ videos, deleteVideo }: any) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Videos</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg text-dark font-semibold bg-gradient-to-r from-green-500 to-teal-500"
        >
          <Plus size={20} />
          <span>Add Video</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video: VideoType) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg"
            whileHover={{ y: -5 }}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold">{video.title}</h3>
              <button
                onClick={() => deleteVideo(video.id)}
                className="p-2 rounded text-red-400 hover:bg-red-500/20"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <p className="text-sm opacity-70 mb-2">{video.description}</p>
            <div className="flex items-center justify-between">
              <span className="px-2 py-1 rounded text-xs bg-white/10">
                {video.description}
              </span>
              <span className="text-xs opacity-50">
                {new Date(video.createdAt).toLocaleDateString()}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* -------------------- Settings Tab -------------------- */
function SettingsTab({ tempSettings, setTempSettings, updateSettings }: any) {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">General Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Site Name</label>
            <input
              type="text"
              value={tempSettings.siteName}
              onChange={(e) =>
                setTempSettings({ ...tempSettings, siteName: e.target.value })
              }
              className="w-full px-3 py-2 rounded border-2 border-white/30 bg-white/5 backdrop-blur-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Site URL</label>
            <input
              type="text"
              value={tempSettings.siteUrl}
              onChange={(e) =>
                setTempSettings({ ...tempSettings, siteUrl: e.target.value })
              }
              className="w-full px-3 py-2 rounded border-2 border-white/30 bg-white/5 backdrop-blur-lg"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <motion.button
            onClick={() => updateSettings(tempSettings)}
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg text-dark font-semibold bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg"
          >
            <Save size={20} />
            <span>Save Settings</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
