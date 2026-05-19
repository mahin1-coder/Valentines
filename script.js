/* ================================================================
   Valentine Web App – script.js
   Features:
     - 3-stage experience: Landing > Question > Celebration
     - Floating hearts background (continuous)
     - No button that escapes on hover/touch, shrinks over time
     - Yes button triggers heart confetti + celebration stage
     - Personalisation via form + URL query params (shareable link)
   ================================================================ */

// DOM refs
const stages = {
  landing:     document.getElementById('stage-landing'),
  question:    document.getElementById('stage-question'),
  celebration: document.getElementById('stage-celebration'),
};

const displayTo   = document.getElementById('display-to');
const displayFrom = document.getElementById('display-from');

const openBtn         = document.getElementById('open-btn');
const customizeToggle = document.getElementById('customize-toggle');
const customizePanel  = document.getElementById('customize-panel');
const inputTo         = document.getElementById('input-to');
const inputFrom       = document.getElementById('input-from');
const inputMsg        = document.getElementById('input-msg');
const saveCustomize   = document.getElementById('save-customize');

const yesBtn           = document.getElementById('yes-btn');
const noBtn            = document.getElementById('no-btn');
const responseText     = document.getElementById('response-text');
const questionSubtitle = document.getElementById('question-subtitle');

const confettiContainer = document.getElementById('confetti-container');
const celebrationSub    = document.getElementById('celebration-sub');
const finalMessage      = document.getElementById('final-message');
const shareBtn          = document.getElementById('share-btn');
const restartBtn        = document.getElementById('restart-btn');
const heartsBg          = document.getElementById('hearts-bg');

// App state
let recipientName   = 'Sweetheart';
let senderName      = 'Your Person';
let personalMessage = 'I knew you\u2019d say yes \u{1F48C}';

let noEscapeCount = 0;
let isNoBtnFixed  = false;

const noMessages = [
  'Come back here! \u{1F624}',
  'That button is also saying yes deep down \u{1F495}',
  'Interesting strategy\u2026 \u{1F440}',
  'The heart already answered for you \u{1F496}',
  'Nice try! \u{1F604}',
  'Your heart already said yes \u{1F970}',
  'Trying harder won\u2019t work, trust me \u{1F380}',
  'This button has legs apparently \u{1F3C3}',
  'You can\u2019t say no to this \u{1F97A}',
  'I saw you almost catch it\u2026 \u{1F4AD}',
  'Persistence is cute but so is saying yes \u{1F618}',
  'Ok the button is just really fast \u{1F602}',
];

const confettiPieces = ['\u{1F495}','\u{1F496}','\u{1F497}','\u{1F49D}','\u{1F339}','\u{2728}','\u{1F389}','\u{1F4AB}','\u{1FA77}','\u2764\uFE0F','\u{1F970}','\u{1F498}'];
const floatEmojis    = ['\u{1F495}','\u{1F497}','\u{1F496}','\u{1F493}','\u{1F49D}','\u{1FA77}','\u2764\uFE0F','\u{1F339}','\u{2728}'];

// ---- FLOATING HEARTS ----

function spawnFloatingHeart() {
  var el = document.createElement('span');
  el.className   = 'float-heart';
  el.textContent = floatEmojis[Math.floor(Math.random() * floatEmojis.length)];
  var size     = 12 + Math.random() * 22;
  var left     = Math.random() * 100;
  var duration = 5  + Math.random() * 6;
  var delay    = Math.random() * 1.5;
  el.style.cssText = 'left:' + left + '%;font-size:' + size + 'px;animation-duration:' + duration + 's;animation-delay:' + delay + 's;';
  heartsBg.appendChild(el);
  setTimeout(function() { el.remove(); }, (duration + delay) * 1000 + 300);
}

function startFloatingHearts() {
  spawnFloatingHeart();
  setInterval(function() {
    spawnFloatingHeart();
    if (Math.random() > 0.55) spawnFloatingHeart();
  }, 900);
}

// ---- STAGE TRANSITIONS ----

function showStage(targetKey) {
  Object.entries(stages).forEach(function(pair) {
    var key = pair[0], el = pair[1];
    if (key === targetKey) {
      el.classList.add('active');
      el.style.animation = 'none';
      void el.offsetHeight;
      el.style.animation = '';
    } else {
      el.classList.remove('active');
    }
  });
}

// ---- PERSONALISATION ----

function updateDisplay() {
  displayTo.textContent        = recipientName;
  displayFrom.textContent      = senderName;
  questionSubtitle.textContent = senderName + ' already booked the table \u{1F353}';
  celebrationSub.textContent   = 'You just made ' + senderName + '\u2019s whole year. \u{1F495}';
  finalMessage.textContent     = personalMessage;
}

customizeToggle.addEventListener('click', function() {
  var isHidden = customizePanel.classList.toggle('hidden');
  customizeToggle.textContent = isHidden ? '\u270F\uFE0F Personalise this' : '\u2715 Close';
  if (!isHidden) {
    inputTo.value   = recipientName === 'Sweetheart'  ? '' : recipientName;
    inputFrom.value = senderName    === 'Your Person' ? '' : senderName;
    inputMsg.value  = personalMessage;
    inputTo.focus();
  }
});

