"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-8 pt-24 max-w-5xl mx-auto w-full"
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-sm tracking-widest uppercase text-gray-400 mb-4"
      >
        Executive Producer
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-6xl md:text-8xl font-bold tracking-tight text-gray-900 leading-none"
      >
        Adam
        <br />
        Copeland
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mt-8 text-xl text-gray-500 max-w-xl leading-relaxed"
      >
        Bringing stories to life — from development to delivery.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="mt-10 flex gap-4"
      >
        <a
          href="#work"
          className="px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-700 transition-colors"
        >
          View Work
        </a>
        <a
          href="#contact"
          className="px-6 py-3 border border-gray-300 text-gray-700 text-sm font-medium rounded-full hover:border-gray-900 hover:text-gray-900 transition-colors"
        >
          Get in Touch
        </a>
      </motion.div>
    </section>
  );
}
