"use client";

import { useTheme } from "@/shared/lib/theme-context";
import { Project } from "@/shared/types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SelectedWorks() {
  const { theme } = useTheme();
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchSelectedProjects();
  }, []);

  const fetchSelectedProjects = async () => {
    try {
      const response = await fetch("/api/projects?featured=true");
      if (response.ok) {
        const projects = await response.json();
        setSelectedProjects(projects.slice(0, 6)); // Show max 6 projects
      }
    } catch (error) {
      console.error("Error fetching selected projects:", error);
    }
  };

  // Fallback to mock data if no projects are available
  const displayProjects =
    selectedProjects.length > 0
      ? selectedProjects
      : [
          {
            id: "1",
            title: "Brand Identity",
            description:
              "Complete brand identity design for a modern tech startup",
            category: "Branding",
            image: "/api/placeholder/400/400",
            featured: true,
            createdAt: "2024-01-15",
          },
          {
            id: "2",
            title: "Mobile App Design",
            description:
              "User interface design for a productivity mobile application",
            category: "Mobile",
            image: "/api/placeholder/400/400",
            featured: true,
            createdAt: "2024-02-20",
          },
          {
            id: "3",
            title: "Website Redesign",
            description:
              "Modern website redesign with focus on user experience",
            category: "Web",
            image: "/api/placeholder/400/400",
            featured: true,
            createdAt: "2024-03-10",
          },
          {
            id: "4",
            title: "Print Campaign",
            description: "Creative print campaign for a fashion brand",
            category: "Print",
            image: "/api/placeholder/400/400",
            featured: true,
            createdAt: "2024-04-05",
          },
          {
            id: "5",
            title: "Packaging Design",
            description: "Sustainable packaging design for organic products",
            category: "Packaging",
            image: "/api/placeholder/400/400",
            featured: true,
            createdAt: "2024-05-12",
          },
          {
            id: "6",
            title: "Digital Illustration",
            description: "Custom illustrations for a children's book series",
            category: "Illustration",
            image: "/api/placeholder/400/400",
            featured: true,
            createdAt: "2024-06-18",
          },
        ];

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
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-sm">{project.title}</span>
            </div>
          </div>
          <h3
            className="text-sm font-medium tracking-wide uppercase mb-1"
            style={{ color: theme.text }}
          >
            {project.title}
          </h3>
          <p className="text-xs font-light" style={{ color: theme.secondary }}>
            {project.category}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
