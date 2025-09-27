"use client";

import { useTheme } from "@/shared/lib/theme-context";
import { ContactForm } from "@/shared/types";
import { motion } from "framer-motion";
import { CheckCircle, Mail, MapPin, Phone, Send } from "lucide-react";
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
  const { theme } = useTheme();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "hello@honganh.com",
      description: "Send me an email anytime",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+84 (0) 123 456 789",
      description: "Mon-Fri from 9am to 6pm",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Ho Chi Minh City, Vietnam",
      description: "Available for remote work",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-6xl font-light mb-8 tracking-tight"
            style={{ color: theme.text }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Contact
          </motion.h1>
          <motion.p
            className="text-lg font-light max-w-2xl"
            style={{ color: theme.secondary }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ready to start your next project? Let's create something amazing
            together.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div>
                <h2
                  className="text-2xl font-light mb-6 tracking-wide"
                  style={{ color: theme.text }}
                >
                  Let's Connect
                </h2>
                <p
                  className="text-lg font-light leading-relaxed mb-8"
                  style={{ color: theme.secondary }}
                >
                  I'm always excited to work on new projects and collaborate
                  with creative minds. Whether you have a specific project in
                  mind or just want to chat about design, I'd love to hear from
                  you.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={info.title}
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    >
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                        <Icon size={20} style={{ color: theme.text }} />
                      </div>
                      <div>
                        <h3
                          className="text-sm font-medium tracking-wide uppercase mb-1"
                          style={{ color: theme.text }}
                        >
                          {info.title}
                        </h3>
                        <p
                          className="font-light mb-1"
                          style={{ color: theme.text }}
                        >
                          {info.value}
                        </p>
                        <p
                          className="text-sm font-light"
                          style={{ color: theme.secondary }}
                        >
                          {info.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-white border border-gray-200 p-8">
                <h3
                  className="text-lg font-light mb-8 tracking-wide"
                  style={{ color: theme.text }}
                >
                  Send a Message
                </h3>

                {isSubmitted ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle
                      size={48}
                      className="mx-auto mb-4"
                      style={{ color: theme.text }}
                    />
                    <h4
                      className="text-lg font-light mb-2"
                      style={{ color: theme.text }}
                    >
                      Message Sent!
                    </h4>
                    <p
                      className="font-light"
                      style={{ color: theme.secondary }}
                    >
                      Thank you for reaching out. I'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium tracking-wide uppercase mb-2"
                          style={{ color: theme.text }}
                        >
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-black transition-colors duration-300 bg-transparent"
                          style={{ color: theme.text }}
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium tracking-wide uppercase mb-2"
                          style={{ color: theme.text }}
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-black transition-colors duration-300 bg-transparent"
                          style={{ color: theme.text }}
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium tracking-wide uppercase mb-2"
                        style={{ color: theme.text }}
                      >
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-black transition-colors duration-300 bg-transparent"
                        style={{ color: theme.text }}
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium tracking-wide uppercase mb-2"
                        style={{ color: theme.text }}
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-black transition-colors duration-300 bg-transparent resize-none"
                        style={{ color: theme.text }}
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center space-x-2 px-6 py-4 border border-black text-black font-medium tracking-wide uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black hover:text-white"
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
