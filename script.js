/* ============================================================
   CLINT BRANWEL POYAOAN — PORTFOLIO SCRIPTS
   ============================================================ */
'use strict';

/* ══ 1. PARTICLE CANVAS ══════════════════════════════════════ */
(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles;
  const COUNT = window.innerWidth < 600 ? 35 : 65;
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  function rnd() { return { x:Math.random()*W, y:Math.random()*H, vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3, r:Math.random()*1.4+.4, a:Math.random()*.45+.15 }; }
  function init() { particles = Array.from({length:COUNT}, rnd); }
  function draw() {
    ctx.clearRect(0,0,W,H);
    for (let i=0;i<particles.length;i++) for (let j=i+1;j<particles.length;j++) {
      const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y, d=Math.sqrt(dx*dx+dy*dy);
      if (d<120) { ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y); ctx.strokeStyle=`rgba(0,212,255,${.1*(1-d/120)})`; ctx.lineWidth=.6; ctx.stroke(); }
    }
    for (const p of particles) {
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=`rgba(0,212,255,${p.a})`; ctx.fill();
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>W) p.vx*=-1; if(p.y<0||p.y>H) p.vy*=-1;
    }
  }
  function loop() { draw(); requestAnimationFrame(loop); }
  resize(); init(); loop();
  window.addEventListener('resize', ()=>{ resize(); init(); });
})();

/* ══ 1b. RADAR CANVAS — Data Science ↔ Cybersecurity ═════════
   Rotating sweep pings two node types:
   · Cyan  = Data Science  (DATA, SQL, ML, API, PARSE, GRAPH)
   · Red   = Cybersecurity (OSINT, SIEM, DFIR, VULN, SCAN)
   Nearby active nodes draw network connection lines,
   bridging both domains into one intelligence loop.        */
