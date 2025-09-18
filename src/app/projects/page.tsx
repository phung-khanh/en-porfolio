"use client";

import { useTheme } from "@/shared/lib/theme-context";
import { Project } from "@/shared/types";
import { motion, useScroll, useTransform } from "framer-motion";
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
                  {/* Connector dot - liquid glass */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full
             backdrop-blur-md bg-white/20 border border-white/40
             shadow-sm"
                    whileHover={{
                      scale: 1.3,
                      boxShadow: "0 0 15px rgba(255,255,255,0.6)",
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  />

                  {/* Image card with liquid glass effect */}
                  <motion.div
                    className="w-full md:w-1/2 relative group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <div
                      className="relative rounded-2xl overflow-hidden
               backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg"
                      style={{ aspectRatio: "4/3" }}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      {/* light reflection overlay */}
                      <div
                        className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent
                 opacity-0 group-hover:opacity-20 transition-opacity"
                      />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    className="w-full md:w-1/2 space-y-3 p-6 rounded-xl
             backdrop-blur-2xl bg-white/10 border border-white/30 shadow-lg
             hover:shadow-2xl transition-all relative"
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 150, damping: 15 }}
                  >
                    <h3
                      className="text-2xl font-semibold drop-shadow-sm"
                      style={{ color: theme.text }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed opacity-80"
                      style={{ color: theme.text }}
                    >
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs
                   backdrop-blur-sm border border-white/20
                   bg-gradient-to-r from-pink-400/30 to-purple-400/30
                   shadow-sm"
                          style={{ color: theme.text }}
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
