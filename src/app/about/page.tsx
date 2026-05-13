/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import avatarImg from "@/shared/assets/avatar.jpeg";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  return (
    <div className="min-h-screen bg-[#F8F7F3] pt-32 pb-20 px-4 md:px-8">
      <motion.div
        className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title Box */}
        <motion.div variants={itemVariants} className="md:col-span-12 mb-8">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#BC002D] font-bold mb-4 block">
            Story
          </span>
          <h1 className="text-5xl md:text-8xl font-serif italic tracking-tighter text-neutral-900">
            About.
          </h1>
        </motion.div>

        {/* Main Bio Box */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-7 bg-white rounded-[2.5rem] p-10 md:p-16 border border-neutral-100 flex flex-col justify-center shadow-sm"
        >
          <p className="text-2xl md:text-3xl font-serif italic leading-snug text-neutral-900 mb-8">
            "Thiết kế không chỉ là hình ảnh, mà là sự tĩnh lặng trong tâm hồn."
          </p>
          <div className="space-y-6 text-neutral-500 font-light leading-relaxed">
            <p>
              Khám phá sự giao thoa giữa nghệ thuật thị giác và sự tối giản. Tôi
              định hình cảm xúc thông qua những nét vẽ tinh tế và triết lý thiết
              kế bền vững từ Nhật Bản.
            </p>
            <p>
              Sinh sống tại Đà Nẵng, tôi mang hơi thở của biển cả và sự yên bình
              vào từng tác phẩm Graphic Design. Đối với tôi, mỗi khoảng trắng
              đều mang một thông điệp riêng, và cái đẹp nằm ở những điều đơn
              giản nhất.
            </p>
          </div>
        </motion.div>

        {/* Image Box */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-5 bg-[#EBEBEB] rounded-[2.5rem] overflow-hidden aspect-square md:aspect-auto"
        >
          <Image
            src={avatarImg}
            alt="Hong Anh"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </motion.div>

        {/* Skills Bento Box */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-4 bg-[#1a1a1a] text-white rounded-[2.5rem] p-10 flex flex-col justify-between"
        >
          <h3 className="text-[10px] uppercase tracking-widest text-neutral-500 mb-8">
            Expertise
          </h3>
          <div className="space-y-4">
            {[
              "Brand Identity",
              "Visual Design",
              "UI/UX Design",
              "Art Direction",
            ].map((skill) => (
              <div
                key={skill}
                className="flex items-center gap-3 border-b border-neutral-800 pb-3"
              >
                <div className="w-1 h-1 bg-[#BC002D] rounded-full" />
                <span className="text-sm font-light tracking-wide">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Philosophy Box */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-4 bg-white rounded-[2.5rem] p-10 border border-neutral-100 shadow-sm flex flex-col justify-center text-center"
        >
          <div className="text-4xl mb-4 text-[#BC002D]">禅</div>
          <h4 className="font-serif italic text-xl mb-4 text-neutral-900">
            Zen Philosophy
          </h4>
          <p className="text-xs text-neutral-400 leading-relaxed font-light">
            Tập trung vào bản chất, loại bỏ những chi tiết thừa thãi để đạt được
            sự cân bằng hoàn hảo.
          </p>
        </motion.div>

        {/* Contact CTA Box */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-4 bg-[#BC002D] text-white rounded-[2.5rem] p-10 flex flex-col justify-between group cursor-pointer"
        >
          <p className="text-xl font-light leading-tight">
            Bạn có ý tưởng cho dự án mới?
          </p>
          <Link
            href="/contact"
            className="flex items-center justify-between mt-8"
          >
            <span className="text-[10px] uppercase tracking-widest font-bold">
              Bắt đầu ngay
            </span>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#BC002D] transition-all">
              →
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
