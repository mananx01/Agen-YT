# 📺 AgenYT – AI-Powered Video Intelligence Platform

**AgenYT** is a web-based AI-agent that turns any **YouTube video** into actionable insights. From transcription to content generation, AgenYT empowers creators, educators, marketers, and analysts with fast, intuitive tools to understand and repurpose video content.

Built using the power of **OpenAI**, **Convex DB**, and **Schematic**, AgenYT is more than a chatbot — it's an **autonomous AI agent** that leverages multiple tools in a single flow.

---

## 🌟 Features

### 📝 AI Transcription
- Fast and accurate speech-to-text
- Cached using **Convex DB** to minimize token usage

### 📊 Analytics & Insights
- Fetch live **YouTube video statistics**
- Extract **key moments** and **summarize topics**
- Identify and segment **speaker roles** (coming soon)

### ✍️ Script Generation
- Auto-generate video scripts using **GPT-4.1**
- Tone-adjusted and context-aware
- Ready-to-use for reels, shorts, or republishing

### 🏷️ SEO Title Suggestions
- Suggests SEO-optimized, click-worthy titles
- Powered by **GPT-4o mini** for low-cost, fast responses

### 🎨 Thumbnail Generation
- Custom thumbnails generated using **DALL·E 3**
- Visuals guided by video context and transcript

### 🤖 Multi-Tool Agent Architecture
- Uses **5 modular tools**:
  - `getVideoDetails`
  - `fetchTranscript`
  - `generateScript`
  - `generateTitle`
  - `generateImage`
- Tools are orchestrated intelligently by the agent
- Executes multiple tools in a **single LLM call** for efficiency

---

## 🛠 Tech Stack

| Layer           | Technology                                 |
|----------------|---------------------------------------------|
| Frontend        | Next.js (App Router), TypeScript, Tailwind |
| Backend         | OpenAI APIs (GPT-4.1, GPT-4o mini, DALL·E 3) |
| DB              | Convex (real-time, serverless)             |
| Tooling & Auth  | Schematic                                  |
| Package Manager | PNPM                                       |

---

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/mananx01/Agen-YT.git
cd agenyt 
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables** :
Create a .env.local file and add the following:

```bash
OPENAI_API_KEY 
CONVEX_DEPLOYMENT_URL
NEXT_PUBLIC_CONVEX_URLs
SCHEMATIC_API_KEY
SCHEMATIC_SECRET_API_KEY
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
```

4. **Run the app**

```bash
npm run dev
```

***Visit http://localhost:3000 to use the app locally.***
