# Andrew Solomon — Resume (LWR)

The resume in `main.tex` ported to a single-page **Lightning Web Runtime + TypeScript** app. Same content, same design tokens (sourced from `../DESIGN.md`), runtime-switchable theme.

This sits next to the LaTeX source — `main.pdf` is still the resume artifact. This is the bridge-identity exhibit: Salesforce-platform tooling rendering the same design system.

## Stack

- **LWR** (Lightning Web Runtime) — Salesforce's standalone LWC runtime
- **LWC** + **TypeScript** — components in `src/modules/c/`
- **CSS custom properties** — design tokens in `src/styles/tokens.css`, theme-switched via `[data-theme]` on `<html>`
- **Raleway** via Google Fonts (Single-Family Rule from `DESIGN.md`)

## Run

```bash
cd web
npm install
npm run dev
```

Then open http://localhost:3000.

## Build

```bash
npm run build      # writes to ./dist
npm run serve      # serves the built output
npm run typecheck  # tsc --noEmit
```

## Theme

- Default: dark (canon, matches `\theme{dark}` in `main.tex`).
- Toggle in the top-right corner — sun icon when dark, moon when light.
- Persisted in `localStorage` under the key `resume-theme`.
- Pre-paint script in the layout reads the saved value before first render to avoid FOUC.

## Structure

```
web/
├── lwr.config.json
├── package.json
├── tsconfig.json
├── src/
│   ├── layouts/main.html        — HTML shell, theme bootstrap script
│   ├── styles/
│   │   ├── tokens.css           — design tokens (both themes)
│   │   └── global.css           — page-level resets and base
│   └── modules/c/
│       ├── app/                 — root component, holds theme state
│       └── themeToggle/         — button (sun/moon)
```

## Design system parity

Every visual decision descends from `../DESIGN.md`:

- Single-family typography (Raleway), two-weight rule (400 / 700)
- Hairline-only dividers (`1px var(--color-hairline)`)
- One-accent rule — amber, never two
- Flat by commitment — zero shadows, zero rounded corners
- Color tokens map 1:1 to the `\definecolor{}` tokens in `main.tex`

If the LaTeX palette changes (e.g. a future redesign), update `tokens.css` to match. They are intentionally synchronized by hand; no codegen yet.

## Portfolio at `/portfolio`

The previous andrewsolomon.dev site (static HTML / CSS / project case studies) lives at `static/portfolio/` and is served at `/portfolio` after `npm run build`.

```
web/
├── static/portfolio/   — the old portfolio site, untouched
│   ├── index.html
│   ├── styles.css
│   └── projects/*.html (10 case studies)
```

Build pipeline: `npm run build` runs `lwr build` (which writes to `site/`), then copies `static/portfolio` into `site/portfolio`. The deployed `site/` directory contains both.

**Dev-mode caveat**: `lwr dev` does not serve `/portfolio`. Run `npm run build` then a static server on `site/` to test the combined output locally:

```bash
npm run build
npx serve site
```

## Deploy to Vercel

The existing andrewsolomon.dev Vercel project (ID `prj_2lR7MJ5xkPIuL200SBfo3smONeRI`) was previously linked to the old portfolio repo with `framework: nextjs` and `rootDirectory: apps/web` — both wrong for the new setup.

To swap deployment to this repo:

1. From `web/`, run `vercel link` and select the existing andrewsolomon.dev project (use the project ID above when prompted).
2. In the Vercel dashboard, override project settings:
   - **Framework Preset**: Other
   - **Root Directory**: `web`
   - **Build Command**: `npm run build` (leave default; the `vercel.json` in this folder pins it)
   - **Output Directory**: `site` (also pinned in `vercel.json`)
3. Push to your default branch, or run `vercel --prod` from `web/` to deploy.

After the first successful deploy, andrewsolomon.dev serves the resume at `/` and the prior portfolio at `/portfolio`. The old `andrewsolomon.dev` repo can be archived.

## Notes

- LWR + LWC + TypeScript: pinned at `lwr ^0.23.4` and `lwc ^9.2.2`. `npm install --latest` if your toolchain is ahead.
- The page is single-route. Routing is configured in `lwr.config.json` if you ever want to split it.
