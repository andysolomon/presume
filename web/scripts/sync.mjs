#!/usr/bin/env node
// Wrapper for ../scripts/parse-resume.mjs that no-ops on Vercel CLI deploys
// (where only the web/ directory is uploaded and the parent parser/main.tex
// aren't in the build sandbox). Locally, this calls through and regenerates
// src/modules/c/resumeData/resumeData.ts from ../main.tex, and refreshes
// src/assets/andrewsolomon.pdf from ../main.pdf so the Export-PDF link
// always serves the latest LaTeX build.

import { copyFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const parser = resolve(__dirname, '../../scripts/parse-resume.mjs');
const upstreamPdf = resolve(__dirname, '../../main.pdf');
const bundledPdf = resolve(__dirname, '../src/assets/andrewsolomon.pdf');

if (!existsSync(parser)) {
  console.log('sync: parser not in sandbox (Vercel CLI deploy); using committed resumeData.ts.');
  process.exit(0);
}

const result = spawnSync(process.execPath, [parser], { stdio: 'inherit' });

if (existsSync(upstreamPdf)) {
  copyFileSync(upstreamPdf, bundledPdf);
  console.log(`sync: copied ${upstreamPdf} -> ${bundledPdf}`);
} else {
  console.log('sync: ../main.pdf not built yet; leaving src/assets/andrewsolomon.pdf as committed.');
}

process.exit(result.status ?? 0);
