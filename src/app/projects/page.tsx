/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Project } from "@/shared/types";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  return (
    <div className="min-h-screen bg-[#F8F7F3]">
      {/* Header Section - Editorial Style */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-[1400px] mx-auto border-b border-neutral-200 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] uppercase tracking-[0.4em] text-[#BC002D] font-bold mb-4 block"
            >
              Selected Archive
            </motion.span>
            <motion.h1
              className="text-5xl md:text-8xl font-serif italic tracking-tighter text-neutral-900"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              Works
            </motion.h1>
          </div>
          <motion.p
            className="text-sm font-light max-w-xs text-neutral-500 leading-relaxed italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Sự tuyển tập các dự án tâm huyết, nơi ngôn ngữ thị giác gặp gỡ triết
            lý tối giản.
          </motion.p>
        </div>
      </section>

      {/* Projects Bento Grid */}
      <section className="pb-32 px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          {!isMounted || isLoading ? (
            <div className="flex flex-col justify-center items-center py-40">
              <div className="w-12 h-[1px] bg-neutral-300 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-[#BC002D]"
                  animate={{ x: [-48, 48] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-neutral-400 mt-4">
                Loading Portfolio
              </p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-40 bg-white rounded-[3rem] border border-dashed border-neutral-200">
              <p className="font-serif italic text-neutral-400">
                Chưa có tác phẩm nào được hiển thị.
              </p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-12 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {projects.map((project, index) => {
                // Tạo nhịp điệu ngẫu nhiên cho Bento (ô to, ô nhỏ)
                const isLarge = index % 3 === 0;
                return (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    className={`group relative rounded-[2.5rem] overflow-hidden bg-white border border-neutral-100 shadow-sm transition-all duration-500 hover:shadow-xl ${
                      isLarge ? "md:col-span-8" : "md:col-span-4"
                    }`}
                  >
                    <Link
                      href={`/projects/${project.id}`}
                      className="block h-full"
                    >
                      <div className="relative aspect-[16/10] md:aspect-auto md:h-[450px] overflow-hidden">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                          />
                        ) : (
                          <div className="w-full h-full bg-neutral-100" />
                        )}
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="absolute bottom-8 left-8 right-8 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-2xl font-serif italic">
                                {project.title}
                              </h3>
                              <p className="text-[10px] uppercase tracking-widest opacity-80 mt-1">
                                {project.tags?.join(" • ")}
                              </p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                              <ArrowUpRight size={20} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* Modern Contact Section (Bento Style) */}
      <section className="pb-20 px-4 md:px-8">
        <motion.div
          className="max-w-[1400px] mx-auto bg-[#1a1a1a] rounded-[3.5rem] p-12 md:p-24 text-center overflow-hidden relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Hanko-style Decorative Stamp */}
          <div className="absolute top-10 right-10 w-12 h-12 border border-neutral-700 text-neutral-700 flex items-center justify-center text-[10px] font-bold rotate-12">
            印
          </div>

          <h2 className="text-white text-4xl md:text-6xl font-serif italic mb-8 tracking-tighter">
            Hãy cùng tạo nên điều <br />{" "}
            <span className="text-[#BC002D]">tuyệt vời.</span>
          </h2>
          <p className="text-neutral-400 font-light mb-12 max-w-lg mx-auto text-sm leading-relaxed">
            Nếu bạn đang tìm kiếm một thiết kế mang đậm tính thủ công và sự tinh
            khiết, đừng ngần ngại kết nối.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#BC002D] hover:text-white transition-all duration-500"
          >
            Get In Touch <span>→</span>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
