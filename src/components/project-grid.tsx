'use client';

import React, { useState, useMemo } from 'react';
import { Repo } from '@/lib/github';
import { Summary } from '@/lib/summarizer';
import { ProjectCard } from '@/components/project-card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BentoGrid } from '@/components/ui/bento-grid';
import { cn } from '@/lib/utils';

interface ProjectGridProps {
  repos: Repo[];
  summaries: Record<string, Summary>;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ repos, summaries }) => {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    repos.forEach(repo => {
      if (repo.language) tags.add(repo.language);
      if (Array.isArray(repo.topics)) {
        repo.topics.forEach(topic => tags.add(topic));
      }
    });
    return Array.from(tags).sort();
  }, [repos]);

  const filteredRepos = useMemo(() => {
    return repos.filter(repo => {
      const searchLower = search.toLowerCase();
      const matchesSearch = 
        repo.name.toLowerCase().includes(searchLower) ||
        (repo.description && repo.description.toLowerCase().includes(searchLower)) ||
        (repo.language && repo.language.toLowerCase().includes(searchLower));
        
      const matchesTag = selectedTag ? (repo.language === selectedTag || (repo.topics && repo.topics.includes(selectedTag))) : true;
      return matchesSearch && matchesTag;
    });
  }, [repos, search, selectedTag]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-4 h-4" />
          <Input
            placeholder="Search projects..."
            className="pl-10 bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500 focus:ring-neutral-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1.5 text-sm rounded-full transition-colors whitespace-nowrap cursor-pointer ${
              !selectedTag ? 'bg-white text-black' : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800'
            }`}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                selectedTag === tag ? 'bg-white text-black' : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <BentoGrid className="max-w-7xl mx-auto">
        <AnimatePresence mode='popLayout'>
          {filteredRepos.map((repo, i) => (
            <motion.div
              key={repo.id}
              layout
              className="row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <ProjectCard 
                repo={repo} 
                summary={summaries[repo.name] || { short: '', expanded: '' }} 
                className="h-full"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </BentoGrid>

      {filteredRepos.length === 0 && (
        <div className="text-center text-neutral-500 py-20">
          No projects found matching your criteria.
        </div>
      )}
    </div>
  );
};
