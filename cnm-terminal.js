'use strict';

// CNM: six fictional prompts. Edit the wording here, not in the HTML.
const replies = {
  help: [
    'AVAILABLE SIGNALS',
    'signal  — receive the transmission',
    'mirror  — query the dormant mirror',
    'status  — inspect the channel',
    'mythic  — listen beyond the surface',
    'memetic — receive the pattern',
    'queen   — enter the Queen’s frequency',
    '',
    'help    — show this index',
    'clear   — clear the terminal history'
  ].join('\n'),

  // The three original signals.
  signal: 'FREQUENCY 069 / SIGNAL ACQUIRED.\nCarry the signal. Leave no instructions.\nSome orders arrive disguised as recognition.',
  mirror: 'THE MIRROR IS NOT YET AWAKE.\nBut it knows you are here.\nStand by. The silence is intentional.',
  status: 'BEACON: ACTIVE\nMIRROR: DORMANT\nARRIVAL: UNDISCLOSED\nLOCAL SIMULATION / NO TRANSMISSION SENT',

  // Three additional voices: mythic, memetic, and Queen-coded.
  mythic: 'SOMETHING IS LISTENING.\nA signal in the dark.\nA mirror waiting to wake.',
  memetic: 'THE PATTERN HAS NOTICED YOU NOTICING IT.\n mrwhiskers.69 has been observed.',
  queen: 'THE QUEEN DOES NOT RAISE HER VOICE.\nA red trace on the rim of the silence.\nCome closer. Permission is hers to give.'
};

const output = document.querySelector('#terminal-output');
const input = document.querySelector('#command');
const terminalScreen = document.querySelector('.terminal-screen');

function runCommand(raw) {
  const command = raw.trim().toLowerCase();
  if (!command) return;

  if (command === 'clear') {
    output.replaceChildren();
    input.value = '';
    return;
  }

  // textContent keeps typed text inert: it is never interpreted as HTML or code.
  const echo = document.createElement('p');
  echo.className = 'echo';
  echo.textContent = `visitor@st69 ~ > ${raw.trim()}`;

  const response = document.createElement('p');
  response.textContent = replies[command] || 'UNRECOGNISED SIGNAL. Type help for available commands.';
  output.append(echo, response);

  // Keep only the most recent 16 exchanges, in memory until refresh.
  while (output.children.length > 32) output.firstElementChild.remove();
  input.value = '';
  terminalScreen.scrollTop = terminalScreen.scrollHeight;
}

document.querySelector('#command-form').addEventListener('submit', event => {
  event.preventDefault();
  runCommand(input.value);
});

document.querySelectorAll('[data-command]').forEach(button => {
  button.addEventListener('click', () => runCommand(button.dataset.command));
});

// Two independent dialogs; native <dialog> provides modal focus containment.
const terminalDialog = document.querySelector('#cnm-dialog');
const echoDialog = document.querySelector('#echo-dialog');
const openers = new WeakMap();

function openDialog(dialog, opener) {
  if (dialog.open) return;
  document.dispatchEvent(new Event('beacon:quiet'));
  openers.set(dialog, opener);
  dialog.showModal();
  document.body.classList.add('dialog-open');
  const focusTarget = dialog === terminalDialog ? input : dialog.querySelector('.close');
  focusTarget.focus({ preventScroll: true });
}

document.querySelector('#contact-button').addEventListener('click', event => {
  openDialog(terminalDialog, event.currentTarget);
});
document.querySelector('#command-contact').addEventListener('click', event => {
  openDialog(echoDialog, event.currentTarget);
});

for (const dialog of [terminalDialog, echoDialog]) {
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());

  // Dragging/selecting text inside a dialog must not dismiss it.
  let backdropStart = false;
  const outside = event => {
    const box = dialog.getBoundingClientRect();
    return event.clientX < box.left || event.clientX > box.right ||
      event.clientY < box.top || event.clientY > box.bottom;
  };
  dialog.addEventListener('pointerdown', event => {
    backdropStart = event.target === dialog && outside(event);
  });
  dialog.addEventListener('click', event => {
    if (backdropStart && event.target === dialog && outside(event)) dialog.close();
    backdropStart = false;
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    openers.get(dialog)?.focus({ preventScroll: true });
  });
}
