"use client";

import { motion } from "framer-motion";

const productions = [
  {
    title: "Project Title",
    category: "Feature Film",
    year: "2024",
    description: "A brief description of this production and your role in bringing it to life.",
  },
  {
    title: "Project Title",
    category: "TV Series",
    year: "2023",
    description: "A brief description of this production and your role in bringing it to life.",
  },
  {
    title: "Project Title",
    category: "Documentary",
    year: "2022",
    description: "A brief description of this production and your role in bringing it to life.",
  },
];

export default function Work() {
  return (
    <section id="work" className="py-32 px-8 max-w-5xl mx-auto w-full">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-sm tracking-widest uppercase text-white mb-16"
      >
        Productions
      </motion.h2>
      <div className="divide-y divide-white/10">
        {productions.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="py-10 grid grid-cols-1 md:grid-cols-3 gap-4 group cursor-default"
          >
            <div>
              <p className="text-xs text-white uppercase tracking-wider mb-1">{item.category} · {item.year}</p>
              <h3 className="text-2xl font-semibold text-white group-hover:text-white transition-colors">
                {item.title}
              </h3>
            </div>
            <p className="md:col-span-2 text-white leading-relaxed self-center">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
