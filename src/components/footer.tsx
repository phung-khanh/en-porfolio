"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-12 px-6">
      <motion.div
        className="max-w-[1200px] mx-auto bg-white border border-neutral-100 rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="text-center md:text-left">
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-2">
            Designed by
          </p>
          <h4 className="font-serif italic text-xl tracking-tighter">
            Hong Anh — 2026
          </h4>
        </div>

        {/* <div className="flex gap-8">
          {["Behance", "Dribbble", "Email"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs uppercase tracking-widest text-neutral-500 hover:text-[#BC002D] transition-colors"
            >
              {link}
            </a>
          ))}
        </div> */}

        <p className="text-[10px] text-neutral-300 font-light italic">
          Đà Nẵng City, Viet Nam
        </p>
      </motion.div>
    </footer>
  );
}
