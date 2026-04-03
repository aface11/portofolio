"use client";

import { motion } from "framer-motion";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-black/80 backdrop-blur-sm border-b border-white/10"
    >
      <a href="#hero" className="text-sm font-semibold tracking-widest uppercase text-white">
        Adam Copeland
      </a>
      <nav className="flex gap-8">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm text-white hover:text-white transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
