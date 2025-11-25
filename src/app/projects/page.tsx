import React from 'react';
import { getRepos, getReadme } from '@/lib/github';
import { Summary } from '@/lib/summarizer';
import { ProjectGrid } from '@/components/project-grid';

export const revalidate = 3600; // Cache for 1 hour

export default async function ProjectsPage() {
  // Fetch repos dynamically from GitHub
  const repos = await getRepos();

  // Sort repos: ones with homepage (demo) first, then by stars
  const sortedRepos = [...repos].sort((a, b) => {
    const aHasDemo = !!(a.homepage && a.homepage.trim());
    const bHasDemo = !!(b.homepage && b.homepage.trim());
    
    if (aHasDemo && !bHasDemo) return -1;
    if (!aHasDemo && bHasDemo) return 1;
    
    // If both have or don't have demo, sort by stars
    return b.stargazers_count - a.stargazers_count;
  });

  // Fetch READMEs in parallel and use as description
  const summaryPromises = sortedRepos.map(async (repo) => {
    const readme = await getReadme(repo.name);
    // Simple truncation: take first 200 chars, remove markdown syntax roughly
    const cleanReadme = readme.replace(/[#*`]/g, '').replace(/\n+/g, ' ').trim();
    const shortDesc = cleanReadme.slice(0, 150) + (cleanReadme.length > 150 ? '...' : '');
    
    return { 
        name: repo.name, 
        summary: {
            short: shortDesc || repo.description || 'No description available.',
            expanded: cleanReadme.slice(0, 500) // Pass more context if needed, or just use short for now
        } 
    };
  });

  const summariesResults = await Promise.all(summaryPromises);
  const summaries: Record<string, Summary> = {};
  summariesResults.forEach(item => {
    summaries[item.name] = item.summary;
  });

  return (
    <div className="min-h-screen text-white pt-24 pb-20 px-4 md:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Projects
          </h1>
          <p className="text-neutral-400 max-w-2xl text-lg">
            A collection of my open source work, experiments, and production applications.
            Explore the code and live demos below.
          </p>
        </div>

        <ProjectGrid repos={sortedRepos} summaries={summaries} />
      </div>
    </div>
  );
}
