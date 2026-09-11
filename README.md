# Andrew Solomon — Resume

`main.tex` is the single source of truth. Building produces `main.pdf` and an LWR website (`web/`) that renders the same content.

## Ship it

```bash
npm run ship                  # auto commit message
npm run ship -- -m "message"  # explicit message
```

Does the full release in order: sync resume data, build PDF, build LWR site, typecheck, verify artifacts, `git add -A`, commit, push to `origin/main`, `vercel --prod` from `web/`.

Refuses to run from any branch other than `main`. Bails on the first failure.

The Vercel deploy step uses the CLI directly (not git auto-deploy), so it works regardless of whether the project is git-connected in Vercel.

## One-shot build (no commit/push)

```bash
npm run build
```

Runs three steps in order:

1. `npm run sync` — parse `main.tex` into `web/src/modules/c/resumeData/resumeData.ts`
2. `npm run pdf` — `pdflatex main.tex` → `main.pdf`
3. `npm run web:build` — LWR static site → `web/site/`

Other scripts:

- `npm run sync` — only regenerate the website's typed data module from `main.tex`
- `npm run pdf` — only rebuild the PDF (`npm run pdf:twice` re-runs for cross-references)
- `npm run dev` — sync, then start the LWR dev server at http://localhost:3000
- `npm run web:typecheck` — `tsc --noEmit` against the web package
- `npm run web:install` — install web deps (run once)
- `npm run clean` — remove LaTeX aux files and LWR build output

### Tailored routes

Besides `/`, the site serves tailored views at `/government-experience`, `/kapitus`, and `/steampunk`. Each is an LWC under `web/src/modules/c/` that reuses the generated resume data with its own framing.

The `/steampunk` PDF is printed from the page itself (so it always matches what the route renders) rather than from LaTeX:

```bash
npm install            # installs Playwright (root devDependency)
npm run web:build
npm run pdf:steampunk  # writes web/src/assets/andrewsolomon-steampunk{,-light}.pdf
```

Re-run it after any change to `steampunkResume` and commit the regenerated PDFs.

The website is generated, not hand-edited. After any change to `main.tex`, run `npm run sync` (or just `npm run build`) to refresh `resumeData.ts`.

## Prerequisites

You need a TeX distribution that ships `pdflatex` and the packages used by `main.tex` (`raleway`, `xifthen`, `moresize`, `geometry`, `fancyhdr`, `multicol`, `array`, `graphicx`, `wrapfig`, `tikz`, `xcolor`).

- **macOS:** [MacTeX](https://www.tug.org/mactex/) (full) or BasicTeX + `tlmgr install raleway xifthen moresize`
- **Linux:** `sudo apt install texlive-full` (Debian/Ubuntu) or the equivalent `texlive-*` packages
- **Windows:** [MiKTeX](https://miktex.org/) — missing packages install on demand

Verify with:

```bash
pdflatex --version
```

## Build

From the repo root:

```bash
pdflatex main.tex
```

Run it twice if cross-references look stale:

```bash
pdflatex main.tex && pdflatex main.tex
```

Output: `main.pdf`.

### Clean build artifacts

```bash
rm -f main.aux main.log main.out
```

## Editing

Edit `main.tex` and rebuild. The `\cvevent{date}{title}{company}{bullets}` macro defines each experience entry — see existing entries under the `Experience` section for the pattern.
