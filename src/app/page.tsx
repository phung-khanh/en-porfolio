/* eslint-disable react/no-unescaped-entities */
"use client";

import SelectedWorks from "@/components/selected-works";
import avatarImg from "@/shared/assets/avatar.jpeg";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight, Github, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen pt-28 pb-12">
      <motion.div
        className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 md:grid-rows-6 gap-4 px-4 md:h-[130vh]"
        initial="hidden"
        animate="visible"
      >
        {/* Intro Box - Chiếm diện tích lớn nhất */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-8 md:row-span-3 bg-white rounded-[2.5rem] p-10 md:p-16 border border-neutral-100 flex flex-col justify-center"
        >
          <h1 className="font-serif text-5xl md:text-7xl leading-tight tracking-tighter mb-8">
            Hong Anh <br />
            <span className="text-neutral-300 italic">Graphic Desgin</span>
          </h1>
          <p className="text-neutral-500 text-lg max-w-lg leading-relaxed font-light">
            Khám phá sự giao thoa giữa nghệ thuật thị giác và sự tối giản. Tôi
            định hình cảm xúc thông qua những nét vẽ tinh tế và triết lý thiết
            kế bền vững từ Nhật Bản.
          </p>
        </motion.div>

        {/* Profile Image Box */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-4 md:row-span-2 bg-[#EBEBEB] rounded-[2.5rem] overflow-hidden group"
        >
          <Image
            src={avatarImg}
            alt="Profile"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
          />
        </motion.div>

        {/* Social Icons - Dựa trên style icon góc phải hình image_54a79a.png */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-4 md:row-span-1 grid grid-cols-3 gap-4"
        >
          {[Linkedin, Github, Instagram].map((Icon, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[1.5rem] flex items-center justify-center border border-neutral-100 hover:bg-[#BC002D] hover:text-white transition-colors cursor-pointer group"
            >
              <Icon size={24} strokeWidth={1.5} />
            </div>
          ))}
        </motion.div>

        {/* Works Preview - Chiếm vị trí trung tâm dưới */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-6 md:row-span-3 bg-white rounded-[2.5rem] border border-neutral-100 overflow-hidden p-8 flex flex-col"
        >
          <Link
            className="flex justify-between items-center mb-6"
            href="/projects"
          >
            <span className="text-[10px] uppercase tracking-widest text-neutral-400">
              Featured Works
            </span>
            <ArrowUpRight className="text-neutral-300" href="/projects" />
          </Link>
          <div className="flex-1 overflow-hidden">
            <SelectedWorks />
          </div>
        </motion.div>

        {/* Stack/Disciplines - Tương tự box "Stack I use" trong reference */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-3 md:row-span-3 bg-[#1a1a1a] text-white rounded-[2.5rem] p-8"
        >
          <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-8">
            Creative Stack
          </h3>
          <div className="space-y-6">
            {[
              "Figma",
              "Clip Studio Paint",
              "Adobe Illustrator",
              "Adobe Photoshop",
              "Adobe Premiere Pro",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between border-b border-neutral-800 pb-2"
              >
                <span className="font-light">{item}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA - Dựa trên box "Have a project in mind?" */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-3 md:row-span-3 bg-[#BC002D] text-white rounded-[2.5rem] p-8 flex flex-col justify-between"
        >
          <p className="text-2xl font-serif leading-tight">
            Sẵn sàng cho các dự án mới tại Đà Nẵng & Remote.
          </p>
          <Link
            href="/contact"
            className="bg-white text-black py-4 rounded-full text-center text-sm font-medium hover:scale-95 transition-transform"
          >
            Let's Talk ↗
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
