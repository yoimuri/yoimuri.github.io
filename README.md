# Clint Branwel Poyaoan — Portfolio Website

Personal portfolio website showcasing skills in Cybersecurity, Data Science, and Full-Stack Development.

THIS IS A PERSONAL PROJECT. IF SOMETIMES FEATURES DON'T WORK, IT MEANS IT'S CURRENTLY UPDATING TO BETTER THIS WEB PORTFOLIO.

THIS WEBSITE WILL BE A PERSONAL SNEAK PEEK FROM MY LIFE.

NOTE THAT THIS IS SUBJECT TO UPDATE EVERY NOW AND THEN SINCE WE ARE CURRENTLY BUILDING OUR CREDENTIALS.

# CURRENT UPDATE: 
-Implemented AI Chat Bot to ask anything about myself. The knowledge of Ai to me is subject to change since I will either add or remove some informations that is relevant for people trying to know me.

Feel free to suggest me anything, ask ideas or contact me for professional inquiries using my work email: branwelclint.pro@gmail.com

## 🚀 Live Demo

Deployed via GitHub Pages: `https://yoimuri.github.io/portfolio`



---

## 📁 File Structure

```
portfolio/
├── index.html      ← Main HTML structure
├── style.css       ← All styles (dark cyber-data theme)
├── script.js       ← Animations, particles, interactions
└── README.md       ← This file
```

---

## 🛠 Deploy to GitHub Pages (Step-by-Step)

### Option A — New Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `portfolio` (or your GitHub username: `yoimuri.github.io`)
3. Set to **Public**
4. Click **Create repository**
5. Upload the 3 files (`index.html`, `style.css`, `script.js`)
6. Go to **Settings → Pages**
7. Under **Source**, select `Deploy from a branch`
8. Choose branch: `main`, folder: `/ (root)`
9. Click **Save**
10. Your site will be live at `https://yoimuri.github.io/portfolio`

### Option B — Using Git CLI

```bash
# Clone or init repo
git init
git add .
git commit -m "Initial portfolio deploy"
git branch -M main
git remote add origin https://github.com/yoimuri/portfolio.git
git push -u origin main
```

Then enable Pages in repository Settings.

---

## ✏️ Customizing

### Update project links
In `index.html`, find each `.project-btn` anchor and update the `href` to your actual project URLs:
```html
<a href="YOUR_PROJECT_URL" target="_blank" class="project-btn">View Project →</a>
```

### Update LinkedIn URL
Find this line and update with your full LinkedIn URL:
```html
<a href="https://www.linkedin.com/in/clint-branwel-p" ...>
```

### Update HuggingFace thesis link
Find the DINO project card and update the link to your actual HuggingFace Space.

### Add a profile photo
In the About section you can add:
```html
<img src="photo.jpg" alt="Clint Branwel Poyaoan" class="about-photo" />
```
And in `style.css`:
```css
.about-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--cyan);
  margin-bottom: 1.5rem;
}
```

---

## 🎨 Features

- ✅ Particle network background (canvas)
- ✅ Typing text animation in hero
- ✅ Parallax hero scroll effect
- ✅ Scroll-triggered reveal animations
- ✅ Sticky navbar with scroll state
- ✅ Mobile responsive + hamburger menu
- ✅ Terminal card in About section
- ✅ Cursor glow effect (desktop)
- ✅ Active section highlight in nav
- ✅ All buttons & links functional

---

## 📱 Browser Support

Chrome, Firefox, Safari, Edge — all modern browsers.

---

Built with vanilla HTML, CSS, and JavaScript — zero dependencies, fast load, GitHub Pages ready.
