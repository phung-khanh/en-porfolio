/* eslint-disable react/no-unescaped-entities */
"use client";

import { useTheme } from "@/shared/lib/theme-context";
import { motion } from "framer-motion";
import { ArrowRight, Camera, Code, Palette, Sparkles } from "lucide-react";
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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-8 glass-ios"
              style={{
                backgroundColor: `${theme.primary}20`,
                color: theme.primary,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles size={20} />
              <span className="text-sm font-medium">Creative Designer</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold font-display mb-6">
              <span className="block" style={{ color: theme.text }}>
                Hello, I&apos;m
              </span>
              <span
                className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Creative Designer
              </span>
            </h1>

            <p
              className="text-xl md:text-2xl opacity-80 max-w-3xl mx-auto mb-12"
              style={{ color: theme.text }}
            >
              I create stunning visual experiences that blend creativity with
              strategy. From brand identity to digital design, I bring ideas to
              life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/projects"
                  className="inline-flex items-center space-x-2 px-8 py-4 rounded-full text-white font-semibold transition-all duration-300 hover:shadow-lg"
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
                  className="inline-flex items-center space-x-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 border-2 hover:shadow-lg"
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

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div
            className="w-6 h-10 border-2 rounded-full flex justify-center"
            style={{ borderColor: theme.primary }}
          >
            <motion.div
              className="w-1 h-3 rounded-full mt-2"
              style={{ backgroundColor: theme.primary }}
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold font-display mb-6"
              style={{ color: theme.text }}
            >
              What I Do
            </h2>
            <p
              className="text-xl opacity-80 max-w-2xl mx-auto"
              style={{ color: theme.text }}
            >
              I specialize in creating visual experiences that connect with your
              audience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="text-center p-8 rounded-2xl hover-lift"
                  style={{ backgroundColor: `${theme.primary}05` }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
                    style={{ backgroundColor: theme.primary }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon size={32} className="text-white" />
                  </motion.div>
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{ color: theme.text }}
                  >
                    {feature.title}
                  </h3>
                  <p className="opacity-80" style={{ color: theme.text }}>
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20"
        style={{ backgroundColor: `${theme.primary}10` }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold font-display mb-6"
              style={{ color: theme.text }}
            >
              Ready to Start Your Project?
            </h2>
            <p
              className="text-xl opacity-80 mb-8"
              style={{ color: theme.text }}
            >
              Let's create something amazing together
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 px-8 py-4 rounded-full text-white font-semibold transition-all duration-300 hover:shadow-lg"
                style={{ backgroundColor: theme.primary }}
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