(function initRadar() {
  const canvas = document.getElementById('radar-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function setSize() {
    const r = canvas.getBoundingClientRect();
    const s = r.width || Math.min(400, window.innerWidth * 0.4);
    canvas.width  = s;
    canvas.height = s;
  }
  setSize();
  window.addEventListener('resize', setSize, { passive: true });

  // Node definitions — isCyber = red (cyber), else cyan (data)
  const NODE_DEFS = [
    { label:'OSINT',  isCyber:true  },
    { label:'DATA',   isCyber:false },
    { label:'SIEM',   isCyber:true  },
    { label:'SQL',    isCyber:false },
    { label:'DFIR',   isCyber:true  },
    { label:'ML',     isCyber:false },
    { label:'VULN',   isCyber:true  },
    { label:'API',    isCyber:false },
    { label:'SCAN',   isCyber:true  },
    { label:'PARSE',  isCyber:false },
    { label:'NODE',   isCyber:false },
    { label:'GRAPH',  isCyber:false },
    { label:'RECON',  isCyber:true  },
    { label:'PIPE',   isCyber:false },
  ];

  const nodes = NODE_DEFS.map(def => ({
    ...def,
    r_ratio : 0.17 + Math.random() * 0.71,
    a       : Math.random() * Math.PI * 2,
    alpha   : 0,
  }));

  let sweep = 0;

  function draw() {
    const W  = canvas.width;
    const H  = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const R  = Math.min(W, H) / 2 - 8;

    ctx.clearRect(0, 0, W, H);

    /* ── Clip to radar circle ── */
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.clip();

    /* ── Range rings ── */
    [0.33, 0.66, 1.0].forEach((f, i) => {
      ctx.beginPath();
      ctx.arc(cx, cy, f * R, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0,229,255,${0.07 + i * 0.025})`;
      ctx.lineWidth   = 0.8;
      ctx.stroke();
    });

    /* ── Crosshair ── */
    ctx.strokeStyle = 'rgba(0,229,255,0.055)';
    ctx.lineWidth   = 0.5;
    ctx.beginPath();
    ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy);
    ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R);
    ctx.stroke();

    /* ── Sweep trail fan ── */
    const TRAIL = 1.45;
    const STEPS = 48;
    for (let s = 0; s < STEPS; s++) {
      const a0 = sweep - ((s + 1) / STEPS) * TRAIL;
      const a1 = sweep - (s / STEPS) * TRAIL;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R, a0, a1);
      ctx.closePath();
      ctx.fillStyle = `rgba(0,229,255,${(1 - s / STEPS) * 0.11})`;
      ctx.fill();
    }

    /* ── Sweep line ── */
    const ex = cx + Math.cos(sweep) * R;
    const ey = cy + Math.sin(sweep) * R;
    const lg = ctx.createLinearGradient(cx, cy, ex, ey);
    lg.addColorStop(0,   'rgba(0,229,255,0)');
    lg.addColorStop(0.4, 'rgba(0,229,255,0.25)');
    lg.addColorStop(1,   'rgba(0,229,255,0.85)');
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(ex, ey);
    ctx.strokeStyle = lg;
    ctx.lineWidth   = 1.5;
    ctx.stroke();

    /* ── Nodes: ping on sweep pass, fade slowly ── */
    const active = []; // collect for connection lines below

    nodes.forEach(node => {
      const nr = node.r_ratio * R;
      const nx = cx + Math.cos(node.a) * nr;
      const ny = cy + Math.sin(node.a) * nr;

      const diff = ((sweep - node.a) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
      if (diff < 0.055) node.alpha = 1.0;
      else              node.alpha = Math.max(0, node.alpha - 0.004);

      if (node.alpha < 0.04) return;
      active.push({ nx, ny, alpha: node.alpha, isCyber: node.isCyber });

      const col = node.isCyber ? '255,60,94' : '0,229,255';
      const a   = node.alpha;

      /* glow halo */
      const grd = ctx.createRadialGradient(nx, ny, 0, nx, ny, 9);
      grd.addColorStop(0, `rgba(${col},${a * 0.32})`);
      grd.addColorStop(1, `rgba(${col},0)`);
      ctx.beginPath();
      ctx.arc(nx, ny, 9, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      /* dot */
      ctx.beginPath();
      ctx.arc(nx, ny, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${col},${a})`;
      ctx.fill();

      /* label */
      if (node.label && a > 0.22) {
        ctx.font      = `500 5.5px "JetBrains Mono", monospace`;
        ctx.fillStyle = `rgba(${col},${a * 0.82})`;
        ctx.fillText(node.label, nx + 5, ny - 2);
      }
    });

    /* ── Connection lines between nearby active nodes ── */
    for (let i = 0; i < active.length; i++) {
      for (let j = i + 1; j < active.length; j++) {
        const a = active[i], b = active[j];
        const dist = Math.hypot(a.nx - b.nx, a.ny - b.ny);
        if (dist < R * 0.37) {
          ctx.beginPath();
          ctx.moveTo(a.nx, a.ny);
          ctx.lineTo(b.nx, b.ny);
          ctx.strokeStyle = `rgba(0,229,255,${Math.min(a.alpha, b.alpha) * 0.14})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      }
    }

    ctx.restore();

    /* ── Center pip ── */
    ctx.beginPath();
    ctx.arc(cx, cy, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,229,255,0.55)';
    ctx.fill();

    sweep += 0.013;
    if (sweep > Math.PI * 2) sweep -= Math.PI * 2;

    requestAnimationFrame(draw);
  }

  draw();
})();

/* ══ 2. TYPED TEXT ═══════════════════════════════════════════ */
(function initTyped() {
  const el = document.getElementById('typed');
  if (!el) return;
  const phrases = [
    'B.S. Computer Science',
    'Cybersecurity Enthusiast',
    'AI-Integrated Builder',
    'Guitarist · Drummer · Vocalist',
    'Gamer. Builder. Rider.',
    'Lowkey. Adaptable. Fast Learner.',
  ];
  let pi=0,ci=0,del=false,delay=120;
  function type() {
    const cur=phrases[pi];
    if (!del) { el.textContent=cur.slice(0,ci+1); ci++; delay=ci===cur.length?(del=true,1800):90; }
    else { el.textContent=cur.slice(0,ci-1); ci--; if(ci===0){del=false;pi=(pi+1)%phrases.length;delay=400;}else delay=45; }
    setTimeout(type,delay);
  }
  setTimeout(type,1200);
})();

/* ══ 3. NAVBAR ═══════════════════════════════════════════════ */
(function initNav() {
  const nav=document.getElementById('navbar'); if(!nav) return;
  function upd(){nav.classList.toggle('scrolled',window.scrollY>50);}
  window.addEventListener('scroll',upd,{passive:true}); upd();
})();

/* ══ 4. HAMBURGER ════════════════════════════════════════════ */
(function initHamburger() {
  const btn=document.getElementById('hamburger'),menu=document.getElementById('mobile-menu');
  if(!btn||!menu) return;
  btn.addEventListener('click',()=>{const o=btn.classList.toggle('open');menu.classList.toggle('open',o);document.body.style.overflow=o?'hidden':'';});
  menu.querySelectorAll('.mob-link').forEach(l=>l.addEventListener('click',()=>{btn.classList.remove('open');menu.classList.remove('open');document.body.style.overflow='';}));
})();

/* ══ 5. TEXT SCRAMBLE ════════════════════════════════════════*/
function scrambleText(el) {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
  if (!el.dataset.orig) el.dataset.orig = el.textContent;
  const orig = el.dataset.orig;
  let frame = 0;
  if (el._stimer) clearInterval(el._stimer);
  el._stimer = setInterval(() => {
    el.textContent = orig.split('').map((ch,i) => {
      if (ch===' ') return ' ';
      if (i < Math.floor(frame/3)) return ch;
      return CHARS[Math.floor(Math.random()*CHARS.length)];
    }).join('');
    if (++frame > orig.length*3) { el.textContent=orig; clearInterval(el._stimer); }
  }, 28);
}

/* ══ 6. SCROLL REVEAL — BOTH DIRECTIONS ═════════════════════*/
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
        el.classList.remove('in-view');
        void el.offsetWidth;          // flush — critical for re-trigger
        el.classList.add('in-view');
        if (el.classList.contains('scramble')) scrambleText(el);
      } else {
        el.classList.remove('in-view'); // reset so it re-animates next entry
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
  els.forEach(el => io.observe(el));
})();

/* ══ 7. WHOLE-SITE PARALLAX ══════════════════════════════════  */
(function initSiteParallax() {
  const layers = document.querySelectorAll('[data-px]');
  if (!layers.length) return;
  let ticking = false;
  function update() {
    const vh = window.innerHeight;
    layers.forEach(layer => {
      const speed  = parseFloat(layer.dataset.px||0.15);
      const parent = layer.closest('section')||layer.parentElement;
      const rect   = parent.getBoundingClientRect();
      const from   = (rect.top + rect.height/2) - vh/2;
      layer.style.transform = `translateY(${from*speed}px)`;
    });
    ticking = false;
  }
  window.addEventListener('scroll',()=>{ if(!ticking){requestAnimationFrame(update);ticking=true;} },{passive:true});
  update();
})();

/* ══ 8. HERO MULTI-LAYER PARALLAX ═══════════════════════════*/
(function initHeroParallax() {
  const hero  = document.getElementById('hero');
  const inner = hero?.querySelector('.hero-inner');
  const back  = hero?.querySelector('.hero-px-back');
  const mid   = hero?.querySelector('.hero-px-mid');
  if (!hero) return;
  function update() {
    const s=window.scrollY, vh=window.innerHeight;
    if (s > vh*1.5) return;
    if (back)  back.style.transform  = `translateY(${s*0.06}px) scale(1.08)`;
    if (mid)   mid.style.transform   = `translateY(${s*0.13}px)`;
    if (inner) { inner.style.transform=`translateY(${s*0.2}px)`; inner.style.opacity=`${Math.max(0,1-s/(vh*0.8))}`; }
  }
  window.addEventListener('scroll',update,{passive:true}); update();
})();

/* ══ 9. FILM STRIP SIDEBAR ═══════════════════════════════════ */
(function initFilmStrip() {
  const label   = document.getElementById('fs-label');
  const fill    = document.getElementById('fs-fill');
  const secs    = document.querySelectorAll('.film-section[data-frame]');
  if (!label||!fill||!secs.length) return;
  function update() {
    const maxY = document.documentElement.scrollHeight - window.innerHeight;
    fill.style.height = Math.max(0,Math.min(1,window.scrollY/maxY))*100+'%';
    let cur='01';
    secs.forEach(s=>{ if(s.getBoundingClientRect().top<=window.innerHeight*.55) cur=s.dataset.frame; });
    label.textContent=cur;
  }
  window.addEventListener('scroll',update,{passive:true}); update();
})();

/* ══ 10. SMOOTH ANCHOR SCROLL ════════════════════════════════ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const t=document.querySelector(a.getAttribute('href')); if(!t) return;
      e.preventDefault();
      window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-(document.getElementById('navbar')?.offsetHeight||64),behavior:'smooth'});
    });
  });
})();

/* ══ 11. ACTIVE NAV HIGHLIGHT ════════════════════════════════ */
(function initActiveNav() {
  const sections=document.querySelectorAll('section[id]'),links=document.querySelectorAll('.nav-links a[href^="#"]');
  if(!sections.length||!links.length) return;
  function upd(){
    let cur='';
    sections.forEach(s=>{ if(s.getBoundingClientRect().top<=120) cur=s.id; });
    links.forEach(l=>{ l.style.color=l.getAttribute('href')===`#${cur}`?'var(--cyan)':''; });
  }
  window.addEventListener('scroll',upd,{passive:true});
})();

/* ══ 12. TERMINAL CARD (re-triggers on scroll both ways) ═════ */
(function initTerminalReveal() {
  const t=document.querySelector('.terminal-card'); if(!t) return;
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{ e.isIntersecting?t.classList.add('terminal-animate'):t.classList.remove('terminal-animate'); });
  },{threshold:0.25});
  io.observe(t);
})();

