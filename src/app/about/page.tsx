"use client";

import avatarImg from "@/shared/assets/avatar.jpeg";
import { useTheme } from "@/shared/lib/theme-context";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-6xl font-light mb-8 tracking-tight"
            style={{ color: theme.text }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About
          </motion.h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="space-y-6">
                <p
                  className="text-lg font-light leading-relaxed"
                  style={{ color: theme.secondary }}
                >
                  I'm a creative designer passionate about crafting visual
                  experiences that tell compelling stories. With a focus on
                  minimalism and functionality, I help brands communicate their
                  essence through thoughtful design.
                </p>

                <p
                  className="text-lg font-light leading-relaxed"
                  style={{ color: theme.secondary }}
                >
                  Based in Vietnam, I work with clients worldwide to create
                  memorable visual identities and digital experiences. My
                  approach combines strategic thinking with creative execution
                  to deliver solutions that are both beautiful and effective.
                </p>

                <p
                  className="text-lg font-light leading-relaxed"
                  style={{ color: theme.secondary }}
                >
                  When I'm not designing, you can find me exploring new places,
                  capturing moments through photography, or experimenting with
                  different creative mediums.
                </p>
              </div>

              {/* Skills */}
              <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3
                  className="text-sm font-medium tracking-wide uppercase mb-6"
                  style={{ color: theme.text }}
                >
                  Skills
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p
                      className="text-sm font-light"
                      style={{ color: theme.secondary }}
                    >
                      Brand Identity
                    </p>
                    <p
                      className="text-sm font-light"
                      style={{ color: theme.secondary }}
                    >
                      Visual Design
                    </p>
                    <p
                      className="text-sm font-light"
                      style={{ color: theme.secondary }}
                    >
                      UI/UX Design
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p
                      className="text-sm font-light"
                      style={{ color: theme.secondary }}
                    >
                      Art Direction
                    </p>
                    <p
                      className="text-sm font-light"
                      style={{ color: theme.secondary }}
                    >
                      Photography
                    </p>
                    <p
                      className="text-sm font-light"
                      style={{ color: theme.secondary }}
                    >
                      Creative Strategy
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="aspect-[4/5] bg-gray-100 rounded-sm overflow-hidden">
                <Image
                  src={avatarImg}
                  alt="Hong Anh"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
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
            Let's work together
          </motion.h2>
          <motion.p
            className="text-lg font-light mb-8 max-w-2xl mx-auto"
            style={{ color: theme.secondary }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Have a project in mind? I'd love to hear about it.
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