saveCustomize.addEventListener('click', function() {
  recipientName   = inputTo.value.trim()   || 'Sweetheart';
  senderName      = inputFrom.value.trim() || 'Your Person';
  personalMessage = inputMsg.value.trim()  || 'I knew you\u2019d say yes \u{1F48C}';
  updateDisplay();
  customizePanel.classList.add('hidden');
  customizeToggle.textContent = '\u270F\uFE0F Personalise this';
});

[inputTo, inputFrom].forEach(function(inp) {
  inp.addEventListener('keydown', function(e) { if (e.key === 'Enter') saveCustomize.click(); });
});

function applyUrlParams() {
  var p = new URLSearchParams(window.location.search);
  if (p.get('to'))   recipientName   = decodeURIComponent(p.get('to'));
  if (p.get('from')) senderName      = decodeURIComponent(p.get('from'));
  if (p.get('msg'))  personalMessage = decodeURIComponent(p.get('msg'));
  updateDisplay();
}

// ---- NO BUTTON ESCAPE ----

function makeNoBtnFixed() {
  if (isNoBtnFixed) return;
  var rect = noBtn.getBoundingClientRect();
  noBtn.style.left  = rect.left  + 'px';
  noBtn.style.top   = rect.top   + 'px';
  noBtn.style.width = rect.width + 'px';
  noBtn.classList.add('is-fixed');
  isNoBtnFixed = true;
}

function moveNoBtn() {
  makeNoBtnFixed();
  noEscapeCount++;
  responseText.textContent = noMessages[(noEscapeCount - 1) % noMessages.length];
  var pad  = 60;
  var btnW = noBtn.offsetWidth  || 90;
  var btnH = noBtn.offsetHeight || 44;
  var maxX = Math.max(pad, window.innerWidth  - btnW - pad);
  var maxY = Math.max(pad, window.innerHeight - btnH - pad);
  noBtn.style.left = (pad + Math.random() * maxX) + 'px';
  noBtn.style.top  = (pad + Math.random() * maxY) + 'px';
  if (noEscapeCount > 5) {
    var scale = Math.max(0.3, 1 - (noEscapeCount - 5) * 0.09);
    noBtn.style.transform = 'scale(' + scale + ')';
  }
  if (noEscapeCount > 12) {
    noBtn.style.opacity = String(Math.max(0.15, 1 - (noEscapeCount - 12) * 0.07));
  }
}

noBtn.addEventListener('mouseenter', moveNoBtn);

noBtn.addEventListener('touchstart', function(e) {
  e.preventDefault();
  moveNoBtn();
}, { passive: false });

noBtn.addEventListener('click', function() {
  moveNoBtn();
  responseText.textContent = 'Using keyboard, huh? Very clever \u{1F604}';
});

// ---- YES BUTTON CELEBRATION ----

function launchConfetti() {
  for (var i = 0; i < 90; i++) {
    var el     = document.createElement('span');
    el.className   = 'confetti-piece';
    el.textContent = confettiPieces[Math.floor(Math.random() * confettiPieces.length)];
    var left  = Math.random() * 100;
    var dur   = 2.2 + Math.random() * 2.5;
    var delay = Math.random() * 1.8;
    var size  = 14  + Math.random() * 26;
    el.style.cssText = 'left:' + left + '%;font-size:' + size + 'px;animation-duration:' + dur + 's;animation-delay:' + delay + 's;';
    confettiContainer.appendChild(el);
  }
  setTimeout(function() { confettiContainer.innerHTML = ''; }, 7000);
}

yesBtn.addEventListener('click', function() {
  launchConfetti();
  showStage('celebration');
  noBtn.classList.remove('is-fixed');
  noBtn.style.cssText = '';
  isNoBtnFixed = false;
});

// ---- OPEN BUTTON ----

openBtn.addEventListener('click', function() {
  noEscapeCount = 0;
  isNoBtnFixed  = false;
  noBtn.classList.remove('is-fixed');
  noBtn.style.cssText      = '';
  responseText.textContent = '';
  showStage('question');
});

// ---- SHARE ----

shareBtn.addEventListener('click', function() {
  var base   = window.location.origin + window.location.pathname;
  var params = new URLSearchParams({ to: recipientName, from: senderName, msg: personalMessage });
  var url    = base + '?' + params.toString();
  if (navigator.share) {
    navigator.share({ title: '\u{1F48C} Will you be my Valentine?', url: url });
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(function() {
      var prev = shareBtn.textContent;
      shareBtn.textContent = '\u2713 Link copied!';
      setTimeout(function() { shareBtn.textContent = prev; }, 3000);
    });
  } else {
    window.prompt('Copy your Valentine link \u{1F48C}', url);
  }
});

// ---- RESTART ----

restartBtn.addEventListener('click', function() { showStage('landing'); });

// ---- INIT ----

function init() {
  applyUrlParams();
  startFloatingHearts();
}

init();
