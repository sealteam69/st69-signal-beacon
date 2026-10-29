# ST69 Signal Beacon — v4

Plain HTML, CSS, and JavaScript. No build step, backend, data collection, browser storage, or third-party runtime requests. Vercel deployment remains unperformed.

## Preview

From this folder:

```sh
python3 -m http.server 6969 --bind 127.0.0.1
```

Open http://127.0.0.1:6969. Save an edit and refresh. Stop with Ctrl+C.

## Where to edit

- `index.html`: page structure, visible wording, buttons, footer.
- `style.css`: appearance. Main controls are grouped at the top; labelled sections follow; phone overrides are at the bottom.
- `cnm-terminal.js`: seven prompt responses and the terminal dialog behaviour.
- `beacon.js`: 69 reveal and audio settings.
- `assets/`: supplied artwork/audio, glossy sticker, and local font/license.

See `EDITING.md` for a practical guide to sizing and breakpoints.

## Version 4 behaviour

Hover or focus either interactive 69 to reveal SEXY 69 and red lips. Click/tap toggles the reveal. The heading is visible immediately. Independent random clocks roll randomly selected characters up or down through copies of the same letter and add celestial glows every 2–4 seconds. Both pause in hidden tabs and stop for reduced motion. The 69 reveals an overlapping lipstick sticker on hover, focus, or tap. The footer carries SEAL TEAM 69 and no-telemetry copy.

Click the brighter patch to hear 12 seconds of the supplied Eddie Santiago track, filtered and delayed with a fade in/out. Click again to stop. Opening the terminal or leaving the browser tab stops playback. Audio never autoplays. Adjust the start point, duration, volume, low-pass filter and delay in beacon.js. ESTABLISH CONTACT opens an email draft to st69.contact@protonmail.com. FREQUENCY FORTRESS opens https://frequencyfortress.com/ in a new tab.

CNM prompts: signal, mirror, status, mythic, memetic, queen, commander. Also: help, clear. All responses are fictional and local. Reduced-motion preferences remove animation and transitions; audio still requires an explicit click.

## Font verification

The included IBM Plex Mono Regular TTF was compared with the file currently distributed at https://github.com/google/fonts/blob/main/ofl/ibmplexmono/IBMPlexMono-Regular.ttf . Both files have SHA-256:

`6a3412f058c7d8dfd9170c41e85ade48e5156ecb89356110ca57a0a27734af46`

The browser confirmed the font loaded. Earlier visual differences were affected by wide letter spacing and small text sizes; v4 exposes those controls and reduces title tracking. The SIL Open Font License is included.

## Git / working folder

Work directly in `/Users/localserver/dev/st69-signal-beacon`. Git tracks the build and supplied assets; no manual version folders or apply helper are needed. The completed local build includes the glossy sticker, random bidirectional title rolls, email and Frequency Fortress links, and seven-command CNM terminal with HELP.

Responsive controls stack at 700px and below, with separate spacing for 601–700px. Phone styling starts at 600px; very narrow styling starts at 350px. Desktop patch sizing no longer depends on viewport height.

Local syntax and asset checks pass. Deployment, production-domain verification, and a final browser check on the hosted site belong to the hosting handoff. Public deployment and DNS changes are handled separately from publishing this repository.

## Hosting / assets

Vercel: framework Other, no build command, output directory `.`. Security headers permit the local audio asset. Public deployment and DNS changes still require owner approval.

The patch, celestial chart, starfield, glossy sticker and Eddie audio were supplied by the owner and included at their direction. IBM Plex Mono is self-hosted under its included SIL Open Font License. Earlier unused lipstick artwork was removed from the current tree; it remains in Git history.

## Engineering verification

See `ENGINEERING-CHECKS.md` for local evidence and remaining hosting/SEO/device checks. Run `node --test tests/beacon.test.cjs` for animation-lifecycle and rapid audio-toggle regression checks. The displayed patch uses `assets/st69-patch-display.jpg`; its supplied PNG original remains intact.