/* ══ 13. CURSOR GLOW ═════════════════════════════════════════ */
(function initCursorGlow() {
  if(window.matchMedia('(hover: none)').matches) return;
  const g=document.createElement('div');
  g.style.cssText='position:fixed;pointer-events:none;z-index:9999;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(0,212,255,0.045) 0%,transparent 70%);transform:translate(-50%,-50%);transition:left 0.07s linear,top 0.07s linear;will-change:left,top;';
  document.body.appendChild(g);
  document.addEventListener('mousemove',e=>{g.style.left=e.clientX+'px';g.style.top=e.clientY+'px';},{passive:true});
})();

/* ══ 14. SHOWCASE PINNED SCROLL ══════════════════════════════ */
(function initShowcase() {
  const section=document.getElementById('showcase');
  const progressEl=document.getElementById('sc-progress');
  const scenes=document.querySelectorAll('.showcase-scene');
  const chapLbls=document.querySelectorAll('.sc-chap-lbl');
  const blobs=document.querySelectorAll('.sc-bg-blob');
  if(!section||!scenes.length) return;
  const N=scenes.length; let lastScene=-1;
  function update() {
    const rect=section.getBoundingClientRect();
    const progress=Math.max(0,Math.min(1,-rect.top/(section.offsetHeight-window.innerHeight)));
    if(progressEl) progressEl.style.width=(progress*100)+'%';
    const scene=Math.min(N-1,Math.floor(progress*N));
    if(scene===lastScene) return; lastScene=scene;
    scenes.forEach((el,i)=>{ el.classList.toggle('active',i===scene); el.classList.toggle('past',i<scene); });
    chapLbls.forEach(l=>l.classList.toggle('active',+l.dataset.scene===scene));
    blobs.forEach((b,i)=>b.classList.toggle('active',i===scene));
  }
  window.addEventListener('scroll',update,{passive:true}); update();
})();

