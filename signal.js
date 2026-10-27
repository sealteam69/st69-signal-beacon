'use strict';
// Deterministic, decorative starfield. No network requests or browser storage.
const sky = document.querySelector('.stars');
let seed = 69;
const random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
for (let i = 0; i < 155; i++) {
  const star = document.createElement('i'); star.className = 'star';
  star.style.left = `${random() * 100}%`; star.style.top = `${random() * 100}%`;
  star.style.opacity = String(.12 + random() * .5); sky.append(star);
}
const output = document.querySelector('#terminal-output');
const input = document.querySelector('#command');
const screen = document.querySelector('.terminal-screen');
const replies = {
  help: 'AVAILABLE COMMANDS\nhelp    — reveal this index\nsignal  — tune to the beacon\nmirror  — query the mirror\nstatus  — inspect the channel\nclear   — clear this transmission',
  signal: 'FREQUENCY 069 / SIGNAL ACQUIRED.\nNot all orders are announced. Some are assembled in silence.\nThe signal precedes the arrival.',
  mirror: 'THE MIRROR IS NOT YET AWAKE.\nBut it knows you are here.\nStand by. The silence is intentional.',
  status: 'BEACON: ACTIVE\nMIRROR: DORMANT\nARRIVAL: UNDISCLOSED\nLOCAL SIMULATION / NO TRANSMISSION SENT'
};
function run(raw) {
  const command = raw.trim().toLowerCase(); if (!command) return;
  if (command === 'clear') { output.replaceChildren(); input.value = ''; return; }
  const echo = document.createElement('p'); echo.className = 'echo'; echo.textContent = `visitor@st69 ~ > ${raw.trim()}`;
  const response = document.createElement('p'); response.textContent = replies[command] || 'UNRECOGNISED SIGNAL. Type help for available commands.';
  output.append(echo, response);
  while (output.children.length > 32) output.firstElementChild.remove();
  input.value = ''; screen.scrollTop = screen.scrollHeight;
}
document.querySelector('#command-form').addEventListener('submit', event => { event.preventDefault(); run(input.value); });
document.querySelectorAll('[data-command]').forEach(button => button.addEventListener('click', () => { run(button.dataset.command); }));
