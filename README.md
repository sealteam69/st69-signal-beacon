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
- `cnm-terminal.js`: six prompt responses and both dialog behaviours.
- `beacon.js`: 69 reveal and audio settings.
- `assets/`: supplied artwork/audio, lipstick SVG, and local font/license.

See `EDITING.md` for a practical guide to sizing and breakpoints.

## Version 4 behaviour

Hover or focus either interactive 69 to reveal SEXY 69 and red lips. Click/tap toggles the reveal. The heading arrives once through a celestial typewriter glow; it does not endlessly flicker. The footer carries SEAL TEAM 69® as requested.

Click the brighter patch to hear 12 seconds of the supplied Eddie Santiago track, filtered and delayed with a fade in/out. Click again to stop. Opening either dialog or leaving the browser tab stops playback. Audio never autoplays. Adjust the start point, duration, volume, low-pass filter and delay in beacon.js. The existing command text echo remains separate from the audio patch.

CNM prompts: signal, mirror, status, mythic, memetic, queen. Also: help, clear. All responses are fictional and local. Reduced-motion preferences remove animation and transitions; audio still requires an explicit click.

## Font verification

The included IBM Plex Mono Regular TTF was compared with the file currently distributed at https://github.com/google/fonts/blob/main/ofl/ibmplexmono/IBMPlexMono-Regular.ttf . Both files have SHA-256:

`6a3412f058c7d8dfd9170c41e85ade48e5156ecb89356110ca57a0a27734af46`

The browser confirmed the font loaded. Earlier visual differences were affected by wide letter spacing and small text sizes; v4 exposes those controls and reduces title tracking. The SIL Open Font License is included.

## Git / working folder

This prepared copy continues the original local Git history. A checkpoint preserves the user's pre-v4 files, including the rename to cnm-terminal.js and their wording edits. The page now correctly loads that renamed file. The v4 commit follows the checkpoint. No Git remote is configured on this prepared copy.

The original folder /Users/localserver/dev/st69-signal-beacon was not writable from this chat and remains unchanged. A separate apply-st69-v4.py helper beside the prepared folder can apply the revision locally and save both checkpoints in the original repo when run by the owner. It checks the original files against the captured baseline first and refuses to overwrite later edits. It never replaces .git or pushes anything.

## Hosting / assets

Vercel: framework Other, no build command, output directory `.`. Security headers permit the local audio asset. Public deployment and DNS changes still require owner approval.

The patch, celestial chart, starfield and Eddie audio were supplied by the user. They are included for local preview; creator credits/publication permissions for supplied material were not provided. IBM Plex Mono is self-hosted under its included license. The red lips are a small SVG drawn for this revision.
