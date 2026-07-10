# Clint Branwel Poyaoan — Portfolio

[![Live](https://img.shields.io/badge/Live-yoimuri.github.io-00ff88?style=flat-square)](https://yoimuri.github.io)
[![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-181717?style=flat-square&logo=github)](https://yoimuri.github.io)
[![Built With](https://img.shields.io/badge/Built%20With-Vanilla%20JS-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://github.com/yoimuri)
[![Cloudflare Workers](https://img.shields.io/badge/Serverless-Cloudflare%20Workers-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com)
[![n8n](https://img.shields.io/badge/Automation-n8n-FF6C37?style=flat-square&logo=n8n&logoColor=white)](https://n8n.io)

Personal portfolio built with zero frontend dependencies — vanilla HTML, CSS, and JavaScript. Powered by a dual serverless and automated backend layer that drives a context-aware AI chatbot and an intelligent contact form automation pipeline.

**Live:** [yoimuri.github.io](https://yoimuri.github.io)

---

## Stack

| Layer | Tech | Why |
|---|---|---|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript | No frameworks, no build tools. Light, clean, and loads fast. |
| **API Proxy / Serverless** | Cloudflare Workers | Handles secure, server-side routing for API keys. |
| **Automation Engine** | n8n (Self-hosted on Render) | Coordinates the contact form pipeline logic. |
| **Database** | Supabase (PostgreSQL) | Stores contact data and metadata securely with RLS. |
| **AI Processing** | Google Gemini API & Groq (LLaMA 3.1) | Powering the chat interaction and text classifications. |
| **Hosting** | GitHub Pages | Host for static client files. |

---

## Architecture Overview

This portfolio leverages a decentralized, zero-cost (free-tier) cloud architecture to manage public interactions safely and intelligently:

[GitHub Pages Client]
│
├──► (Chat Widget) ──► [Cloudflare Worker] ──► [Gemini API] (Conversational responses)
│
└──► (Contact Form) ──► [Cloudflare Worker]
│
▼
[n8n Automation Webhook]
│
┌────────────┴────────────┐
▼                         ▼
[IF Node Validate]       [Groq LLaMA 3.1 8B]
│                         │
(If Format Error)                ▼
│               [JS Context Joiner]
▼                         │
[Drop Pipeline]                  ├──► [Supabase PostgreSQL]
├──► [Gmail API OAuth Auto-Reply]
└──► [Telegram Bot Push Alert]

---

## Features

- **Canvas Particle Network:** Responsive cyber-data theme background.
- **Interactive Terminal:** Custom interactive card (`whoami.sh` / `cat profile.json` simulation).
- **AI Chatbot Widget:** Powered by `gemini-3.1-flash-lite`. Remembers context, project data, and professional background while maintaining server-side API key protection.
- **AI-Driven Contact Pipeline:** A smart contact form backed by an n8n workflow on Render:
  - **Serverless Form Handling:** Frontend inputs hook into a Cloudflare worker endpoint.
  - **Regex Integrity Validation:** Immediate regex parsing drops invalid formats before execution to preserve AI processing quotas.
  - **LLM Content Classification:** Messages are interpreted by LLaMA 3.1 (8B) via Groq to identify intent (`job_inquiry`, `collaboration`, `general`, `spam`) and generate a concise summary.
  - **State Preservation Node:** Native JavaScript node parses and synthesizes asynchronous node payload contexts.
  - **Database Persistence:** Stores structured submissions safely inside a Supabase PostgreSQL instance.
  - **Automated Communication:** Fires an immediate auto-response to the sender via secure Gmail OAuth 2.0 and pings the owner's device via Telegram Bot API with real-time push alerts.

---

## File Structure
/
├── index.html         ← Main portfolio page & contact UI
├── offduty.html       ← Personal off-duty page
├── style.css          ← All custom layout and interface styles
├── script.js          ← UI animations, particle systems, interactive terminal, and chat logic
└── README.md          ← Project architecture documentation
---

## Running Locally & Developing

1. No local building steps are required for the client code. Open `index.html` directly in any modern web browser.
2. **Note on Backend features:** The AI Chatbot and Contact Form rely on operational Cloudflare Workers endpoints and an active n8n instance. If those services or their corresponding upstream keys (`GEMINI_API_KEY`, `GROQ_API_KEY`) are missing, backend forms will fail gracefully in the browser while the core UI works smoothly.

---

## Contact & Links

- **Email:** branwelclint.pro@gmail.com
- **GitHub:** [github.com/yoimuri](https://github.com/yoimuri)
- **LinkedIn:** [Clint Branwel P.](https://www.linkedin.com/in/clint-branwel-p-b356a1364)

*Open to entry-level roles in AI Development, Data Science, Prompt Engineering, and Cybersecurity.*