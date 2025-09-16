"use client";

import { useTheme } from "@/shared/lib/theme-context";
import { Project } from "@/shared/types";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { theme } = useTheme();

  const categories = [
    "All",
    "Brand Identity",
    "Web Design",
    "Mobile Design",
    "Print Design",
    "Photography",
    "Social Media",
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const projectsData = await response.json();
        setProjects(projectsData);
        setFilteredProjects(projectsData);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (project) => project.category === selectedCategory
      );
    }

    setFilteredProjects(filtered);
  }, [projects, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      {/* Blurred ambient background shapes */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-20 -left-20 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-20"
          style={{
            background: `radial-gradient(closest-side, ${theme.primary}, transparent)`,
          }}
        />
        <div
          className="absolute bottom-0 right-[-10%] w-[42rem] h-[42rem] rounded-full blur-3xl opacity-10"
          style={{
            background: `radial-gradient(closest-side, ${theme.text}40, transparent)`,
          }}
        />
      </div>
      {/* Header Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="text-5xl md:text-6xl font-bold font-display mb-6"
              style={{ color: theme.text }}
            >
              My Projects
            </h1>
            <p
              className="text-xl opacity-80 max-w-2xl mx-auto"
              style={{ color: theme.text }}
            >
              A collection of my creative work and design projects
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            className="flex flex-col md:flex-row gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50"
                style={{ color: theme.text }}
              />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200 bg-opacity-50 backdrop-blur-md"
                style={{
                  backgroundColor: `${theme.background}CC`,
                  borderColor: `${theme.primary}30`,
                  color: theme.text,
                }}
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 backdrop-blur-sm ${
                    selectedCategory === category
                      ? "text-white"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  style={{
                    backgroundColor:
                      selectedCategory === category
                        ? theme.primary
                        : `${theme.primary}10`,
                    color: selectedCategory === category ? "white" : theme.text,
                    border: `1px solid ${theme.primary}30`,
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${searchTerm}-${selectedCategory}`}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: Math.min(index * 0.06, 0.3),
                  }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div
                    className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-opacity-60 backdrop-blur-md"
                    style={{ backgroundColor: theme.background }}
                  >
                    {/* Project Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                          style={{ backgroundColor: theme.primary }}
                        >
                          <ExternalLink size={24} className="text-white" />
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: theme.primary,
                            color: "white",
                          }}
                        >
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3
                        className="text-xl font-bold mb-2 group-hover:opacity-80 transition-opacity duration-200"
                        style={{ color: theme.text }}
                      >
                        {project.title}
                      </h3>
                      <p
                        className="text-sm opacity-80 mb-4 line-clamp-2"
                        style={{ color: theme.text }}
                      >
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded text-xs opacity-80 backdrop-blur-sm"
                            style={{
                              backgroundColor: `${theme.primary}20`,
                              color: theme.text,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span
                            className="px-2 py-1 rounded text-xs opacity-80 backdrop-blur-sm"
                            style={{
                              backgroundColor: `${theme.primary}20`,
                              color: theme.text,
                            }}
                          >
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Results */}
          {filteredProjects.length === 0 && (
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
                🔍
              </div>
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: theme.text }}
              >
                No projects found
              </h3>
              <p className="opacity-70" style={{ color: theme.text }}>
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
