"use client";

import SelectedWorks from "@/components/selected-works";
import avatarImg from "@/shared/assets/avatar.jpeg";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Minimalist and Centered */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Avatar */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative inline-block">
              <Image
                src={avatarImg}
                alt="Hong Anh"
                width={200}
                height={200}
                className="rounded-full object-cover mx-auto shadow-lg"
                priority
              />
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="text-5xl md:text-7xl font-light mb-6 tracking-tight text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hong Anh
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Creative designer crafting visual experiences that connect emotion
            and strategy.
          </motion.p>

          {/* Navigation Links */}
          <motion.div
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="/projects"
              className="text-sm font-medium tracking-wide uppercase hover:opacity-60 transition-opacity duration-300 text-gray-900"
            >
              Works
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium tracking-wide uppercase hover:opacity-60 transition-opacity duration-300 text-gray-900"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium tracking-wide uppercase hover:opacity-60 transition-opacity duration-300 text-gray-900"
            >
              Contact
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Works Preview Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-2xl font-light mb-16 text-center tracking-wide text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Selected Works
          </motion.h2>

          <SelectedWorks />

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              href="/projects"
              className="inline-block text-sm font-medium tracking-wide uppercase border-b border-black hover:opacity-60 transition-opacity duration-300 text-gray-900"
            >
              View All Works
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
