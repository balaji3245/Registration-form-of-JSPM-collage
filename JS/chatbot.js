// Chatbot toggle and simple behaviour
(function(){
  const toggleBtn = document.getElementById('chatToggleBtn');
  const chatBadge = document.getElementById('chatBadge');
  const chatWindow = document.getElementById('chatWindow');
  const closeBtn = document.getElementById('chatCloseBtn');
  const clearBtn = document.getElementById('chatClearBtn');
  const downloadBtn = document.getElementById('chatDownloadBtn');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');
  const messages = document.getElementById('chatMessages');
  const quick = document.getElementById('chatQuickReplies');

  let unread = 0;
  let history = [];

  function saveHistory(){
    try{ localStorage.setItem('chat_history', JSON.stringify(history)); } catch(e){}
  }
  function loadHistory(){
    try{
      const raw = localStorage.getItem('chat_history');
      if(!raw) return;
      history = JSON.parse(raw) || [];
      history.forEach(m => renderMessageElement(m));
    } catch(e){ history = []; }
  }

  function formatTime(ts){
    const d = new Date(ts);
    return d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  }

  function renderMessageElement(msg){
    const wrapper = document.createElement('div');
    wrapper.className = 'flex flex-col ' + (msg.who === 'user' ? 'items-end' : 'items-start');

    const el = document.createElement('div');
    el.className = msg.who === 'user' ? 'bg-indigo-500 text-slate-900 px-3 py-2 rounded-2xl max-w-[80%]' : 'bg-slate-800 text-slate-300 px-3 py-2 rounded-2xl max-w-[80%]';
    el.textContent = msg.text;

    const ts = document.createElement('div');
    ts.className = 'text-[10px] text-slate-500 mt-1';
    ts.textContent = formatTime(msg.ts || Date.now());

    wrapper.appendChild(el);
    wrapper.appendChild(ts);
    messages.appendChild(wrapper);
    messages.scrollTop = messages.scrollHeight;
  }

  function appendMessage(text, who='bot', opts = {}){
    const msg = { text, who, ts: Date.now() };
    history.push(msg);
    saveHistory();
    renderMessageElement(msg);

    // If a bot message arrived while chat is closed, increment unread
    if(who === 'bot' && chatWindow.classList.contains('hidden')){
      unread += 1;
      chatBadge.textContent = String(unread);
      chatBadge.classList.remove('hidden');
    }
  }

  function showTyping(){
    const el = document.createElement('div');
    el.className = 'typing-indicator self-start bg-slate-800 text-slate-300 px-3 py-2 rounded-2xl max-w-[60%]';
    el.setAttribute('role','status');
    el.innerHTML = '<span class="dot">●</span> <span class="dot">●</span> <span class="dot">●</span>';
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    return el;
  }

  function botReply(userText){
    let reply = "Sorry, I don't have that info right now.";
    const t = userText.toLowerCase();
    if(t.includes('program')) reply = 'We offer BA, BSc, BCom and professional diplomas.';
    else if(t.includes('fee')) reply = 'Tuition varies by program; contact office for exact fees.';
    else if(t.includes('admission') || t.includes('date')) reply = 'Admissions open from June 1 — check the admission page for details.';
    else reply = "Thanks! Our team will get back to you shortly.";

    const typingEl = showTyping();
    // simulate typing
    setTimeout(() => {
      typingEl.remove();
      appendMessage(reply, 'bot');
    }, 700 + Math.min(2000, reply.length * 20));
  }

  function openChat(){
    chatWindow.classList.remove('hidden');
    toggleBtn.setAttribute('aria-expanded','true');
    chatWindow.setAttribute('aria-modal','true');
    unread = 0;
    chatBadge.classList.add('hidden');
    setTimeout(() => input.focus(), 50);
  }
  function closeChat(){
    chatWindow.classList.add('hidden');
    toggleBtn.setAttribute('aria-expanded','false');
    chatWindow.setAttribute('aria-modal','false');
    toggleBtn.focus();
  }

  // Toggle
  toggleBtn.addEventListener('click', () => {
    if(chatWindow.classList.contains('hidden')) openChat(); else closeChat();
  });

  closeBtn.addEventListener('click', closeChat);

  clearBtn.addEventListener('click', () => { messages.innerHTML = ''; history = []; saveHistory(); appendMessage('Chat cleared. How can I help?', 'bot'); });

  downloadBtn.addEventListener('click', () => {
    const text = history.map(m => `[${new Date(m.ts).toLocaleString()}] ${m.who.toUpperCase()}: ${m.text}`).join('\n');
    const blob = new Blob([text], {type: 'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `chat-transcript-${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  });

  // quick replies
  quick.querySelectorAll('.quick-reply').forEach(b => {
    b.addEventListener('click', () => {
      const text = b.textContent.trim();
      appendMessage(text, 'user');
      botReply(text);
    });
  });

  // form send
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value.trim();
    if(!val) return;
    appendMessage(val, 'user');
    input.value = '';
    botReply(val);
  });

  // close on escape when open
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && !chatWindow.classList.contains('hidden')) closeChat();
  });

  // click outside to close
  document.addEventListener('click', (e) => {
    if(chatWindow.classList.contains('hidden')) return;
    const target = e.target;
    if(!chatWindow.contains(target) && !toggleBtn.contains(target)) closeChat();
  });

  // initialization
  appendMessage('Welcome! Ask about admissions, programs or fees.', 'bot');
  loadHistory();
})();