/* ══ 15. VIDEO AUTOPLAY SAFETY ═══════════════════════════════
   Plays video when in viewport, pauses when not.
   Saves CPU/battery. Works around browser autoplay blocks.  */
(function initVideos() {
  const videos=document.querySelectorAll('video[autoplay]');
  if(!videos.length) return;
  const io=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{ entry.isIntersecting?entry.target.play().catch(()=>{}):entry.target.pause(); });
  },{threshold:0.2});
  videos.forEach(v=>{ v.muted=true; io.observe(v); });
})();

/* ══ 16. AI CHATBOT ══════════════════════════════════════════ */
(function initChatbot() {
  const WORKER_URL = 'portfolio-gemini-bridge.branwelclint-pro.workers.dev';
  const API_URL = `https://${WORKER_URL}`;

  const btn = document.getElementById('chat-btn');
  const widget = document.getElementById('chat-widget');
  const closeBtn = document.getElementById('chat-close');
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  const messages = document.getElementById('chat-messages');
  const expandBtn = document.getElementById('chat-expand');

  let isExpanded = false;

  if (!btn || !widget || !closeBtn || !input || !sendBtn || !messages || !expandBtn) return;

  expandBtn.addEventListener('click', () => {
    isExpanded = !isExpanded;
    widget.classList.toggle('expanded', isExpanded);
    expandBtn.textContent = isExpanded ? '⤡' : '⤢';
    expandBtn.title = isExpanded ? 'Collapse' : 'Expand';
    messages.scrollTop = messages.scrollHeight;
  });

  const history = [];

  btn.addEventListener('click', () => widget.classList.remove('hidden'));
  closeBtn.addEventListener('click', () => widget.classList.add('hidden'));

  function parseMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
}

  function addMsg(text, role) {
    const div = document.createElement('div');
    div.className = `chat-msg ${role}`;
    div.innerHTML = parseMarkdown(text);
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

let isLoading = false; // add this above the send function

async function send() {
  const text = input.value.trim();
  input.style.height = 'auto';
  if (!text || isLoading) return; // block if already waiting

  if (!API_URL) {
    addMsg('AI API is not configured. Try again later.', 'bot');
    return;
  }


  isLoading = true;
  sendBtn.disabled = true;
  input.disabled = true;
  sendBtn.style.opacity = '0.4';

  input.value = '';
  addMsg(text, 'user');
  history.push({ role: 'user', parts: [{ text }] });

  const typing = addMsg('...', 'bot typing');

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: history,
        generationConfig: {
          maxOutputTokens: 800,
          thinkingConfig: { thinkingLevel: "minimal" }
  }
})
    });

    if (res.status === 429) {
      typing.remove();
      addMsg('Too many requests. Wait a few seconds and try again.', 'bot');
      return;
    }

    const data = await res.json();
    console.log('Gemini response:', data);

    let reply;
    if (!res.ok) {
      reply = `Server error (${res.status}): ${data?.error?.message || JSON.stringify(data?.error) || 'unknown'}`;
    } else if (data?.promptFeedback?.blockReason) {
      reply = `Blocked: ${data.promptFeedback.blockReason}`;
    } else if (data?.candidates?.[0]?.finishReason && data.candidates[0].finishReason !== 'STOP') {
      reply = `Stopped early: ${data.candidates[0].finishReason}`;
    } else {
      reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Something went wrong. Try again.';
    }

    typing.remove();
    addMsg(reply, 'bot');
    history.push({ role: 'model', parts: [{ text: reply }] });

  } catch (err) {
    console.error('Fetch failed:', err);
    typing.remove();
    addMsg(`Network error: ${err.message}`, 'bot');
  } finally {
    isLoading = false;
    sendBtn.disabled = false;
    input.disabled = false;
    sendBtn.style.opacity = '1';
    input.focus();
  }
}

  sendBtn.addEventListener('click', send);
  input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    send();
  }
  input.style.height = 'auto';
  input.style.height = Math.min(input.scrollHeight, 90) + 'px';
});
})();
