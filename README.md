# ST69 Signal Beacon — version 3

Buildless static site. No backend, analytics, browser storage, or data collection. All artwork and IBM Plex Mono are served locally. The font license is included in assets/fonts/OFL.txt.

## Preview

Run `python3 -m http.server 6971 --bind 127.0.0.1` in this folder, then open http://127.0.0.1:6971. Or open index.html directly.

## Experience

A green, irregularly pulsing beacon sits in the top-right of an otherwise empty header. The celestial chart rotates behind the patch, brightening on hover or keyboard focus. The patch has no click action.

The two buttons are independent:
- ESTABLISH CONTACT WITH COMMAND opens a fictional text echo from Eddie with an animated waveform. No audio plays.
- WAKE THE MIRROR opens the local CNM terminal. Commands: help, mirror, signal, status, clear.

The listening/mirror copy appears only in CNM. Both dialogs support Escape, Close, backdrop dismissal, and focus restoration. Reduced-motion preferences stop animation and transitions, including the green beacon flicker.

Coordinates: west 144, north 33, east 69. Caption: FIG. 069 – THE INSIGNIA.

## Apply to the working repository

The requested destination /Users/localserver/dev/st69-signal-beacon is readable but write access was not granted to this chat. That repository is unchanged. Copy index.html, style.css, signal.js, vercel.json and assets/ into it, replacing matching files. Preserve its .git directory. Review the diff before committing.

## Assets

The original patch is unchanged. celestial-chart.jpg and starfield.jpg are user-supplied aesthetic references included in the local preview. Creator attribution and publication permissions were not supplied. IBM Plex Mono is distributed under the included SIL Open Font License.

## Hosting

Vercel configuration is included: framework Other, no build command, output directory `.`. No deployment or DNS change has been made. Owner approval is required before publication.
