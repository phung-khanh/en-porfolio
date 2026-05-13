/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ProtectedRoute from "@/components/protect";
import { useAuth } from "@/shared/lib/auth-context";
import { AdminSettings, Project, Video as VideoType } from "@/shared/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Edit,
  Image as ImageIcon,
  LogOut,
  Settings,
  Trash2,
  Video,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  );
}

function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "projects" | "videos" | "settings"
  >("dashboard");
  const [projects, setProjects] = useState<Project[]>([]);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Tinh giản Settings ban đầu
  const initialSettings = {
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
  };

  const [settings, setSettings] = useState<AdminSettings>(initialSettings);
  const [tempSettings, setTempSettings] =
    useState<AdminSettings>(initialSettings);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingVideo, setEditingVideo] = useState<VideoType | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [p, v, s] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/videos"),
        fetch("/api/settings"),
      ]);
      if (p.ok) setProjects(await p.json());
      if (v.ok) setVideos(await v.json());
      if (s.ok) {
        const data = await s.json();
        setSettings(data);
        setTempSettings(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: "dashboard", label: "Overview", icon: BarChart3 },
    { id: "projects", label: "Projects", icon: ImageIcon },
    { id: "videos", label: "Motion", icon: Video },
    { id: "settings", label: "Config", icon: Settings },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7F3]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-[1px] bg-neutral-200 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-[#BC002D]"
              animate={{ x: [-48, 48] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "easeInOut",
              }}
            />
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">
            Zen Loading
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F3] text-neutral-900 font-sans">
      {/* Admin Sidebar/Navigation */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-12">
        {/* Left Side: Profile & Tabs */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-neutral-100 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-[#BC002D] rounded-full flex items-center justify-center text-white font-serif italic text-xl">
                A
              </div>
              <div>
                <h2 className="font-serif italic text-lg leading-none">
                  {user?.username}
                </h2>
                <span className="text-[10px] uppercase tracking-widest text-neutral-400">
                  Administrator
                </span>
              </div>
            </div>

            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-neutral-900 text-white"
                        : "hover:bg-neutral-50 text-neutral-500"
                    }`}
                  >
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                      {tab.label}
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="dot"
                        className="w-1 h-1 bg-[#BC002D] rounded-full"
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            <button
              onClick={logout}
              className="w-full mt-8 flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-all"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          <div className="hidden lg:block bg-neutral-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
            <p className="text-xs text-neutral-400 leading-relaxed mb-4 italic">
              "Great design is a multi-layered relationship between human life
              and its environment."
            </p>
            <div className="absolute -bottom-4 -right-4 opacity-10 rotate-12 group-hover:rotate-0 transition-transform">
              <Settings size={120} />
            </div>
          </div>
        </aside>

        {/* Right Side: Main Content area */}
        <main className="lg:col-span-9 space-y-6">
          <header className="flex justify-between items-end mb-4">
            <div>
              <h3 className="text-4xl font-serif italic tracking-tighter capitalize">
                {activeTab}.
              </h3>
              <p className="text-xs text-neutral-400 uppercase tracking-widest mt-1">
                Management Console
              </p>
            </div>
          </header>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "dashboard" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard
                    label="Live Projects"
                    value={projects.length}
                    color="bg-white"
                  />
                  <StatCard
                    label="Video Works"
                    value={videos.length}
                    color="bg-white"
                  />
                  <StatCard label="Last Login" value="Today" color="bg-white" />

                  <div className="md:col-span-3 bg-white rounded-[2.5rem] p-10 border border-neutral-100">
                    <h4 className="font-serif italic text-xl mb-6">
                      Quick Actions
                    </h4>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setActiveTab("projects")}
                        className="bg-[#F8F7F3] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-100 transition-all flex items-center gap-2"
                      >
                        Add New Work <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tái sử dụng các Tab cũ nhưng áp dụng Style mới */}
              {activeTab === "projects" && (
                <div className="bg-white rounded-[2.5rem] p-8 border border-neutral-100">
                  <div className="flex justify-between items-center mb-8">
                    <h4 className="font-serif italic text-xl">
                      Archive Management
                    </h4>
                    <button
                      onClick={() => setShowAddProject(true)}
                      className="bg-neutral-900 text-white px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold"
                    >
                      + Add Work
                    </button>
                  </div>
                  {/* Tích hợp lại ProjectsTab cũ ở đây nhưng với styling refined */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {projects.map((p) => (
                      <div
                        key={p.id}
                        className="p-4 border border-neutral-50 rounded-2xl flex justify-between items-center bg-neutral-50/50"
                      >
                        <div className="flex items-center gap-4">
                          <Image
                            src={p.image}
                            alt={p.title}
                            width={40}
                            height={40}
                            className="rounded-lg object-cover"
                          />
                          <span className="font-medium">{p.title}</span>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 hover:text-[#BC002D]">
                            <Edit size={16} />
                          </button>
                          <button className="p-2 hover:text-red-500">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-6">
                  <div className="bg-white rounded-[2.5rem] p-10 border border-neutral-100">
                    <h4 className="font-serif italic text-xl mb-8">
                      Site Configuration
                    </h4>
                    <div className="space-y-6 max-w-xl text-sm font-light">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-neutral-400">
                          Site Title
                        </label>
                        <input
                          className="w-full bg-transparent border-b border-neutral-200 py-2 focus:border-[#BC002D] outline-none"
                          value={tempSettings.siteTitle}
                          onChange={(e) =>
                            setTempSettings({
                              ...tempSettings,
                              siteTitle: e.target.value,
                            })
                          }
                        />
                      </div>
                      <button className="bg-neutral-900 text-white px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold mt-4 transition-all hover:bg-[#BC002D]">
                        Apply Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: any) {
  return (
    <div
      className={`${color} p-8 rounded-[2.5rem] border border-neutral-100 shadow-sm group hover:scale-[1.02] transition-transform`}
    >
      <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2">
        {label}
      </p>
      <p className="text-4xl font-serif italic">{value}</p>
    </div>
  );
}
