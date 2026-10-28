'use strict';
const output = document.querySelector('#terminal-output');
const input = document.querySelector('#command');
const screen = document.querySelector('.terminal-screen');
const replies = {
  help: 'AVAILABLE COMMANDS\nhelp    — reveal this index\nsignal  — tune to the beacon\nmirror  — query the mirror\nstatus  — inspect the channel\nclear   — clear this transmission',
  signal: 'FREQUENCY 069 / SIGNAL ACQUIRED.\nNot all orders are announced. Some are assembled in silence.',
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

// Both experiences are fictional and entirely local. Nothing is transmitted.
const terminalDialog = document.querySelector('#cnm-dialog');
const echoDialog = document.querySelector('#echo-dialog');
const openers = new WeakMap();
function openDialog(dialog, opener) {
  if (dialog.open) return;
  openers.set(dialog, opener);
  dialog.showModal();
  document.body.classList.add('dialog-open');
  if (dialog === terminalDialog) input.focus({ preventScroll: true });
  else dialog.querySelector('.close').focus({ preventScroll: true });
}
document.querySelector('#contact-button').addEventListener('click', event => openDialog(terminalDialog, event.currentTarget));
document.querySelector('#command-contact').addEventListener('click', event => openDialog(echoDialog, event.currentTarget));
for (const dialog of [terminalDialog, echoDialog]) {
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());
  // Require the pointer to start and end on the backdrop; selecting text must not dismiss it.
  let backdropStart = false;
  const outside = event => {
    const box = dialog.getBoundingClientRect();
    return event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
  };
  dialog.addEventListener('pointerdown', event => { backdropStart = event.target === dialog && outside(event); });
  dialog.addEventListener('click', event => {
    if (backdropStart && event.target === dialog && outside(event)) dialog.close();
    backdropStart = false;
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    openers.get(dialog)?.focus({ preventScroll: true });
  });
}
