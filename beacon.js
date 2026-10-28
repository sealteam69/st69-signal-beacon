'use strict';

// Hover/focus reveals the 69; clicking toggles it for touch users.
document.querySelectorAll('.secret-number').forEach(button => {
  button.addEventListener('click', () => {
    const revealed = button.classList.toggle('is-revealed');
    button.setAttribute('aria-pressed', String(revealed));
    button.setAttribute('aria-label', revealed ? 'SEXY 69. Hide the hidden signal' : '69. Reveal the hidden signal');
  });
});

// EDDIE'S DISTANT ECHO
// Audio is created only after a deliberate patch click. No autoplay or network API.
// Tinker with these values to change the distance, length, and loudness.
const echoSettings = {
  startSeconds: 0,
  durationSeconds: 12,
  fadeInSeconds: 1.8,
  fadeOutSeconds: 4,
  volume: 0.32,
  lowPassHz: 1500,
  delaySeconds: 0.46,
  feedback: 0.38
};

const audio = document.querySelector('#eddie-audio');
const patch = document.querySelector('#patch-audio');
const audioStatus = document.querySelector('#audio-status');
const idleMessage = 'TOUCH THE INSIGNIA. LISTEN FOR THE ECHO.';
let context;
let master;
let stopTimer;
let tailTimer;
let playbackGeneration = 0;
let playing = false;

function prepareAudio() {
  if (context) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) throw new Error('Audio processing unavailable');

  context = new AudioContextClass();
  const source = context.createMediaElementSource(audio);
  const lowPass = context.createBiquadFilter();
  lowPass.type = 'lowpass';
  lowPass.frequency.value = echoSettings.lowPassHz;

  master = context.createGain();
  master.gain.value = 0;
  const dry = context.createGain();
  dry.gain.value = 0.55;
  const delay = context.createDelay(2);
  delay.delayTime.value = echoSettings.delaySeconds;
  const wet = context.createGain();
  wet.gain.value = 0.65;
  const feedback = context.createGain();
  feedback.gain.value = echoSettings.feedback;

  source.connect(lowPass);
  lowPass.connect(dry).connect(master);
  lowPass.connect(delay);
  delay.connect(wet).connect(master);
  delay.connect(feedback).connect(delay);
  master.connect(context.destination);
}

function stopEcho(message = idleMessage) {
  playbackGeneration++;
  playing = false;
  clearTimeout(stopTimer);
  clearTimeout(tailTimer);
  audio.pause();

  if (context && master) {
    const now = context.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setTargetAtTime(0, now, 0.06);
    // Suspend after the fade so no old delay tail leaks into the next play.
    tailTimer = setTimeout(() => { context.suspend().catch(() => {}); }, 500);
  }
  patch.setAttribute('aria-pressed', 'false');
  patch.setAttribute('aria-label', 'Play a distant Eddie echo');
  audioStatus.textContent = message;
}

async function playEcho() {
  if (playing) { stopEcho(); return; }

  playing = true;
  const generation = ++playbackGeneration;
  clearTimeout(tailTimer);
  patch.setAttribute('aria-pressed', 'true');
  patch.setAttribute('aria-label', 'Stop the distant Eddie echo');
  audioStatus.textContent = 'ACQUIRING A DISTANT ECHO… TAP AGAIN TO CANCEL.';

  try {
    prepareAudio();
    // Resume and play within the user gesture; permission failures stay visible.
    const resumed = context.resume();
    audio.currentTime = echoSettings.startSeconds;
    const started = audio.play();
    await Promise.all([resumed, started]);
    if (generation !== playbackGeneration) { audio.pause(); return; }

    const now = context.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(0, now);
    master.gain.linearRampToValueAtTime(echoSettings.volume, now + echoSettings.fadeInSeconds);
    master.gain.setValueAtTime(echoSettings.volume, now + echoSettings.durationSeconds - echoSettings.fadeOutSeconds);
    master.gain.linearRampToValueAtTime(0, now + echoSettings.durationSeconds);
    audioStatus.textContent = 'EDDIE / DISTANT ECHO — TOUCH THE INSIGNIA TO SILENCE.';
    stopTimer = setTimeout(() => stopEcho(), echoSettings.durationSeconds * 1000);
  } catch {
    if (generation === playbackGeneration) stopEcho('ECHO UNAVAILABLE. CHECK SOUND PERMISSIONS, THEN TRY AGAIN.');
  }
}

patch.addEventListener('click', playEcho);
audio.addEventListener('ended', () => stopEcho());
audio.addEventListener('error', () => {
  if (playing) stopEcho('ECHO UNAVAILABLE. THE AUDIO FILE COULD NOT BE PLAYED.');
});
document.addEventListener('beacon:quiet', () => { if (playing) stopEcho(); });
document.addEventListener('visibilitychange', () => { if (document.hidden && playing) stopEcho(); });
window.addEventListener('pagehide', () => { if (playing) stopEcho(); });
