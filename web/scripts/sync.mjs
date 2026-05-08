#!/usr/bin/env node
// Wrapper for ../scripts/parse-resume.mjs that no-ops on Vercel CLI deploys
// (where only the web/ directory is uploaded and the parent parser/main.tex
// aren't in the build sandbox). Locally, this calls through and regenerates
// src/modules/c/resumeData/resumeData.ts from ../main.tex.

import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const parser = resolve(__dirname, '../../scripts/parse-resume.mjs');

if (!existsSync(parser)) {
  console.log('sync: parser not in sandbox (Vercel CLI deploy); using committed resumeData.ts.');
  process.exit(0);
}

const result = spawnSync(process.execPath, [parser], { stdio: 'inherit' });
process.exit(result.status ?? 0);
