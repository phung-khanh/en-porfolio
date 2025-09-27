"use client";

import { Project } from "@/shared/types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SelectedWorks() {
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetchSelectedProjects();
  }, []);

  const fetchSelectedProjects = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/projects?featured=true");
      if (response.ok) {
        const projects = await response.json();
        setSelectedProjects(projects.slice(0, 6)); // Show max 6 projects
      } else {
        console.error("Failed to fetch featured projects:", response.status);
      }
    } catch (error) {
      console.error("Error fetching selected projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Use only real featured projects from database
  const displayProjects = selectedProjects;

  if (!isMounted || isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading featured projects...</p>
        </div>
      </div>
    );
  }

  if (displayProjects.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg mb-4">No featured projects yet</p>
        <p className="text-gray-400">
          Featured projects will appear here once they are added through the
          admin panel.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayProjects.map((project, index) => (
        <motion.div
          key={project.id}
          className="group cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
        >
          <div className="aspect-square bg-gray-100 rounded-sm mb-4 overflow-hidden">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-500 text-sm">No Image</span>
              </div>
            )}
          </div>
          <h3 className="text-sm font-medium tracking-wide uppercase mb-1 text-gray-900">
            {project.title}
          </h3>
          <p className="text-xs font-light text-gray-600">{project.category}</p>
        </motion.div>
      ))}
    </div>
  );
}
