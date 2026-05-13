/* eslint-disable react/no-unescaped-entities */
"use client";

import { ContactForm } from "@/shared/types";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle, Globe, Mail, MapPin } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const contactDetails = [
    { icon: Mail, label: "Email", value: "lethihonganh.danang@gmail.com" },
    { icon: MapPin, label: "Location", value: "Da Nang, Viet Nam" },
    {
      icon: Globe,
      label: "Availability",
      value: "Open for freelance & remote",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F3] pt-40 pb-20 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Header Section */}
        <header className="mb-20 border-b border-neutral-200 pb-12 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] uppercase tracking-[0.4em] text-[#BC002D] font-bold mb-4 block"
            >
              Get in touch
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-6xl md:text-8xl font-serif italic tracking-tighter text-neutral-900"
            >
              Contact.
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-light text-neutral-500 max-w-xs leading-relaxed italic"
          >
            Hãy để những ý tưởng lớn gặp nhau. Tôi luôn sẵn sàng lắng nghe về dự
            án Graphic Design tiếp theo của bạn.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Info Bento Style */}
          <motion.div
            className="lg:col-span-4 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {contactDetails.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-[2rem] border border-neutral-100 shadow-sm flex flex-col gap-4 group hover:border-[#BC002D] transition-colors"
              >
                <item.icon
                  size={20}
                  strokeWidth={1.5}
                  className="text-[#BC002D]"
                />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm font-medium text-neutral-900">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}

            <div className="bg-[#1a1a1a] p-8 rounded-[2rem] text-white flex flex-col justify-between aspect-square md:aspect-auto md:h-48">
              <p className="text-xs font-light text-neutral-400 leading-relaxed italic">
                "Cái đẹp nằm ở sự tối giản, và sự tối giản bắt đầu từ một cuộc
                trò chuyện chân thành."
              </p>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#BC002D] font-bold">
                Zen Mindset
              </div>
            </div>
          </motion.div>

          {/* Right: Form Section */}
          <motion.div
            className="lg:col-span-8 bg-white rounded-[3rem] p-10 md:p-16 border border-neutral-100 shadow-sm relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="w-16 h-16 bg-[#BC002D] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-red-100">
                    <CheckCircle size={32} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-serif italic mb-2">Arigato!</h3>
                  <p className="text-neutral-500 font-light">
                    Tin nhắn của bạn đã được gửi đi. Tôi sẽ phản hồi sớm nhất có
                    thể.
                  </p>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="group relative">
                      <label className="text-[10px] uppercase tracking-widest text-neutral-400 absolute -top-6">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-transparent border-b border-neutral-200 py-3 focus:outline-none focus:border-[#BC002D] transition-colors font-light"
                        placeholder="Hong Anh"
                      />
                    </div>
                    <div className="group relative">
                      <label className="text-[10px] uppercase tracking-widest text-neutral-400 absolute -top-6">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-transparent border-b border-neutral-200 py-3 focus:outline-none focus:border-[#BC002D] transition-colors font-light"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="group relative">
                    <label className="text-[10px] uppercase tracking-widest text-neutral-400 absolute -top-6">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-transparent border-b border-neutral-200 py-3 focus:outline-none focus:border-[#BC002D] transition-colors font-light"
                      placeholder="Branding Project / Illustration / UI UX"
                    />
                  </div>

                  <div className="group relative">
                    <label className="text-[10px] uppercase tracking-widest text-neutral-400 absolute -top-6">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full bg-transparent border-b border-neutral-200 py-3 focus:outline-none focus:border-[#BC002D] transition-colors font-light resize-none"
                      placeholder="Tell me about your vision..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex items-center gap-4 bg-[#1a1a1a] text-white px-12 py-5 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#BC002D] transition-all disabled:opacity-50"
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </motion.button>
                </form>
              )}
            </AnimatePresence>

            {/* Decorative Hanko-style element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border-[1px] border-neutral-50 rounded-full pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
