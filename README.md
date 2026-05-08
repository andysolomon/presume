# Andrew Solomon — Resume

LaTeX source for my resume. The single source file is `main.tex`; building it produces `main.pdf`.

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
