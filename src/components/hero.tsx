'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { EncryptedText } from '@/components/ui/encrypted-text';
import { FloatingDock } from '@/components/ui/floating-dock';
import { IconBrandGithub, IconBrandLinkedin, IconBrandInstagram, IconMail, IconFileText } from '@tabler/icons-react';

export const Hero = () => {
  const links = [
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-300 hover:text-white transition-colors" />
      ),
      href: "https://github.com/Sathvik-Nagesh",
    },
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-blue-500" />
      ),
      href: "https://linkedin.com/in/sathvik-nagesh",
    },
    {
      title: "Instagram",
      icon: (
        <IconBrandInstagram className="h-full w-full text-pink-500" />
      ),
      href: "https://instagram.com/sathvik_nagesh",
    },
    {
      title: "Resume",
      icon: (
        <IconFileText className="h-full w-full text-neutral-300 hover:text-white transition-colors" />
      ),
      href: "/resume",
    },
    {
      title: "Contact",
      icon: (
        <IconMail className="h-full w-full text-yellow-500" />
      ),
      href: "#contact",
    },
  ];

  return (
    <div className="h-screen w-full bg-black relative flex flex-col md:flex-row items-center justify-center overflow-hidden">
      {/* Left Side: Text Content */}
      <div className="w-full md:w-1/2 relative z-10 flex flex-col justify-center px-6 md:px-20 h-full pt-20 md:pt-0 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pointer-events-auto"
        >
           <h1 className="text-5xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight">
            <EncryptedText text="Sathvik Nagesh" />
          </h1>
          <p className="mt-6 text-neutral-300 text-lg md:text-xl max-w-lg leading-relaxed">
            Cybersecurity Analyst & Full Stack Developer. <br />
            Building <span className="text-blue-400 font-semibold">secure</span>, <span className="text-purple-400 font-semibold">resilient</span>, and <span className="text-pink-400 font-semibold">beautiful</span> digital experiences.
          </p>
          
          <div className="mt-8 flex gap-4">
            <a href="#projects" className="px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-colors">
              View Work
            </a>
            <a href="#contact" className="px-8 py-3 rounded-full border border-neutral-700 text-white font-medium hover:bg-neutral-900 transition-colors">
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>

      {/* Right Side: Spline 3D Model */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full relative z-0">
        <Suspense fallback={<div className="w-full h-full bg-neutral-900 animate-pulse" />}>
          <Spline 
            className="w-full h-full"
            scene={process.env.NEXT_PUBLIC_SPLINE_SCENE_URL || "https://prod.spline.design/UkWUyqs1alAGkMgX/scene.splinecode"} 
          />
        </Suspense>
      </div>

      {/* Floating Dock */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <FloatingDock items={links} />
      </div>
    </div>
  );
};
