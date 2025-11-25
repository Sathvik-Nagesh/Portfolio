"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute h-full w-full inset-0 bg-neutral-950 overflow-hidden",
        className
      )}
    >
      <div className="absolute h-full w-full pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] h-[40rem] w-[40rem] bg-purple-500/20 blur-[100px] rounded-full mix-blend-screen opacity-50 animate-blob"></div>
      <div className="absolute top-[50%] left-[40%] -translate-x-[50%] -translate-y-[50%] h-[35rem] w-[35rem] bg-blue-500/20 blur-[100px] rounded-full mix-blend-screen opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute top-[60%] left-[60%] -translate-x-[50%] -translate-y-[50%] h-[30rem] w-[30rem] bg-pink-500/20 blur-[100px] rounded-full mix-blend-screen opacity-50 animate-blob animation-delay-4000"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
    </div>
  );
};
