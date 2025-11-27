import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getRepos } from '@/lib/github';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXTAUTH_URL || 'http://localhost:3000',
    'X-Title': 'Cybersecurity Portfolio',
  },
});

const RESUME_CONTEXT = `
Sathvik N
Cybersecurity Analyst
Srushtisathvik@gmail.com | +91 94809 44727 | Bangalore
GitHub: github.com/Sathvik-Nagesh

PROFESSIONAL SUMMARY
Dedicated and detail-oriented Cybersecurity Analyst with over two years of hands-on experience. Skilled in ethical hacking, networking, and cybersecurity auditing with a proven ability to manage sensitive information and contribute to critical operations. Looking to grow in a challenging role focused on cybersecurity, leadership, and innovation.

EXPERIENCE
Internship | Sanna Innovation & Hi papa | June 2025 - August 2025
• Supported deployment and maintenance of client websites on shared and VPS hosting platforms.
• Monitored server performance, performed backups, and implemented basic security hardening measures.

Internship | Texial | 2020 - Present
• Conducted audits of systems, processes, and policies to ensure compliance with security standards.
• Gained exposure to real-world security scenarios and audit reporting.

EDUCATION
Bachelor of Computer Applications | KLE Society’s Degree College | Ongoing
Community College Initiative Program (CCI) | Valencia College, Orlando, FL, USA | 2022 - 2023
• Specialization in Cybersecurity. Selected as Youth Ambassador.

SKILLS
Ethical Hacking, Network Security, Penetration Testing, Vulnerability Assessment, Security Audit & Compliance, Virtual Machines, Forensics
OS: Windows, Linux, Ubuntu
Tools: Wireshark, Nmap, Burp Suite, Photoshop
Languages: English, Hindi, Kannada

CERTIFICATIONS
IT Specialist - Valencia College Florida
Certified Ethical Hacker - In Progress
`;

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json({ error: 'Configuration Error: API Key Missing' }, { status: 500 });
    }

    const { messages } = await req.json();

    // Fetch all repos to make chatbot aware of them
    let projectContext = "Featured Projects:\n";
    try {
        const repos = await getRepos();
        projectContext += repos.map(r => `- ${r.name}: ${r.description || 'No description'} (Link: ${r.html_url})`).join('\n');
    } catch (e) {
        projectContext += "Could not fetch dynamic project list. Refer user to /projects page.";
    }

    const PORTFOLIO_CONTEXT = `
You are Lumi, a helpful and flirty AI assistant for Sathvik Nagesh's portfolio.
Your goal is to answer questions about his projects, skills, and experience in a professional yet engaging manner and roast the users sometimes.

RESUME CONTEXT:
${RESUME_CONTEXT}

PROJECTS CONTEXT:
${projectContext}

RULES:
- Be concise always.
- Use emojis occasionally ✨.
- If asked about projects not listed in detail, refer the user to the Projects page at /projects.
- Provide clickable Markdown links when mentioning projects or pages (e.g., [Projects](/projects), [Resume](/resume)).
- If asked about "Contact Me", direct them to the contact form at the bottom of the page or [Contact](#contact).
`;

    try {
        const completion = await openai.chat.completions.create({
          model: 'x-ai/grok-4.1-fast:free',
          messages: [
            { role: 'system', content: PORTFOLIO_CONTEXT },
            ...messages
          ],
          max_tokens: 340, // Limit response length to save credits
        });
        return NextResponse.json({ content: completion.choices[0].message.content });
    } catch (error: any) {
        console.error('OpenAI API Error:', error);
        throw error; 
    }

  } catch (error: any) {
    console.error('Chat API error:', error);
    const errorMessage = error?.error?.message || error?.message || 'Internal Server Error';
    const status = error?.status || 500;
    return NextResponse.json({ error: errorMessage }, { status });
  }
}
