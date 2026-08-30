/* == AI CHATBOT WIDGET =======================================
   Self-contained: injects its own styles, markup, and behaviour.
   index.html and offduty.html both load this one file, so the
   chatbot only has to be changed in a single place.
   Add with: <script src="chat-widget.js"></script>
   ========================================================== */
(function mountChatWidget() {
  if (document.getElementById('chat-widget')) return;   // already present

  // -- styles ----------------------------------------------
  const style = document.createElement('style');
  style.textContent = `/* ══ AI CHATBOT WIDGET ══════════════════════════════════════ */
.chat-fab {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-card, #0d1117);
  border: 1px solid var(--cyan, #00d4ff);
  color: var(--cyan, #00d4ff);
  padding: 10px 18px;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  transition: box-shadow 0.2s, background 0.2s;
  box-shadow: 0 0 12px rgba(0, 212, 255, 0.15);
}
.chat-fab:hover {
  background: rgba(0, 212, 255, 0.08);
  box-shadow: 0 0 24px rgba(0, 212, 255, 0.35);
}
.chat-fab-icon { font-size: 1rem; }

.chat-widget {
  position: fixed;
  bottom: 90px;
  right: 32px;
  z-index: 1000;
  width: 420px;
  max-height: 560px;
  display: flex;
  flex-direction: column;
  background: #0a0e14;
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 4px;
  box-shadow: 0 0 40px rgba(0, 212, 255, 0.1);
  overflow: hidden;
  transition: opacity 0.2s, transform 0.2s;
}
.chat-widget.hidden {
  opacity: 0;
  pointer-events: none;
  transform: translateY(12px);
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-bottom: 1px solid rgba(0, 212, 255, 0.15);
  background: rgba(0, 212, 255, 0.04);
}
.chat-header-left { display: flex; align-items: center; gap: 8px; }
.chat-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--cyan, #00d4ff);
  box-shadow: 0 0 6px var(--cyan, #00d4ff);
  animation: pulse-dot 2s infinite;
}
@keyframes pulse-dot {
  0%, 100% { opacity: 1; } 50% { opacity: 0.4; }
}
.chat-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  color: var(--cyan, #00d4ff);
}
.chat-close {
  background: none; border: none;
  color: rgba(255,255,255,0.4);
  cursor: pointer; font-size: 0.8rem;
  transition: color 0.2s;
}
.chat-close:hover { color: #ff3c5e; }
.chat-header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.chat-expand {
  background: none;
  border: none;
  color: rgba(255,255,255,0.35);
  cursor: pointer;
  font-size: 0.85rem;
  transition: color 0.2s;
  padding: 0;
  line-height: 1;
}
.chat-expand:hover { color: var(--cyan, #00d4ff); }

/* Expanded state */
.chat-widget.expanded {
  width: min(700px, 90vw);
  max-height: min(78vh, 660px);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  scrollbar-width: thin;
  scrollbar-color: rgba(0,212,255,0.2) transparent;
}

.chat-msg {
  max-width: 88%;
  padding: 8px 12px;
  border-radius: 3px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  line-height: 1.55;
}
.chat-msg.bot {
  background: rgba(0, 212, 255, 0.06);
  border: 1px solid rgba(0, 212, 255, 0.15);
  color: rgba(255,255,255,0.85);
  align-self: flex-start;
}
.chat-msg.user {
  background: rgba(255, 60, 94, 0.08);
  border: 1px solid rgba(255, 60, 94, 0.2);
  color: rgba(255,255,255,0.9);
  align-self: flex-end;
}
.chat-msg.typing { opacity: 0.6; }

.chat-input-row {
  display: flex;
  border-top: 1px solid rgba(0, 212, 255, 0.15);
}
.chat-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.95rem;
  padding: 10px 14px;
  resize: none;
  overflow-y: auto;
  max-height: 90px;
  line-height: 1.5;
  align-self: center;
}

.chat-input::placeholder { color: rgba(255,255,255,0.25); }
.chat-send {
  background: none;
  border: none;
  border-left: 1px solid rgba(0, 212, 255, 0.15);
  color: var(--cyan, #00d4ff);
  padding: 0 14px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background 0.2s;
}
.chat-send:hover { background: rgba(0, 212, 255, 0.08); }

@media (max-width: 480px) {
  .chat-widget { width: calc(100vw - 32px); right: 16px; bottom: 80px; }
  .chat-fab { right: 16px; bottom: 16px; }`;
  document.head.appendChild(style);

  // -- markup ----------------------------------------------
  const holder = document.createElement('div');
  holder.innerHTML = `
<div id="chat-btn" class="chat-fab" aria-label="Ask about Clint">
  <span class="chat-fab-icon">◈</span>
  <span class="chat-fab-label">ASK AI ABOUT ME</span>
</div>

<div id="chat-widget" class="chat-widget hidden">
  <div class="chat-header">
    <div class="chat-header-left">
      <span class="chat-dot"></span>
      <span class="chat-title">ASK ABOUT CLINT</span>
    </div>
    <div class="chat-header-right">
      <button id="chat-expand" class="chat-expand" title="Expand">⤢</button>
      <button id="chat-close" class="chat-close">✕</button>
    </div>
  </div>
  <div id="chat-messages" class="chat-messages">
    <div class="chat-msg bot">
      <span>Hi! I can answer questions about Clint, his skills, projects, background, and experience. What do you want to know?</span>
    </div>
  </div>
  <div class="chat-input-row">
    <textarea id="chat-input" class="chat-input" placeholder="Ask something..." autocomplete="off" rows="1"></textarea>
    <button id="chat-send" class="chat-send">▶</button>
  </div>
</div>`;
  while (holder.firstChild) document.body.appendChild(holder.firstChild);

  // -- behaviour -------------------------------------------
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
})();
