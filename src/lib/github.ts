import redis from './redis';

export interface Repo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  homepage: string | null;
  topics: string[];
  private: boolean;
}

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'Sathvik-Nagesh';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function getRepos(): Promise<Repo[]> {
  const cacheKey = `repos:${GITHUB_USERNAME}`;
  
  try {
    if (redis.isOpen) {
        const cached = await redis.get(cacheKey);
        if (cached) {
        return JSON.parse(cached);
        }
    }
  } catch (error) {
    console.error('Redis error:', error);
  }

  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };

  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=100`, {
      headers,
      next: { revalidate: 3600 }, // Fallback Next.js cache
    });

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.statusText}`);
    }

    const repos: Repo[] = await res.json();
    
    // Filter out forks if needed, or keep them. User said "all my GitHub projects".
    // Let's keep public ones.
    const publicRepos = repos.filter(repo => !repo.private);

    try {
      if (redis.isOpen) {
        await redis.set(cacheKey, JSON.stringify(publicRepos), { EX: 3600 }); // Cache for 1 hour
      }
    } catch (error) {
      console.error('Redis set error:', error);
    }

    return publicRepos;
  } catch (error) {
    console.error('Error fetching repos:', error);
    return [];
  }
}

export async function getReadme(repoName: string): Promise<string> {
  const cacheKey = `readme:${GITHUB_USERNAME}:${repoName}`;

  try {
    if (redis.isOpen) {
        const cached = await redis.get(cacheKey);
        if (cached) {
        return cached;
        }
    }
  } catch (error) {
    console.error('Redis error:', error);
  }

  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3.raw',
  };

  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/readme`, {
      headers,
    });

    if (!res.ok) {
      if (res.status === 404) return '';
      throw new Error(`GitHub API error: ${res.statusText}`);
    }

    const readme = await res.text();

    try {
      if (redis.isOpen) {
        await redis.set(cacheKey, readme, { EX: 86400 }); // Cache for 24 hours
      }
    } catch (error) {
      console.error('Redis set error:', error);
    }

    return readme;
  } catch (error) {
    console.error('Error fetching readme:', error);
    return '';
  }
}
