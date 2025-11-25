'use plain';
import React from 'react';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { LinkPreview } from '@/components/ui/link-preview';
import { Repo } from '@/lib/github';
import { Summary } from '@/lib/summarizer';
import { Github, ExternalLink, Star, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

import { cn } from '@/lib/utils';

interface ProjectCardProps {
  repo: Repo;
  summary: Summary;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ repo, summary, className }) => {
  const hasPreview = !!repo.homepage;
  
  return (
    <CardSpotlight 
      className={cn(
        "flex flex-col p-6",
        hasPreview ? "min-h-[400px]" : "min-h-[280px]",
        className
      )} 
      color="#262626"
    >
      <div className="relative z-20 flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white truncate" title={repo.name}>
            {repo.name}
          </h3>
          <div className="flex items-center space-x-2 text-neutral-400">
            <span className="flex items-center text-xs">
              <Star className="w-3 h-3 mr-1" />
              {repo.stargazers_count}
            </span>
          </div>
        </div>

        <p className="text-neutral-300 text-sm mb-3 line-clamp-3">
          {summary.short || repo.description || 'No description available.'}
        </p>

        {hasPreview && (
          <div className="mb-3 w-full">
            <LinkPreview url={repo.homepage!} className="w-full" height="h-40" />
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mb-4">
          {repo.language && (
            <span className="px-2 py-1 text-xs rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
              {repo.language}
            </span>
          )}
          {repo.topics.slice(0, 3).map((topic) => (
            <span key={topic} className="px-2 py-1 text-xs rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
              {topic}
            </span>
          ))}
        </div>

      <div className="relative z-20 mt-auto pt-4 border-t border-neutral-800 flex justify-between items-center">
        <div className="text-xs text-neutral-500 flex items-center">
          <Calendar className="w-3 h-3 mr-1" />
          {format(new Date(repo.updated_at), 'MMM d, yyyy')}
        </div>
        
        <div className="flex items-center space-x-4">
          <Link
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors"
            title="View on GitHub"
          >
            <Github className="w-5 h-5" />
          </Link>
          {hasPreview && (
            <Link
              href={repo.homepage!}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
              title="View Live Demo"
            >
              <ExternalLink className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
      </div>
    </CardSpotlight>
  );
};
