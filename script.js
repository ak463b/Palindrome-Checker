const input = document.querySelector('#input-data');
const checkBtn = document.querySelector('#check-button');
const resultText = document.querySelector('#result-text');
const resultBadge = document.querySelector('#result-badge');
const clearBtn = document.querySelector('#clear-button');
const voiceBtn = document.querySelector('#voice-button');
const themeToggle = document.querySelector('#theme-toggle');
const historyList = document.querySelector('#history-list');

// Theme toggle
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light');
  themeToggle.checked = true;
}

themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

function isPalindrome(text) {
  const clean = text.toLowerCase().replace(/[^a-z0-9]/g, '');
  return clean === clean.split('').reverse().join('') && clean.length > 0;
}

function updateResult() {
  const val = input.value.trim();
  if (!val) return;
  const isPalin = isPalindrome(val);
  resultText.textContent = isPalin ? `"${val}" is a Palindrome ✅` : `"${val}" is NOT a Palindrome ❌`;
  resultBadge.textContent = isPalin ? "✨ Palindrome!" : "🚫 Not a Palindrome!";
  resultBadge.style.color = isPalin ? "var(--badge-positive)" : "var(--badge-negative)";
  addToHistory(val, isPalin);
}

checkBtn.addEventListener('click', updateResult);
input.addEventListener('input', updateResult);
clearBtn.addEventListener('click', () => {
  input.value = "";
  resultText.textContent = "";
  resultBadge.textContent = "";
});

function addToHistory(word, status) {
  const item = document.createElement('li');
  item.textContent = `${word} - ${status ? 'Palindrome' : 'Not Palindrome'}`;
  historyList.prepend(item);
}

// Voice input
voiceBtn.addEventListener('click', () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();
  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    input.value = transcript;
    updateResult();
  };
});
