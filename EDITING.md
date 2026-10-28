# How to tinker with ST69

FF uses Tailwind classes in its HTML/React components. This page uses named classes in HTML, with their styles in style.css. The browser understands the resulting CSS either way; this page does not need a Tailwind build.

## Font size

At the top of style.css, find `:root`. For example:

```css
--title-size: clamp(1.3rem, 2.4vw, 1.8125rem);
--copy-size: clamp(.6875rem, 1.1vw, .875rem);
--button-size: .5625rem;
--title-tracking: .14em;
```

- `1rem` is normally 16px. `1.5rem` is normally 24px.
- `vw` is a percentage of screen width: `2.4vw` grows with the window.
- `clamp(minimum, flexible size, maximum)` gives text a floor and a ceiling.
- `em` tracks the element's own font size. Lower title-tracking for tighter letters.

To try a fixed heading size, use `--title-size: 2rem;`. To make the small copy larger, try `--copy-size: .875rem;`. Save and refresh.

## Breakpoints

Near the bottom:

```css
@media (max-width: 600px) {
  :root {
    --title-size: 1.4375rem;
    --copy-size: .6875rem;
  }
}
```

These values apply only when the viewport is 600px wide or narrower. They override the defaults above. If a desktop change appears to do nothing on a phone, check this section. This is similar to Tailwind responsive variants, except the conditions are written explicitly. The desktop section applies everywhere first, and narrower-screen rules override selected values.

The 350px breakpoint handles very narrow screens. The tall-desktop query enlarges the patch when there is room.

## Patch and backdrop

- `--patch-stage-size`: entire circular assembly size.
- `--patch-brightness`: default patch brightness (v4: 1).
- `--patch-hover-brightness`: hovered brightness (1.05).
- `--chart-speed`: time for one chart rotation (200s).
- `.cosmos`: background image position, zoom and opacity.

## Audio and copy

`beacon.js` starts with `echoSettings`. Change `startSeconds` to choose another part of the song. Duration, volume and filtering are beside it. The audio plays only after a patch click.

The `replies` object at the top of cnm-terminal.js contains all six terminal responses. `\n` starts a new line. Page wording lives in index.html.

## Useful editing loop

1. Keep your local server open.
2. Edit one value, save, and refresh the browser.
3. Test a wide window and a narrow window.
4. When happy: review `git diff`, then stage and commit.

No npm install, Next.js server, or build command is required.
