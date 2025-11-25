'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Home, Folder, FileText, Mail, Lock } from 'lucide-react';

export const Navbar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navItems = [
    { name: 'Home', link: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Projects', link: '/projects', icon: <Folder className="w-4 h-4" /> },
    { name: 'Resume', link: '/resume', icon: <FileText className="w-4 h-4" /> },
    { name: 'Contact', link: '/#contact', icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: -100 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50",
        "bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-8 py-3",
        "flex justify-center items-center gap-8 shadow-lg max-w-[90vw]"
      )}
    >
      <div className="flex items-center space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.link}
            className="relative px-3 py-1.5 text-sm font-medium text-neutral-300 hover:text-white transition-colors flex items-center space-x-1 group"
          >
            <span className="relative z-10 flex items-center space-x-1">
              {item.icon}
              <span className="hidden sm:inline">{item.name}</span>
            </span>
            <span className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200 ease-out" />
          </Link>
        ))}
      </div>
    </motion.nav>
  );
};
