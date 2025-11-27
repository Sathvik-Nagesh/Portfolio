# Portfolio – Sathvik Nagesh

🚀 **Live Demo:** https://sathvik-v1.vercel.app/
A sleek, modern, and highly interactive personal portfolio built with **Next.js 14**, **Tailwind CSS**, and a sprinkle of **AI‑powered chat**. The site showcases projects, a résumé, and a playful chatbot that answers questions about the author’s experience.

---

## ✨ Features

- **Dynamic project cards** with live GitHub data fetched at build time.
- **AI chat endpoint** (`/api/chat`) powered by OpenRouter/Claude, with a custom personality.
- **Dark / Light mode** with glass‑morphism UI and smooth micro‑animations.
- **Responsive design** – looks great on mobile, tablet, and desktop.
- **Resume download** and printable PDF version.
- **Contact form** (via Next.js API route) with server‑side validation.
- **SEO‑optimized** meta tags, Open Graph, and structured data.
- **TypeScript** throughout for type safety.
- **Vercel‑ready** deployment configuration.

---

## 🛠️ Tech Stack

| Layer               | Technology                          |
| ------------------- | ----------------------------------- |
| **Framework**       | Next.js 14 (App Router)             |
| **Styling**         | Tailwind CSS, vanilla CSS (globals) |
| **Icons / Fonts**   | React Icons, Google Fonts (Inter)   |
| **AI**              | OpenRouter API (Claude 3 Haiku)     |
| **Data**            | GitHub REST API (projects)          |
| **Backend**         | Next.js API routes (TypeScript)     |
| **Deployment**      | Vercel (or any Node host)           |
| **Version Control** | Git + GitHub                        |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20 (recommended)
- **npm** (or **pnpm**) for package management
- An **OpenRouter API key** (or OpenAI key) – see the _Environment_ section.

### Clone & Install

```bash
git clone https://github.com/Sathvik-Nagesh/Portfolio.git
cd Portfolio
npm install   # or pnpm install
```

### Environment Variables

Create a `.env.local` file at the project root (it is ignored by Git). Add the following keys:

```dotenv
# OpenRouter (or OpenAI) API key for the chatbot
OPENROUTER_API_KEY=your-openrouter-api-key

# Optional – if you switch to the default OpenAI client
# OPENAI_API_KEY=your-openai-api-key

# URL used for referer header in the OpenRouter request
NEXTAUTH_URL=http://localhost:3000
```

> **Never commit** `.env.local` – it contains secret credentials.

### Run the development server

```bash
npm run dev
```

Open <http://localhost:3000> in your browser. The site should hot‑reload as you edit files.

---

## 📦 Build & Deploy

### Production build

```bash
npm run build   # creates the .next folder
npm start       # runs the production server locally
```

### Deploy to Vercel (recommended)

1. Push the repository to GitHub.
2. Sign in to Vercel and import the repo.
3. In Vercel’s **Environment Variables** panel, add `OPENROUTER_API_KEY` (and optionally `NEXTAUTH_URL`).
4. Deploy – Vercel will run `npm run build` automatically.

---

## 📂 Project Structure (high‑level)

```
src/
├─ app/                # Next.js app router pages
│   ├─ api/            # API routes (chat, contact, …)
│   ├─ layout.tsx      # Root layout with globals & providers
│   ├─ page.tsx        # Home page
│   ├─ resume/…        # Resume page & PDF
│   └─ projects/…      # Projects page (dynamic cards)
├─ components/         # Reusable UI components (hero, navbar, cards, …)
├─ lib/                # Helper utilities (GitHub fetch, Redis, etc.)
└─ styles/            # Tailwind config & global CSS (globals.css)
```

---

## 🎨 Design & Aesthetics

- **Color palette**: soft pastel gradients with a dark‑mode counterpart.
- **Typography**: _Inter_ (sans) and _Roboto Mono_ for code snippets.
- **Micro‑animations**: Tailwind `animate-` utilities, subtle hover lifts, and glass‑morphism cards.
- **Responsive grid**: CSS grid + Tailwind breakpoints for a fluid layout.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a PR.

1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/awesome-feature`).
3. Commit your changes with clear messages.
4. Open a Pull Request against `main`.

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 🙏 Acknowledgements

- **Tailwind Labs** – for the amazing utility‑first CSS framework.
- **OpenRouter** – for providing access to Claude models.
- **Vercel** – for seamless Next.js deployments.
- **All open‑source libraries** used throughout the project.

---

_Built with ❤️ by **Sathvik Nagesh** – a cybersecurity analyst who loves coding, design, and AI._
