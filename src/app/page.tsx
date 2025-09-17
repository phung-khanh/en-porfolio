"use client";

import avatarImg from "@/shared/assets/avatar.jpeg";
import { useTheme } from "@/shared/lib/theme-context";
import { motion } from "framer-motion";
import { ArrowRight, Code, Palette, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const { theme } = useTheme();

  const features = [
    {
      icon: Palette,
      title: "Visual Branding",
      description:
        "Crafting unique logos, color palettes, and brand systems that make you stand out.",
    },
    {
      icon: Sparkles,
      title: "Creative Direction",
      description:
        "Guiding concepts from sketch to final execution with a strong artistic vision.",
    },
    {
      icon: Code,
      title: "UI/UX Design",
      description:
        "Designing intuitive interfaces that blend aesthetics with functionality.",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Floating blurred gradient blobs (liquid glass look) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute w-[35rem] h-[35rem] rounded-full blur-3xl opacity-25"
          style={{ background: theme.primary }}
          animate={{ y: [0, -40, 0], x: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-0 bottom-0 w-[30rem] h-[30rem] rounded-full blur-3xl opacity-20"
          style={{ background: theme.secondary }}
          animate={{ y: [0, 50, 0], x: [0, -50, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Hero */}
      <section className="py-24 md:py-32 flex items-center">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-10 gap-10 items-center">
            {/* Avatar */}
            <motion.div
              className="md:col-span-3 flex justify-center md:justify-start"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="relative p-3 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl"
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 16 }}
              >
                <Image
                  src={avatarImg}
                  alt="Avatar"
                  width={300}
                  height={300}
                  className="rounded-2xl object-cover"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div
              className="md:col-span-7 text-center md:text-left"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <motion.div
                className="inline-flex items-center px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 mb-5"
                style={{ color: theme.primary }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles size={18} className="mr-2" />
                <span className="text-sm font-medium">Creative Designer</span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                <span className="block" style={{ color: theme.text }}>
                  Hi, I&apos;m
                </span>
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Hong Anh
                </span>
              </h1>

              <p
                className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto md:mx-0 mb-8"
                style={{ color: theme.text }}
              >
                Designing visuals that connect emotion and strategy. Let&apos;s
                make your brand unforgettable.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/projects"
                    className="inline-flex items-center px-6 py-3 rounded-full text-white font-semibold shadow-lg transition"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <span>View My Work</span>
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 rounded-full font-semibold border transition"
                    style={{ borderColor: theme.primary, color: theme.primary }}
                  >
                    Get In Touch
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  className="p-6 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                      style={{ background: theme.primary }}
                    >
                      <Icon className="text-white" size={20} />
                    </div>
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: theme.text }}
                    >
                      {f.title}
                    </h3>
                  </div>
                  <p
                    className="text-sm opacity-80"
                    style={{ color: theme.text }}
                  >
                    {f.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
