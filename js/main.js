// =============================================
// スクロール出現アニメーション
// =============================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.js-reveal').forEach(el => observer.observe(el));


// =============================================
// 💬 チャット風Q&A
// ★ 森さんからヒアリングして内容を差し替え ★
// =============================================
const qaData = {
  initial: {
    greeting: "こんにちは！\n何か気になることはありますか？",
    choices: [
      { id: "shomikigen", icon: "calendar",  label: "賞味期限はどのくらい？" },
      { id: "enbun",      icon: "droplets",  label: "塩分はどのくらい？" },
      { id: "hozon",      icon: "home",      label: "開封後の保存方法は？" },
      { id: "tenka",      icon: "leaf",      label: "添加物は入ってる？" },
      { id: "gift",       icon: "gift",      label: "贈り物にできる？" },
      { id: "recipe",     icon: "chef-hat",  label: "他のおすすめの食べ方は？" },
      { id: "allergy",    icon: "leaf",      label: "アレルギーは大丈夫？" },
      { id: "kids",       icon: "hand",      label: "子どもにも食べさせていい？" },
      { id: "shipping",   icon: "cart",      label: "送料や届く日数は？" },
      { id: "lineup",     icon: "flower",    label: "他にどんな商品がある？" }
    ]
  },
  answers: {
    shomikigen: {
      question: "賞味期限はどのくらい？",
      answer: "未開封の状態で製造日から約6ヶ月です。\n\n梅と塩だけで作っているので、冷暗所で保管していただければ長く美味しく召し上がれますよ。\n\nラベルに記載の日付をご確認くださいね。"
    },
    enbun: {
      question: "塩分はどのくらい？",
      answer: "塩分は約10%です。\n\n昔ながらの梅干しは15〜20%のものが多いですが、うちの梅肉は食べやすいよう少し控えめにしています。\n\nとはいえしっかり梅の味がしますので、お料理の味付けにも十分使えますよ。"
    },
    hozon: {
      question: "開封後の保存方法は？",
      answer: "開封後は冷蔵庫で保管してください。\n\nきれいなスプーンで取り出していただければ、開封後も1〜2ヶ月は美味しく召し上がれます。\n\n梅の酸が強いので、金属のスプーンよりも木や樹脂製のものがおすすめです。"
    },
    tenka: {
      question: "添加物は入ってる？",
      answer: "一切入っていません。\n\n原材料は「梅」と「食塩」だけ。着色料、保存料、甘味料は使っていません。\n\nうちで育てた南高梅を、昔ながらの方法でそのまま加工しています。小さなお子さんにも安心して召し上がっていただけますよ。"
    },
    gift: {
      question: "贈り物にできる？",
      answer: "はい、ギフト包装も承っています！\n\n梅肉単品はもちろん、梅干しや柚子こしょうとの詰め合わせセットもございます。\n\nのし紙もお付けできますので、お中元やお歳暮、ちょっとしたお礼にもぴったりです。"
    },
    recipe: {
      question: "他のおすすめの食べ方は？",
      answer: "たくさんありますよ！\n\n● 餃子のタレに混ぜる\n→ 酢の代わりに梅肉を。さっぱり！\n\n● 鶏肉の梅肉焼き\n→ 鶏もも肉に塗って焼くだけで、ごちそうに\n\n● 梅ソーダ\n→ 炭酸水に溶かして。夏バテ対策にも◎\n\nInstagramでもレシピを紹介しています！"
    },
    allergy: {
      question: "アレルギーは大丈夫？",
      answer: "原材料は梅と食塩のみですので、特定原材料等28品目は含まれていません。\n\n同じ工場で他のアレルゲンを含む食品を製造することもありませんので、ご安心ください。\n\nご不安な点があれば、お気軽にお電話でお問い合わせくださいね。"
    },
    kids: {
      question: "子どもにも食べさせていい？",
      answer: "はい、お子さんにも安心して召し上がっていただけます！\n\n無添加で梅と塩だけなので、離乳食が完了したお子さんから大丈夫ですよ。\n\n塩分が気になる場合は、ご飯に少量混ぜたり、おにぎりの具にするのがおすすめです。うちの孫たちも大好きです（笑）"
    },
    shipping: {
      question: "送料や届く日数は？",
      answer: "オンラインショップからご注文いただけます。\n\n● 送料はお届け先の地域によって異なります\n● ご注文から通常3〜5営業日でお届けします\n● クール便での発送も対応しています\n\n詳しくはオンラインショップをご覧いただくか、お電話でお気軽にどうぞ。"
    },
    lineup: {
      question: "他にどんな商品がある？",
      answer: "梅肉の他にもいろいろありますよ！\n\n● 美咲梅（梅干し）\n→ 看板商品。コンクール最優秀賞の梅干し\n\n● 七折小梅\n→ お弁当にぴったりの小粒の赤梅\n\n● 干し梅\n→ 種なしのおやつ梅。おやつやサラダに\n\n● さくら茶\n→ お祝い事にぴったりの春の一杯\n\nオンラインショップで全商品をご覧いただけます！"
    }
  }
};

