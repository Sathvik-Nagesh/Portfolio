'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Mail, Phone, MapPin, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { TracingBeam } from '@/components/ui/tracing-beam';
import Link from 'next/link';

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-4 md:px-8">
      <TracingBeam className="px-6">
        <div className="max-w-3xl mx-auto antialiased pt-4 relative bg-black/40 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                        Sathvik N
                    </h1>
                    <p className="text-neutral-400 text-xl mt-2">
                        Cybersecurity Analyst
                    </p>
                </div>
                <Link href="/resume.pdf" download="Sathvik_N_Resume.pdf">
                    <Button className="bg-white text-black hover:bg-neutral-200 hidden md:flex">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                    </Button>
                </Link>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-neutral-400 border-b border-neutral-800 pb-6">
                <a href="mailto:Srushtisathvik@gmail.com" className="flex items-center hover:text-white transition-colors">
                    <Mail className="w-4 h-4 mr-2" /> Srushtisathvik@gmail.com
                </a>
                <span className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" /> +91 94809 44727
                </span>
                <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" /> Bangalore
                </span>
                <Link href="https://github.com/Sathvik-Nagesh" target="_blank" className="flex items-center hover:text-white transition-colors">
                    <Github className="w-4 h-4 mr-2" /> github.com/Sathvik-Nagesh
                </Link>
            </div>
          </motion.div>

          <div className="space-y-12">
            {/* Summary */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white border-b border-neutral-800 pb-2">Professional Summary</h2>
              <p className="text-neutral-300 leading-relaxed">
                Dedicated and detail-oriented Cybersecurity Analyst with over two years of hands-on experience. Skilled in ethical hacking, networking, and cybersecurity auditing with a proven ability to manage sensitive information and contribute to critical operations. Looking to grow in a challenging role focused on cybersecurity, leadership, and innovation.
              </p>
            </section>

            {/* Experience */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white border-b border-neutral-800 pb-2">Experience</h2>
              <div className="space-y-8">
                <div className="relative pl-8 border-l border-neutral-800">
                  <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-blue-500" />
                  <div className="flex flex-col sm:flex-row justify-between items-baseline mb-2">
                    <h3 className="text-xl font-medium text-white">Internship</h3>
                    <span className="text-neutral-500 text-sm">June 2025 - August 2025</span>
                  </div>
                  <p className="text-neutral-400 mb-2">Sanna Innovation & Hi papa</p>
                  <ul className="list-disc list-inside text-neutral-300 space-y-1 text-sm">
                    <li>Supported deployment and maintenance of client websites on shared and VPS hosting platforms.</li>
                    <li>Monitored server performance, performed backups, and implemented basic security hardening measures.</li>
                  </ul>
                </div>
                
                 <div className="relative pl-8 border-l border-neutral-800">
                  <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-purple-500" />
                  <div className="flex flex-col sm:flex-row justify-between items-baseline mb-2">
                    <h3 className="text-xl font-medium text-white">Internship</h3>
                    <span className="text-neutral-500 text-sm">2020 - Present</span>
                  </div>
                  <p className="text-neutral-400 mb-2">Texial</p>
                  <ul className="list-disc list-inside text-neutral-300 space-y-1 text-sm">
                    <li>Conducted audits of systems, processes, and policies to ensure compliance with security standards.</li>
                    <li>Gained exposure to real-world security scenarios and audit reporting.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white border-b border-neutral-800 pb-2">Education</h2>
              <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium text-white">Bachelor of Computer Applications</h3>
                    <p className="text-neutral-400">KLE Society’s Degree College</p>
                    <p className="text-sm text-neutral-500">Ongoing</p>
                </div>
                <div>
                    <h3 className="text-lg font-medium text-white">Community College Initiative Program (CCI)</h3>
                    <p className="text-neutral-400">Valencia College, Orlando, FL, USA</p>
                    <p className="text-sm text-neutral-500">2022 - 2023</p>
                    <ul className="list-disc list-inside text-neutral-300 space-y-1 text-sm mt-2">
                        <li>Non-degree one-year exchange program with specialization in Cybersecurity.</li>
                        <li>Selected as a Youth Ambassador through the US Department of State.</li>
                    </ul>
                </div>
                 <div>
                    <h3 className="text-lg font-medium text-white">Pre-University</h3>
                    <p className="text-neutral-400">Attiguppe Government College, Bangalore</p>
                    <p className="text-sm text-neutral-500">2021</p>
                </div>
                 <div>
                    <h3 className="text-lg font-medium text-white">High School</h3>
                    <p className="text-neutral-400">St Mary’s High School, Bangalore</p>
                    <p className="text-sm text-neutral-500">2020</p>
                </div>
              </div>
            </section>

            {/* Skills */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white border-b border-neutral-800 pb-2">Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-neutral-900/50 p-4 rounded-xl border border-neutral-800">
                  <h4 className="font-medium text-white mb-2">Technical Skills</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Ethical Hacking, Network Security, Penetration Testing, Vulnerability Assessment, Security Audit & Compliance, Virtual Machines, Forensics
                  </p>
                </div>
                <div className="bg-neutral-900/50 p-4 rounded-xl border border-neutral-800">
                  <h4 className="font-medium text-white mb-2">Tools & OS</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Wireshark, Nmap, Burp Suite, Photoshop & Creative Tools. <br/>
                    OS: Windows, Linux, Ubuntu
                  </p>
                </div>
                 <div className="bg-neutral-900/50 p-4 rounded-xl border border-neutral-800 md:col-span-2">
                  <h4 className="font-medium text-white mb-2">Soft Skills & Languages</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Leadership & Team Collaboration. <br/>
                    Languages: English (Fluent), Hindi (Fluent), Kannada (Native)
                  </p>
                </div>
              </div>
            </section>

            {/* Certifications */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white border-b border-neutral-800 pb-2">Certifications</h2>
              <ul className="space-y-2 text-neutral-300">
                <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                    IT Specialist - Valencia College Florida
                </li>
                <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
                    Certified Ethical Hacker - In Progress
                </li>
              </ul>
            </section>

          </div>
        </div>
      </TracingBeam>
    </div>
  );
}
