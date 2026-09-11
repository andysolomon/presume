#!/usr/bin/env node
// Print the /steampunk route of the built LWR site to PDF (dark + light) so the
// downloadable Steampunk resume is exactly what the page renders.
//
//   npm run web:build           # first, so web/site/ exists
//   npm run pdf:steampunk
//
// Requires Playwright (`npm install` at the repo root installs it as a dev
// dependency; a Chromium build must also be available to Playwright).

import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { copyFileSync, existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const siteDir = resolve(repoRoot, 'web/site');
const assetsDir = resolve(repoRoot, 'web/src/assets');
// lwr build copies src/assets into site/assets, so printing after the build
// would leave the deployed copy stale. Write both when site/ is present.
const siteAssetsDir = resolve(siteDir, 'assets');

const TARGETS = [
  { theme: 'dark', file: 'andrewsolomon-steampunk.pdf' },
  { theme: 'light', file: 'andrewsolomon-steampunk-light.pdf' },
];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
};

// Returns null (rather than throwing) when Playwright is unavailable: this runs
// inside `npm run ship`, and a missing browser should warn, not abort a release.
function loadPlaywright() {
  try {
    return require('playwright');
  } catch {
    return null;
  }
}

function skip(reason) {
  console.warn(`build-steampunk-pdf: SKIPPED — ${reason}`);
  console.warn('  The committed PDFs in web/src/assets were left as-is. If the');
  console.warn('  /steampunk page changed, they are now stale: install Playwright');
  console.warn('  (`npm install` at the repo root) and re-run `npm run pdf:steampunk`.');
}

// Minimal static server over web/site/ that mirrors Vercel's cleanUrls behaviour
// (/steampunk -> /steampunk/index.html).
function serveSite() {
  const server = createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const candidates = [
      join(siteDir, urlPath),
      join(siteDir, urlPath, 'index.html'),
      join(siteDir, `${urlPath}.html`),
    ];
    const hit = candidates.find((p) => existsSync(p) && statSync(p).isFile());
    if (!hit || !hit.startsWith(siteDir)) {
      res.writeHead(404);
      res.end('not found');
      return;
    }
    res.writeHead(200, { 'content-type': MIME[extname(hit)] ?? 'application/octet-stream' });
    res.end(readFileSync(hit));
  });
  return new Promise((resolveServer) => {
    server.listen(0, '127.0.0.1', () => resolveServer(server));
  });
}

async function main() {
  if (!existsSync(join(siteDir, 'steampunk', 'index.html'))) {
    throw new Error(`web/site/steampunk/index.html not found. Run \`npm run web:build\` first.`);
  }
  const playwright = loadPlaywright();
  if (!playwright) {
    skip('playwright is not installed');
    return;
  }
  const { chromium } = playwright;
  const server = await serveSite();
  const { port } = server.address();
  const browser = await chromium.launch();
  try {
    for (const { theme, file } of TARGETS) {
      const context = await browser.newContext();
      await context.addInitScript((t) => {
        try {
          localStorage.setItem('resume-theme', t);
        } catch {
          /* ignore */
        }
      }, theme);
      const page = await context.newPage();
      await page.goto(`http://127.0.0.1:${port}/steampunk`, { waitUntil: 'networkidle' });
      await page.waitForSelector('c-steampunk-resume article');
      await page.evaluate(() => document.fonts.ready);
      await page.emulateMedia({ media: 'print' });
      const out = resolve(assetsDir, file);
      await page.pdf({
        path: out,
        format: 'A4',
        printBackground: true,
        margin: { top: '12mm', right: '14mm', bottom: '12mm', left: '14mm' },
      });
      await context.close();
      console.log(`build-steampunk-pdf: wrote ${out} (${theme})`);
      if (existsSync(siteAssetsDir)) {
        copyFileSync(out, join(siteAssetsDir, file));
        console.log(`build-steampunk-pdf: copied into ${join(siteAssetsDir, file)}`);
      }
    }
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  if (/executable doesn't exist|Failed to launch|browserType\.launch/i.test(err.message)) {
    skip(`Chromium is not available (${err.message.split('\n')[0]})`);
    process.exit(0);
  }
  console.error('build-steampunk-pdf:', err.message);
  process.exit(1);
});
