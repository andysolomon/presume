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
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const siteDir = resolve(repoRoot, 'web/site');
const assetsDir = resolve(repoRoot, 'web/src/assets');

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

function loadPlaywright() {
  try {
    return require('playwright');
  } catch {
    throw new Error(
      'playwright is not installed. Run `npm install` at the repo root (or `npm i -D playwright`).',
    );
  }
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
  const { chromium } = loadPlaywright();
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
    }
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error('build-steampunk-pdf:', err.message);
  process.exit(1);
});
