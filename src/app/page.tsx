"use client";

import avatarImg from "@/shared/assets/avatar.jpeg";
import { useTheme } from "@/shared/lib/theme-context";
import { motion } from "framer-motion";
import { ArrowRight, Camera, Code, Palette, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const { theme } = useTheme();

  const features = [
    {
      icon: Palette,
      title: "Brand Identity",
      description: "Creating memorable visual identities that tell your story",
    },
    {
      icon: Camera,
      title: "Photography",
      description: "Capturing moments that speak volumes",
    },
    {
      icon: Code,
      title: "Digital Design",
      description: "Modern web and app designs that engage users",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Compact Hero */}
      <section className="relative py-20 md:py-28 flex items-center overflow-hidden">
        {/* Background Elements with iOS-style blur */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-ios"
            style={{ backgroundColor: theme.primary }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-ios"
            style={{ backgroundColor: theme.secondary }}
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10 blur-ios"
            style={{ backgroundColor: theme.accent }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-10 gap-10 items-center">
            {/* 3/7 split: Avatar (3) */}
            <motion.div
              className="md:col-span-3 flex justify-center md:justify-start"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="relative p-2 md:p-3 rounded-2xl glass-liquid glass-liquid-contrast avatar-ring"
                whileHover={{ rotate: 1.5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 16 }}
                style={{ backgroundColor: `${theme.primary}18` }}
              >
                <Image
                  src={avatarImg}
                  alt="Avatar"
                  width={320}
                  height={320}
                  className="w-48 h-48 md:w-72 md:h-72 rounded-2xl object-cover shadow-xl"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Content (7) */}
            <motion.div
              className="md:col-span-7 text-center md:text-left"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <motion.div
                className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full mb-5 glass-ios"
                style={{
                  backgroundColor: `${theme.primary}20`,
                  color: theme.primary,
                }}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles size={20} />
                <span className="text-xs md:text-sm font-medium">
                  Creative Designer
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold font-display mb-4">
                <span className="block" style={{ color: theme.text }}>
                  Hello, I&apos;m
                </span>
                <span
                  className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent h-full"
                  style={{
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 2px 16px rgba(0,0,0,0.12)",
                  }}
                >
                  Hong Anh
                </span>
              </h1>

              <p
                className="text-lg md:text-xl opacity-80 max-w-2xl md:max-w-3xl mb-8"
                style={{ color: theme.text }}
              >
                I create stunning visual experiences that blend creativity with
                strategy. From brand identity to digital design, I bring ideas
                to life.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/projects"
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:shadow-lg"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <span>View My Work</span>
                    <ArrowRight size={20} />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 border-2 hover:shadow-lg"
                    style={{
                      color: theme.primary,
                      borderColor: theme.primary,
                      backgroundColor: "transparent",
                    }}
                  >
                    <span>Get In Touch</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator removed for compactness */}
      </section>

      {/* Compact Services + CTA */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="p-6 rounded-xl hover-lift glass-ios"
                  style={{ backgroundColor: `${theme.primary}08` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: theme.primary }}
                    >
                      <Icon size={20} className="text-white" />
                    </div>
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: theme.text }}
                    >
                      {feature.title}
                    </h3>
                  </div>
                  <p
                    className="text-sm opacity-80"
                    style={{ color: theme.text }}
                  >
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 px-7 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:shadow-lg"
                style={{ backgroundColor: theme.primary }}
              >
                <span>Start a project</span>
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
