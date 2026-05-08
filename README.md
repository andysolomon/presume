# Andrew Solomon — Resume

`main.tex` is the single source of truth. Building produces `main.pdf` and an LWR website (`web/`) that renders the same content.

## Ship it

```bash
npm run ship                  # auto commit message
npm run ship -- -m "message"  # explicit message
```

Does the full release in order: sync resume data, build PDF, build LWR site, typecheck, verify artifacts exist and are non-empty, `git add -u`, commit, push to `origin/main`. Vercel auto-deploys from the push.

Refuses to run from any branch other than `main`. Bails on the first failure.

> **Vercel one-time setup:** the project's **Root Directory** must be set to `web` (Project Settings → General). Without that, Vercel will try to run the root build script which calls `pdflatex` and fails.

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
