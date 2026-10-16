/* ══ RETIREMENT NOTICE ═══════════════════════════════════════
   This site is being retired in favour of the new portfolio. A popup says so and
   offers the new site. It is self-contained (its own markup and styles) because
   offduty.html does not load style.css.
   Shown on EVERY page load on purpose, so visitors are reminded each time. */

(function retirementNotice() {
  const NEW_SITE = 'https://yoimuri.vercel.app/';

  const style = document.createElement('style');
  style.textContent = `
.rt-modal { position: fixed; inset: 0; z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 1.25rem; }
.rt-backdrop { position: absolute; inset: 0; background: rgba(2, 4, 10, 0.84); backdrop-filter: blur(3px); }
.rt-card { position: relative; width: 100%; max-width: 440px; background: #0a0f1c; border: 1px solid rgba(0,229,255,0.22);
  padding: 2rem 1.75rem 1.6rem; text-align: center; font-family: 'Chakra Petch', sans-serif; color: #c0cfe0;
  animation: rtIn 0.22s ease-out; }
.rt-corner { position: absolute; width: 10px; height: 10px; border-color: #00e5ff; border-style: solid; }
.rt-corner.tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
.rt-corner.tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
.rt-corner.bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
.rt-corner.br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }
.rt-tag { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; letter-spacing: 0.22em; color: #00ff88; }
.rt-title { font-size: 1.3rem; font-weight: 700; color: #fff; margin: 0.6rem 0 0.9rem; }
.rt-body p { font-size: 0.9rem; line-height: 1.7; margin: 0; }
.rt-body p + p { margin-top: 0.7rem; color: #8494a7; font-size: 0.85rem; }
.rt-actions { display: flex; flex-direction: column; gap: 0.6rem; margin-top: 1.4rem; }
.rt-go, .rt-stay { display: flex; align-items: center; justify-content: center; min-height: 44px; font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem; letter-spacing: 0.16em; text-decoration: none; cursor: pointer; border: 1px solid #00e5ff; }
.rt-go { background: #00e5ff; color: #060810; font-weight: 700; }
.rt-go:hover { background: #fff; border-color: #fff; }
.rt-stay { background: transparent; color: #c0cfe0; border-color: rgba(255,255,255,0.18); }
.rt-stay:hover { color: #fff; border-color: #fff; }
.rt-go:focus-visible, .rt-stay:focus-visible { outline: 2px solid #00ff88; outline-offset: 3px; }
@keyframes rtIn { from { opacity: 0; transform: translateY(10px) scale(0.985); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .rt-card { animation: none; } .rt-backdrop { backdrop-filter: none; } }
@media (max-width: 480px) { .rt-card { padding: 1.6rem 1.25rem 1.35rem; } .rt-title { font-size: 1.15rem; } }`;
  document.head.appendChild(style);

  const modal = document.createElement('div');
  modal.className = 'rt-modal';
  modal.innerHTML = `
  <div class="rt-backdrop" data-rt-close></div>
  <div class="rt-card" role="dialog" aria-modal="true" aria-labelledby="rt-title" aria-describedby="rt-body">
    <span class="rt-corner tl"></span><span class="rt-corner tr"></span>
    <span class="rt-corner bl"></span><span class="rt-corner br"></span>
    <div class="rt-tag">[ NOTICE ]</div>
    <h2 id="rt-title" class="rt-title">I've moved to a new portfolio</h2>
    <div id="rt-body" class="rt-body">
      <p>I'm officially transitioning to my new portfolio and retiring this site, so this one stays online only as the older version.</p>
      <p>Since it is being retired, the contact form and the AI chatbot here may not work anymore. Both of them live on the new site now.</p>
    </div>
    <div class="rt-actions">
      <a class="rt-go" href="${NEW_SITE}">GO TO THE NEW SITE</a>
      <button type="button" class="rt-stay" data-rt-close>STAY ON THIS ONE</button>
    </div>
  </div>`;

  const close = () => {
    modal.remove();
    document.removeEventListener('keydown', onKey);
  };
  const onKey = (e) => { if (e.key === 'Escape') close(); };

  modal.querySelectorAll('[data-rt-close]').forEach((el) => el.addEventListener('click', close));
  document.addEventListener('keydown', onKey);

  const show = () => {
    document.body.appendChild(modal);
    modal.querySelector('.rt-go').focus();
  };
  if (document.body) show();
  else document.addEventListener('DOMContentLoaded', show);
})();
