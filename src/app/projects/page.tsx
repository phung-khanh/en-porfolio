"use client";

import { useTheme } from "@/shared/lib/theme-context";
import { Project } from "@/shared/types";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { theme } = useTheme();
  const ref = useRef(null);

  const categories = [
    "All",
    "Web Design",
    "Mobile Design",
    "Branding",
    "Print",
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
        setFilteredProjects(data);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    setFilteredProjects(filtered);
  }, [projects, searchTerm, selectedCategory]);

  // Animate the timeline line on scroll
  const { scrollYProgress } = useScroll({ target: ref });
  const wave = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={ref}
      className="min-h-screen pt-24 pb-20 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4">
        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-12"
          style={{ color: theme.text }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My Projects
        </motion.h1>

        {/* Search + Categories */}
        <div className="flex flex-col md:flex-row gap-4 mb-16">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50"
              style={{ color: theme.text }}
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none backdrop-blur-lg shadow-sm"
              style={{
                backgroundColor: `${theme.background}CC`,
                borderColor: `${theme.primary}30`,
                color: theme.text,
              }}
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  selectedCategory === c
                    ? "scale-105 shadow-md"
                    : "opacity-70 hover:opacity-100"
                }`}
                style={{
                  backgroundColor:
                    selectedCategory === c
                      ? theme.primary
                      : `${theme.primary}15`,
                  color: selectedCategory === c ? "white" : theme.text,
                  border: `1px solid ${theme.primary}30`,
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated wave-like timeline line */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-transparent via-pink-400 to-transparent rounded-full"
            style={{
              height: wave, // grows with scroll
            }}
          />

          <div className="space-y-24">
            {filteredProjects.map((project, idx) => {
              const isLeft = idx % 2 === 0;

              return (
                <motion.div
                  key={project.id}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, y: 60, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  {/* Connector dot */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-2 bg-white z-10 shadow-md"
                    style={{ borderColor: theme.primary }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />

                  {/* Image card with liquid glass effect */}
                  <motion.div
                    className="w-full md:w-1/2"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <div
                      className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-white/10 shadow-xl border border-white/20"
                      style={{ aspectRatio: "4/3" }}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    className="w-full md:w-1/2 space-y-3 p-4 rounded-xl backdrop-blur-lg bg-white/5 border border-white/20 shadow-md"
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 150 }}
                  >
                    <h3
                      className="text-2xl font-semibold"
                      style={{ color: theme.text }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="text-sm opacity-80"
                      style={{ color: theme.text }}
                    >
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded text-xs backdrop-blur-sm shadow-sm"
                          style={{
                            backgroundColor: `${theme.primary}30`,
                            color: theme.text,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p
                      className="text-xs opacity-60"
                      style={{ color: theme.text }}
                    >
                      {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
