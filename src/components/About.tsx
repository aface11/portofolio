"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-32 px-8 bg-black">
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm tracking-widest uppercase text-white mb-6">About</p>
          <h2 className="text-4xl font-bold text-white leading-snug">
            20+ years of award-winning production across every format and scale.
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-5 text-white leading-relaxed"
        >
          <p>
            A career spanning 20+ years in production resulting in award-winning work across a broad spectrum
            of clients — from sports apparel (Nike, Adidas) to tech (Microsoft, Intel), gaming (Xbox, Pokémon,
            Activision), luxury (L&apos;Oréal, Louis Vuitton), food and beverage (Bacardi, Patrón), and pharma
            (Johnson &amp; Johnson), among others.
          </p>
          <p>
            Led large production teams and developed scalable in-house production, content creation, and
            creative services organizations. Fluent in all formats from traditional to digital, with robust
            localization expertise and the ability to flex from budget-restricted projects to high-profile
            multi-million dollar efforts.
          </p>
          <p>
            An adept manager of teams of 40+ employees with a strong background in creative talent management
            — including a first-hand view of high-profile talent, having served as Kanye West&apos;s assistant
            early in his career.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
