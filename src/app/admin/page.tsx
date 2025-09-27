/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import ProtectedRoute from "@/components/protect";
import { useAuth } from "@/shared/lib/auth-context";
import { AdminSettings, Project, Video as VideoType } from "@/shared/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Database,
  Edit,
  Image,
  LogOut,
  Plus,
  Save,
  Settings,
  Trash2,
  Upload,
  User,
  Video,
  X,
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
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<
    "dashboard" | "projects" | "videos" | "settings"
  >("dashboard");
  const [projects, setProjects] = useState<Project[]>([]);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<AdminSettings>({
    siteTitle: "Portfolio",
    siteDescription: "",
    headerText: "",
    footerText: "",
    socialLinks: {
      instagram: "",
      dribbble: "",
      linkedin: "",
      twitter: "",
      github: "",
    },
  });
  const [tempSettings, setTempSettings] = useState<AdminSettings>({
    siteTitle: "Portfolio",
    siteDescription: "",
    headerText: "",
    footerText: "",
    socialLinks: {
      instagram: "",
      dribbble: "",
      linkedin: "",
      twitter: "",
      github: "",
    },
  });
  const [newProject, setNewProject] = useState<Partial<Project>>({});
  const [newVideo, setNewVideo] = useState<Partial<VideoType>>({});
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingVideo, setEditingVideo] = useState<VideoType | null>(null);
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
        setSettings(settingsData);
        setTempSettings(settingsData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /* -------------------- Update Settings -------------------- */
  const updateSettings = async (newSettings: AdminSettings) => {
    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSettings),
      });

      if (response.ok) {
        const updatedSettings = await response.json();
        setSettings(updatedSettings);
        setTempSettings(updatedSettings);
        alert("Settings saved successfully!");
      } else {
        throw new Error("Failed to save settings");
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      alert("Failed to save settings. Please try again.");
    }
  };

  /* -------------------- Handlers -------------------- */

  const addProject = async (data: FormData | any) => {
    try {
      setIsUploading(true);

      let response;
      if (data instanceof FormData) {
        response = await fetch("/api/projects", {
          method: "POST",
          body: data,
        });
      } else {
        response = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }

      if (response.ok) {
        const project = await response.json();
        setProjects((prev) => [project, ...prev]);
        setNewProject({});
        setShowAddProject(false);
      } else {
        const errorData = await response.json();
        console.error("Error adding project:", errorData);
        alert(`Error: ${errorData.error || "Failed to add project"}`);
      }
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Error adding project. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const updateProject = async (id: string, data: Partial<Project>) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedProject = await response.json();
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? updatedProject : p))
        );
        setEditingProject(null);
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const addVideo = async (data: Partial<VideoType>) => {
    try {
      const response = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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

  const updateVideo = async (id: string, data: Partial<VideoType>) => {
    try {
      const response = await fetch(`/api/videos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedVideo = await response.json();
        setVideos((prev) => prev.map((v) => (v.id === id ? updatedVideo : v)));
        setEditingVideo(null);
      }
    } catch (error) {
      console.error("Error updating video:", error);
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
    { id: "projects", label: "Projects", icon: Image },
    { id: "videos", label: "Videos", icon: Video },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  /* -------------------- Loading -------------------- */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center  backdrop-blur-3xl">
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center py-6">
          <div>
            <h1 className="text-3xl font-light tracking-tight text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-sm opacity-70 mt-1">
              Manage your content & settings
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-50">
              <User size={20} />
              <span className="text-sm font-medium">{user?.username}</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 transition-all text-red-600"
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gray-900 text-white"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
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
            {activeTab === "projects" && (
              <ProjectsTab
                projects={projects}
                deleteProject={deleteProject}
                addProject={addProject}
                updateProject={updateProject}
                showAddProject={showAddProject}
                setShowAddProject={setShowAddProject}
                editingProject={editingProject}
                setEditingProject={setEditingProject}
                isUploading={isUploading}
              />
            )}
            {activeTab === "videos" && (
              <VideosTab
                videos={videos}
                deleteVideo={deleteVideo}
                addVideo={addVideo}
                updateVideo={updateVideo}
                showAddVideo={showAddVideo}
                setShowAddVideo={setShowAddVideo}
                editingVideo={editingVideo}
                setEditingVideo={setEditingVideo}
              />
            )}
            {activeTab === "settings" && (
              <SettingsTab
                tempSettings={tempSettings}
                setTempSettings={setTempSettings}
                updateSettings={updateSettings}
                projects={projects}
                setProjects={setProjects}
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
          className="p-6 rounded-lg bg-white border border-gray-200 shadow-sm"
          whileHover={{ scale: 1.02, y: -2 }}
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
              className={`p-3 rounded-lg bg-gradient-to-r ${card.color}`}
            >
              <card.icon size={28} className="text-white" />
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* -------------------- Projects Tab -------------------- */
function ProjectsTab({
  projects,
  deleteProject,
  addProject,
  updateProject,
  showAddProject,
  setShowAddProject,
  editingProject,
  setEditingProject,
  isUploading,
}: any) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    image: "",
    featured: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleImageUpload = async (file: File) => {
    setIsUploadingImage(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("folder", "projects");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (response.ok) {
        const result = await response.json();
        setFormData({ ...formData, image: result.url });
        setImagePreview(result.url);
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setFormData({ ...formData, image: "" }); // Clear URL when file is selected
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      handleImageUpload(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      await updateProject(editingProject.id, formData);
    } else {
      // For new projects, send as JSON if image is URL, or FormData if file upload
      if (imageFile) {
        const formDataObj = new FormData();
        formDataObj.append("title", formData.title);
        formDataObj.append("description", formData.description);
        formDataObj.append("category", formData.category);
        formDataObj.append("tags", formData.tags);
        formDataObj.append("featured", formData.featured.toString());
        formDataObj.append("file", imageFile);
        await addProject(formDataObj);
      } else if (formData.image) {
        // Send as JSON for URL-based images
        const projectData = {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          tags: formData.tags
            ? formData.tags.split(",").map((tag: string) => tag.trim())
            : [],
          image: formData.image,
          featured: formData.featured,
        };
        await addProject(projectData);
      } else {
        alert("Please upload an image or enter an image URL");
        return;
      }
    }
    setFormData({
      title: "",
      description: "",
      category: "",
      tags: "",
      image: "",
      featured: false,
    });
    setImageFile(null);
    setImagePreview("");
    setShowAddProject(false);
    setEditingProject(null);
  };

  const handleEdit = (project: Project) => {
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      tags: project.tags.join(", "),
      image: project.image,
      featured: project.featured || false,
    });
    setImagePreview(project.image);
    setEditingProject(project);
    setShowAddProject(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-medium bg-gray-900 hover:bg-gray-800"
          onClick={() => {
            setShowAddProject(!showAddProject);
            setEditingProject(null);
            setFormData({
              title: "",
              description: "",
              category: "",
              tags: "",
              image: "",
              featured: false,
            });
            setImageFile(null);
            setImagePreview("");
          }}
        >
          <Plus size={20} />
          <span>Add Project</span>
        </motion.button>
      </div>

      {/* Add/Edit Project Form */}
      {showAddProject && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-lg bg-white border border-gray-200 shadow-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">
              {editingProject ? "Edit Project" : "Add New Project"}
            </h3>
            <button
              onClick={() => {
                setShowAddProject(false);
                setEditingProject(null);
                setFormData({
                  title: "",
                  description: "",
                  category: "",
                  tags: "",
                  image: "",
                  featured: false,
                });
                setImageFile(null);
                setImagePreview("");
              }}
              className="p-2 rounded text-gray-400 hover:bg-gray-500/20"
            >
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded border border-gray-300 bg-white focus:border-gray-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded border border-gray-300 bg-white focus:border-gray-500 focus:outline-none"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 rounded border border-gray-300 bg-white focus:border-gray-500 focus:outline-none"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                className="w-full px-3 py-2 rounded border border-gray-300 bg-white focus:border-gray-500 focus:outline-none"
                placeholder="design, web, mobile"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Project Image
              </label>
              <div className="space-y-3">
                {/* File Upload */}
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {isUploadingImage ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                          <span className="text-sm text-gray-500">
                            Uploading...
                          </span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 mb-2 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF (MAX. 10MB)
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      id="image-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                {/* Image Preview */}
                {imagePreview && (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview("");
                        setFormData({ ...formData, image: "" });
                        setImageFile(null);
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                {/* Manual URL Input (Optional) */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Or enter image URL manually:
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => {
                      setFormData({ ...formData, image: e.target.value });
                      setImagePreview(e.target.value);
                      setImageFile(null); // Clear file when URL is entered
                    }}
                    className="w-full px-3 py-2 text-sm rounded border border-gray-300 bg-white focus:border-gray-500 focus:outline-none"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="w-4 h-4 rounded"
              />
              <label htmlFor="featured" className="text-sm font-medium">
                Featured Project
              </label>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddProject(false);
                  setEditingProject(null);
                  setFormData({
                    title: "",
                    description: "",
                    category: "",
                    tags: "",
                    image: "",
                    featured: false,
                  });
                  setImageFile(null);
                  setImagePreview("");
                }}
                className="px-4 py-2 rounded text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-2 px-6 py-2 rounded-lg text-white font-medium bg-gray-900 hover:bg-gray-800"
                disabled={isUploading}
              >
                <Save size={20} />
                <span>
                  {isUploading
                    ? "Saving..."
                    : editingProject
                    ? "Update"
                    : "Add"}{" "}
                  Project
                </span>
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: Project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-lg bg-white border border-gray-200 shadow-sm"
            whileHover={{ y: -2 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="font-semibold">{project.title}</h3>
                {project.featured && (
                  <span className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded mt-1">
                    Featured
                  </span>
                )}
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 rounded text-blue-600 hover:bg-blue-50"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="p-2 rounded text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <p className="text-sm opacity-70 mb-2">{project.description}</p>
            <div className="flex items-center justify-between">
              <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
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
function VideosTab({
  videos,
  deleteVideo,
  addVideo,
  updateVideo,
  showAddVideo,
  setShowAddVideo,
  editingVideo,
  setEditingVideo,
}: any) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    youtubeUrl: "",
    thumbnail: "",
  });
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);

  const handleThumbnailUpload = async (file: File) => {
    setIsUploadingThumbnail(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("folder", "videos");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (response.ok) {
        const result = await response.json();
        setFormData({ ...formData, thumbnail: result.url });
        setThumbnailPreview(result.url);
      } else {
        console.error("Failed to upload thumbnail");
      }
    } catch (error) {
      console.error("Error uploading thumbnail:", error);
    } finally {
      setIsUploadingThumbnail(false);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      handleThumbnailUpload(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingVideo) {
      await updateVideo(editingVideo.id, formData);
    } else {
      await addVideo(formData);
    }
    setFormData({ title: "", description: "", youtubeUrl: "", thumbnail: "" });
    setThumbnailFile(null);
    setThumbnailPreview("");
    setShowAddVideo(false);
    setEditingVideo(null);
  };

  const handleEdit = (video: VideoType) => {
    setFormData({
      title: video.title,
      description: video.description,
      youtubeUrl: video.youtubeUrl || "",
      thumbnail: video.thumbnail || "",
    });
    setThumbnailPreview(video.thumbnail || "");
    setEditingVideo(video);
    setShowAddVideo(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Videos</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-medium bg-gray-900 hover:bg-gray-800"
          onClick={() => {
            setShowAddVideo(!showAddVideo);
            setEditingVideo(null);
            setFormData({
              title: "",
              description: "",
              youtubeUrl: "",
              thumbnail: "",
            });
            setThumbnailFile(null);
            setThumbnailPreview("");
          }}
        >
          <Plus size={20} />
          <span>Add Video</span>
        </motion.button>
      </div>

      {/* Add/Edit Video Form */}
      {showAddVideo && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">
              {editingVideo ? "Edit Video" : "Add New Video"}
            </h3>
            <button
              onClick={() => {
                setShowAddVideo(false);
                setEditingVideo(null);
                setFormData({
                  title: "",
                  description: "",
                  youtubeUrl: "",
                  thumbnail: "",
                });
                setThumbnailFile(null);
                setThumbnailPreview("");
              }}
              className="p-2 rounded text-gray-400 hover:bg-gray-500/20"
            >
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 rounded border border-gray-300 bg-white focus:border-gray-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 rounded border border-gray-300 bg-white focus:border-gray-500 focus:outline-none"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                YouTube URL
              </label>
              <input
                type="url"
                value={formData.youtubeUrl}
                onChange={(e) =>
                  setFormData({ ...formData, youtubeUrl: e.target.value })
                }
                className="w-full px-3 py-2 rounded border border-gray-300 bg-white focus:border-gray-500 focus:outline-none"
                placeholder="https://www.youtube.com/watch?v=..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Video Thumbnail
              </label>
              <div className="space-y-3">
                {/* File Upload */}
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="thumbnail-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {isUploadingThumbnail ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                          <span className="text-sm text-gray-500">
                            Uploading...
                          </span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 mb-2 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            thumbnail
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF (MAX. 10MB)
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      id="thumbnail-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                    />
                  </label>
                </div>

                {/* Thumbnail Preview */}
                {thumbnailPreview && (
                  <div className="relative">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail Preview"
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setThumbnailPreview("");
                        setFormData({ ...formData, thumbnail: "" });
                        setThumbnailFile(null);
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                {/* Manual URL Input (Optional) */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Or enter thumbnail URL manually:
                  </label>
                  <input
                    type="url"
                    value={formData.thumbnail}
                    onChange={(e) => {
                      setFormData({ ...formData, thumbnail: e.target.value });
                      setThumbnailPreview(e.target.value);
                    }}
                    className="w-full px-3 py-2 text-sm rounded border border-gray-300 bg-white focus:border-gray-500 focus:outline-none"
                    placeholder="https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddVideo(false);
                  setEditingVideo(null);
                  setFormData({
                    title: "",
                    description: "",
                    youtubeUrl: "",
                    thumbnail: "",
                  });
                  setThumbnailFile(null);
                  setThumbnailPreview("");
                }}
                className="px-4 py-2 rounded text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-2 px-6 py-2 rounded-lg text-white font-medium bg-gray-900 hover:bg-gray-800"
              >
                <Save size={20} />
                <span>{editingVideo ? "Update" : "Add"} Video</span>
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video: VideoType) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-lg bg-white border border-gray-200 shadow-sm"
            whileHover={{ y: -2 }}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold">{video.title}</h3>
              <div className="flex space-x-1">
                <button
                  onClick={() => handleEdit(video)}
                  className="p-2 rounded text-blue-600 hover:bg-blue-50"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => deleteVideo(video.id)}
                  className="p-2 rounded text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <p className="text-sm opacity-70 mb-2">{video.description}</p>
            <div className="flex items-center justify-between">
              <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                YouTube
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
function SettingsTab({
  tempSettings,
  setTempSettings,
  updateSettings,
  projects,
  setProjects,
}: any) {
  const toggleFeatured = async (projectId: string) => {
    const project = projects.find((p: Project) => p.id === projectId);
    if (!project) return;

    const updatedProject = { ...project, featured: !project.featured };

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: updatedProject.featured }),
      });

      if (response.ok) {
        const result = await response.json();
        setProjects((prev: Project[]) =>
          prev.map((p) => (p.id === projectId ? updatedProject : p))
        );
      }
    } catch (error) {
      console.error("Error updating featured status:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Featured Projects */}
      <div className="p-6 rounded-lg bg-white border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
        <p className="text-sm opacity-70 mb-4">
          Select which projects should be featured on the home page
        </p>
        <div className="space-y-3">
          {projects.map((project: Project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-200"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-medium">{project.title}</h3>
                  <p className="text-sm opacity-70">{project.category}</p>
                </div>
              </div>
              <button
                onClick={() => toggleFeatured(project.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  project.featured
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {project.featured ? "Featured" : "Make Featured"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
