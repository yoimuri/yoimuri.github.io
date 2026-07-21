# my portfolio (v1)

Hey, I'm Clint. This is my personal portfolio site and this repo is the whole thing. It's live at [yoimuri.github.io](https://yoimuri.github.io).

I built the front end from scratch with plain HTML, CSS, and JavaScript. No frameworks, no build step. Partly to prove I could, partly because I like how light it stays.

Most of the site is animation and layout, but two parts actually do something behind the scenes: an AI chatbot that answers questions about me, and a contact form that filters and sorts messages on its own before they reach me. This README is mostly me explaining how those two work, for anyone curious and for future me when I forget.

## how the chatbot works

There's a little chat widget in the corner. You ask a question about me, it answers.

The catch is my API key. If it sat in the browser, anyone could grab it and run up my bill, so the browser never talks to the AI directly. It goes through a middleman:

```
your message  ->  my Cloudflare Worker  ->  Gemini  ->  back to you
```

The Worker is a tiny piece of server code in the middle. It holds the API key, attaches the system prompt (the hidden instructions that tell the AI who I am and what it's allowed to say), and passes the request along. The key stays server-side the entire time. The system prompt also shuts down prompt-injection attempts and won't give out anything private, just my public email and links.

## how the contact form works

This is the part I'm proud of. When you send a message it doesn't just email me. It runs through a small pipeline that throws out junk and labels the real ones first.

```
form  ->  Cloudflare Worker  ->  n8n workflow  ->  Gmail + Telegram
```

Walking through it:

- The Worker does a first pass. There's a hidden honeypot field that real people never touch but bots fill in, plus a regex check that blocks anything shaped like code or an injection attempt. That kills the lazy spam before it costs me anything.
- What survives goes to an n8n workflow. n8n is a visual automation tool, so instead of writing a backend I wire nodes together. It's self-hosted on Render's free tier.
- Inside n8n, a LLaMA model running on Groq reads the message, works out what it is (job inquiry, collaboration, general, or spam), writes a one-line summary, and scores how spammy it looks.
- Real messages get saved to a Supabase database, send an auto-reply back to whoever wrote in, and ping my phone through a Telegram bot so I actually notice.
- Spam just gets dropped, quietly.

So by the time a message reaches me it's already checked, labeled, and summarized.

## the stack, and why

- Vanilla HTML/CSS/JS on GitHub Pages. Loads fast, nothing to build.
- Cloudflare Workers for the two backend endpoints. Free, quick, and it keeps my API keys out of the browser.
- n8n on Render runs the contact automation so I can design the flow visually.
- Groq (LLaMA) sorts the contact messages, Gemini runs the chat.
- Supabase (Postgres) stores the contact submissions.
- A Telegram bot handles the alerts to my phone.

The whole thing runs on free tiers, so keeping it online costs me nothing.

## what's in the repo

```
/
├── index.html      the main page and the contact UI
├── offduty.html    the off-duty page (the non-work side of me)
├── style.css       all the layout and styling
├── script.js       animations, the particle and radar canvas, the terminal card, chat logic
└── README.md       this file
```

## running it locally

The front end needs nothing. Clone the repo, open `index.html` in a browser, done. The animations, scrolling, and terminal card all run client-side.

The chatbot and contact form won't do anything locally unless the backend is wired up, since they lean on my Cloudflare Worker and n8n instance being live with their keys set. That's expected. The site still looks and scrolls fine without them.

## heads up

- The backends are on free tiers. Render falls asleep when nothing hits it for a while, so the first contact submit after a quiet stretch can take 30 to 60 seconds to wake up. It's not broken, just cold.
- I'm building a v2 on a newer stack. It's still in the planning phase, so there's nothing to show yet. The banner up top points to my contact form for now instead of a dead link.

## reach me

- Email: branwelclint.pro@gmail.com
- GitHub: [github.com/yoimuri](https://github.com/yoimuri)
- LinkedIn: [Clint Branwel P.](https://www.linkedin.com/in/clint-branwel-p-b356a1364)
