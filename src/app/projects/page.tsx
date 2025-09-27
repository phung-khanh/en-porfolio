"use client";

import { useTheme } from "@/shared/lib/theme-context";
import { Project } from "@/shared/types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  // Mock projects for demonstration
  const mockProjects = [
    {
      id: "1",
      title: "Brand Identity",
      description: "Complete brand identity design for a modern tech startup",
      image: "/api/placeholder/400/300",
      category: "Branding",
      tags: ["Branding", "Logo", "Identity"],
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      title: "Mobile App Design",
      description:
        "User interface design for a productivity mobile application",
      image: "/api/placeholder/400/300",
      category: "Mobile",
      tags: ["UI/UX", "Mobile", "App"],
      createdAt: "2024-02-20",
    },
    {
      id: "3",
      title: "Website Redesign",
      description: "Modern website redesign with focus on user experience",
      image: "/api/placeholder/400/300",
      category: "Web",
      tags: ["Web Design", "UX", "Responsive"],
      createdAt: "2024-03-10",
    },
    {
      id: "4",
      title: "Print Campaign",
      description: "Creative print campaign for a fashion brand",
      image: "/api/placeholder/400/300",
      category: "Print",
      tags: ["Print", "Campaign", "Fashion"],
      createdAt: "2024-04-05",
    },
    {
      id: "5",
      title: "Packaging Design",
      description: "Sustainable packaging design for organic products",
      image: "/api/placeholder/400/300",
      category: "Packaging",
      tags: ["Packaging", "Sustainability", "Organic"],
      createdAt: "2024-05-12",
    },
    {
      id: "6",
      title: "Digital Illustration",
      description: "Custom illustrations for a children's book series",
      image: "/api/placeholder/400/300",
      category: "Illustration",
      tags: ["Illustration", "Children", "Book"],
      createdAt: "2024-06-18",
    },
  ];

  const displayProjects = projects.length > 0 ? projects : mockProjects;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-6xl font-light mb-8 tracking-tight"
            style={{ color: theme.text }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Works
          </motion.h1>
          <motion.p
            className="text-lg font-light max-w-2xl"
            style={{ color: theme.secondary }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A selection of projects that showcase my approach to design and
            creative problem-solving.
          </motion.p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto">
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
                    <span className="text-gray-500 text-sm">
                      {project.title}
                    </span>
                  </div>
                </div>
                <h3
                  className="text-sm font-medium tracking-wide uppercase mb-1"
                  style={{ color: theme.text }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-xs font-light mb-2"
                  style={{ color: theme.secondary }}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.tags?.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-light"
                      style={{ color: theme.secondary }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-2xl font-light mb-8 tracking-wide"
            style={{ color: theme.text }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Interested in working together?
          </motion.h2>
          <motion.p
            className="text-lg font-light mb-8 max-w-2xl mx-auto"
            style={{ color: theme.secondary }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Let's discuss your project and create something amazing together.
          </motion.p>
          <motion.a
            href="/contact"
            className="inline-block text-sm font-medium tracking-wide uppercase border-b border-black hover:opacity-60 transition-opacity duration-300"
            style={{ color: theme.text }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Get in touch
          </motion.a>
        </div>
      </section>
    </div>
  );
}
