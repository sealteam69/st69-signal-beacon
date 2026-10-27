# ST69 Signal Beacon

A buildless responsive static landing page. Original ST69 patch included. No dependencies, external fonts, analytics, cookies, storage, backend, or data collection. CNM is a fictional local terminal; commands never leave the page.

## Preview

From this directory, run `python3 -m http.server 6969 --bind 127.0.0.1`, then open http://127.0.0.1:6969. Stop with Ctrl+C.

## Vercel preparation

This folder is the project root. Import it into a Vercel project with framework “Other”, no build command, and output directory `.`. `vercel.json` supplies static hosting configuration and security headers. No environment variables are required.

Deployment is intentionally not performed. Vercel deployments can be publicly accessible: obtain owner approval before running `vercel` or publishing through the dashboard. Do not add st69.lol, change DNS, or attach a production domain until separately approved. After approval, deploy the reviewed files, verify desktop/mobile and terminal commands, then plan domain changes.

## Design edits

`style.css`: palette, spacing, typography, responsive layout. `index.html`: landing copy and structure. `signal.js`: starfield and terminal responses. `assets/st69-patch.png`: supplied patch, unmodified. The motto appears only within the original patch artwork.

## Working locally

This folder is a standalone Git repository on the `main` branch. Open the folder in your code editor, edit the HTML/CSS/JavaScript, save, and refresh the preview. No build step is needed. You can also open `index.html` directly in your browser.

- `index.html` — page structure and wording
- `style.css` — colours, typography, layout, mobile styles
- `signal.js` — terminal commands and decorative stars
- `assets/` — patch artwork

When ready, create an empty GitHub repository, add its URL as the `origin` remote, then push `main`. No remote or automatic deployment is configured.

## Visual references for the next iteration

Antique celestial charts, engraved concentric gold rings, deep black starfields, and the warm gold dust of the Milky Way. Retain obsidian, antique gold, gunmetal, and starlight. References are inspiration; they have not been added to the published assets.
