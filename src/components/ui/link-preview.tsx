"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type LinkPreviewProps = {
  url: string;
  className?: string;
  height?: string;
};

export const LinkPreview = ({
  url,
  className,
  height = "h-60",
}: LinkPreviewProps) => {
  const src = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;

  return (
    <div className={cn("relative group w-full", className)}>
        <div className={cn("overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 relative w-full", height)}>
            <Image
                src={src}
                alt="Website Preview"
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                unoptimized
            />
        </div>
    </div>
  );
};
