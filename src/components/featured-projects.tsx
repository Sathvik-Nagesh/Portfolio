"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { LinkPreview } from "@/components/ui/link-preview";
import Link from "next/link";
import { Github } from "lucide-react";

export const FeaturedProjects = () => {
  const projects = [
    {
      id: 1,
      name: "Resumio",
      description: "An intelligent resume builder that uses AI to craft ATS-friendly resumes tailored to specific job descriptions. Built with Next.js and OpenAI for seamless content generation.",
      tech: "Next.js",
      link: "https://github.com/Sathvik-Nagesh/Resumio",
      demo: "https://resumio-v1.netlify.app/",
    },
    {
      id: 2,
      name: "lumi-ai",
      description: "A context-aware AI chatbot designed for portfolio interaction. Features real-time streaming responses and a sleek UI. Powered by Claude and Vercel AI SDK.",
      tech: "TypeScript",
      link: "https://github.com/Sathvik-Nagesh/lumi-ai",
      demo: "https://lumi-ai-three.vercel.app",
    },
    {
      id: 3,
      name: "convertly",
      description: "A versatile file conversion utility supporting multiple formats. Simple, fast, and secure file transformations directly in the browser using WebAssembly.",
      tech: "TypeScript",
      link: "https://github.com/Sathvik-Nagesh/convertly",
      demo: "https://sathvik-nagesh.github.io/convertly/",
    },
    {
      id: 4,
      name: "ascii-art-generator",
      description: "BRUTAL ASCII ART GENERATOR 🔥 A brutal, client-side ASCII art generator that converts images and text into NEO-BRUTALISM styled ASCII art. No server needed.",
      tech: "JavaScript",
      link: "https://github.com/Sathvik-Nagesh/ascii-art-generator",
      demo: "https://sathvik-nagesh.github.io/ascii-art-generator/",
    },
  ];

  return (
    <div className="py-8 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Featured Projects
          </h2>
          <p className="mt-2 text-neutral-400 text-lg">
            A selection of my recent work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <CardContainer key={project.id} className="inter-var">
              <CardBody className="bg-neutral-900 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  {project.name}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 line-clamp-3"
                >
                  {project.description}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <LinkPreview url={project.demo} className="w-full" height="h-60" />
                </CardItem>
                <div className="flex justify-between items-center mt-20">
                  <CardItem
                    translateZ={20}
                    as={Link}
                    href={project.link}
                    target="_blank"
                    className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                  >
                    <div className="flex items-center gap-2">
                       <Github className="w-4 h-4" /> GitHub
                    </div>
                  </CardItem>
                  <CardItem
                    translateZ={20}
                    as={Link}
                    href={project.demo}
                    target="_blank"
                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                  >
                    View Demo
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
        
        <div className="mt-12 text-center">
            <Link href="/projects" className="relative z-20 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-black bg-white hover:bg-neutral-200 md:py-4 md:text-lg md:px-10 transition-colors">
                View All Projects
            </Link>
        </div>
      </div>
    </div>
  );
};