// Lucide アイコンSVGマップ
const iconSVG = {
  'calendar':  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>',
  'droplets':  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>',
  'home':      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  'leaf':      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 20 .5 20 .5s.5 4.5-1.5 10.2A7 7 0 0 1 11 20z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
  'gift':      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect width="20" height="5" x="2" y="7"/><line x1="12" x2="12" y1="22" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>',
  'chef-hat':  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><line x1="6" x2="18" y1="17" y2="17"/></svg>',
  'phone':     '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  'mail':      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  'x':         '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
  'message':   '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>',
  'clock':     '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  'trophy':    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
  'hand':      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>',
  'mountain':  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>',
  'cart':      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>',
  'instagram': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>',
  'facebook':  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
  'flower':    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m7.5 0a4.5 4.5 0 1 1-4.5 4.5m4.5-4.5H15m-3 4.5V15"/><circle cx="12" cy="12" r="3"/></svg>'
};

function getIcon(name, className) {
  const svg = iconSVG[name] || '';
  if (!svg) return '';
  return '<span class="' + (className || 'icon') + '">' + svg + '</span>';
}

// DOM
const chatFab = document.getElementById('chatFab');
const chatLabel = document.getElementById('chatLabel');
const chatPanel = document.getElementById('chatPanel');
const chatClose = document.getElementById('chatClose');
const chatMessages = document.getElementById('chatMessages');
let isOpen = false;
let hasOpened = false;

function toggleChat() {
  isOpen = !isOpen;
  chatPanel.classList.toggle('is-open', isOpen);
  chatFab.classList.toggle('is-open', isOpen);
  chatFab.innerHTML = isOpen ? getIcon('x') : getIcon('message');
  chatLabel.classList.toggle('is-hidden', isOpen);
  if (isOpen && !hasOpened) {
    hasOpened = true;
    showInitialMessage();
  }
}

chatFab.addEventListener('click', toggleChat);
chatClose.addEventListener('click', toggleChat);

setTimeout(() => { if (!isOpen) chatLabel.classList.add('is-hidden'); }, 5000);

function showInitialMessage() {
  chatMessages.innerHTML = '';
  addTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    addBubble('from-mori', qaData.initial.greeting);
    setTimeout(() => { addChoices(qaData.initial.choices); }, 400);
  }, 800);
}

function addBubble(type, text) {
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble ' + type;
  bubble.innerHTML = text.replace(/\n/g, '<br>');
  chatMessages.appendChild(bubble);
  scrollToBottom();
}

function addChoices(choices) {
  const container = document.createElement('div');
  container.className = 'chat-choices';
  choices.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'chat-choice-btn';
    btn.innerHTML = getIcon(c.icon, 'choice-icon') + ' ' + c.label;
    btn.addEventListener('click', () => handleChoice(c.id));
    container.appendChild(btn);
  });
  chatMessages.appendChild(container);
  scrollToBottom();
}

function handleChoice(id) {
  const qa = qaData.answers[id];
  if (!qa) return;

  const old = chatMessages.querySelectorAll('.chat-choices');
  old.forEach(el => el.remove());

  addBubble('from-user', qa.question);

  setTimeout(() => {
    addTypingIndicator();
    setTimeout(() => {
      removeTypingIndicator();
      addBubble('from-mori', qa.answer);
      setTimeout(() => { addFollowUpChoices(id); }, 400);
    }, 1200);
  }, 400);
}

function addFollowUpChoices(answeredId) {
  const remaining = qaData.initial.choices.filter(c => c.id !== answeredId);
  const allChoices = [
    ...remaining,
    { id: "_tel",     icon: "phone", label: "電話して直接きく" },
    { id: "_contact", icon: "mail",  label: "お問い合わせフォーム" }
  ];

  const container = document.createElement('div');
  container.className = 'chat-choices';
  allChoices.forEach(c => {
    if (c.id === '_tel') {
      const link = document.createElement('a');
      link.href = 'tel:0973522873';
      link.className = 'chat-choice-btn';
      link.innerHTML = getIcon(c.icon, 'choice-icon') + ' ' + c.label;
      container.appendChild(link);
    } else if (c.id === '_contact') {
      const link = document.createElement('a');
      link.href = 'https://moribaien-nouen.net/contact/';
      link.target = '_blank';
      link.rel = 'noopener';
      link.className = 'chat-choice-btn';
      link.innerHTML = getIcon(c.icon, 'choice-icon') + ' ' + c.label;
      container.appendChild(link);
    } else {
      const btn = document.createElement('button');
      btn.className = 'chat-choice-btn';
      btn.innerHTML = getIcon(c.icon, 'choice-icon') + ' ' + c.label;
      btn.addEventListener('click', () => handleChoice(c.id));
      container.appendChild(btn);
    }
  });
  chatMessages.appendChild(container);
  scrollToBottom();
}

function addTypingIndicator() {
  const t = document.createElement('div');
  t.className = 'typing-indicator'; t.id = 'typingIndicator';
  t.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
  chatMessages.appendChild(t);
  scrollToBottom();
}

function removeTypingIndicator() {
  const t = document.getElementById('typingIndicator');
  if (t) t.remove();
}

function scrollToBottom() {
  requestAnimationFrame(() => { chatMessages.scrollTop = chatMessages.scrollHeight; });
}
