# Clint Branwel Poyaoan — Portfolio

[![Live](https://img.shields.io/badge/Live-yoimuri.github.io-00ff88?style=flat-square)](https://yoimuri.github.io)
[![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-181717?style=flat-square&logo=github)](https://yoimuri.github.io)
[![Built With](https://img.shields.io/badge/Built%20With-Vanilla%20JS-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://github.com/yoimuri)
[![Cloudflare Workers](https://img.shields.io/badge/API%20Proxy-Cloudflare%20Workers-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com)

Personal portfolio built with zero dependencies — vanilla HTML, CSS, and JavaScript. Includes a Gemini-powered AI chatbot that answers questions about my background, routed through a Cloudflare Worker to keep the API key server-side.

**Live:** [yoimuri.github.io](https://yoimuri.github.io)

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| AI Chatbot | Google Gemini API |
| API Proxy | Cloudflare Workers |
| Hosting | GitHub Pages |

No frameworks. No build tools. No package installs. Loads fast by design.

---

## Pages

- `/` — Main portfolio: About, Skills, Experience, Projects, Certifications, Contact
- `/offduty.html` — Personal off-duty page

---

## Features

- Canvas particle network background
- Typing animation in hero
- Parallax scroll effect
- Scroll-triggered reveal animations
- Sticky navbar with active section tracking
- Terminal card (`whoami.sh` / `cat profile.json` simulation)
- Mobile responsive with hamburger menu
- Cursor glow effect on desktop
- AI chatbot widget — context-aware, knows my background and projects

---

## How the AI Chatbot Works

The chatbot runs on a context prompt I wrote about my background, skills, and what I'm looking for professionally. When a user sends a message, it hits a Cloudflare Worker endpoint which proxies the call to the Gemini API server-side — the API key never touches the browser.

To update what the AI knows about me, the system prompt inside the Worker gets edited directly.

---

## File Structure

```
/
├── index.html        ← Main portfolio page
├── offduty.html      ← Personal off-duty page
├── style.css         ← All styles (dark cyber-data theme)
├── script.js         ← Animations, particles, chatbot, interactions
└── README.md         ← This file
```

---

## Running Locally

No build step needed. Open `index.html` in any modern browser.

> The AI chatbot requires a Cloudflare Worker with a valid Gemini API key to function.
> Without it, the chat widget fails silently on the frontend — the rest of the site works fine.

---

## Deployment

Auto-deploys from `main` branch root on every push via GitHub Pages.

**Manual setup:**
1. Fork or clone this repo
2. Go to Settings → Pages → Source: `main` / `/ (root)`
3. Site goes live at `https://<your-username>.github.io`

---

## Contact

- **Email:** branwelclint.pro@gmail.com
- **GitHub:** [github.com/yoimuri](https://github.com/yoimuri)
- **LinkedIn:** [Clint Branwel P.](https://www.linkedin.com/in/clint-branwel-p-b356a1364)

Open to entry-level roles in Cybersecurity, Data Science, and AI Development.
