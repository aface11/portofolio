"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-8 max-w-5xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className="text-sm tracking-widest uppercase text-white mb-6">Contact</p>
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
          Let&apos;s make something.
        </h2>
        <p className="text-white mb-10 max-w-md mx-auto">
          Available for new projects, collaborations, and conversations.
        </p>
        <a
          href="mailto:aface1@gmail.com"
          className="inline-block px-8 py-4 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-700 transition-colors"
        >
          aface1@gmail.com
        </a>
      </motion.div>
    </section>
  );
}
