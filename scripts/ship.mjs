#!/usr/bin/env node
// One-shot release: build all artifacts, typecheck, verify, commit, push.
// Vercel git integration handles the deploy from the push.
//
// Usage:
//   npm run ship                       — auto commit message
//   npm run ship -- -m "your message"  — explicit message

import { execSync, spawnSync } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');

const argv = process.argv.slice(2);
const messageFlag = argv.findIndex((a) => a === '-m' || a === '--message');
const explicitMessage = messageFlag !== -1 ? argv[messageFlag + 1] : null;
const defaultMessage = `chore: ship resume ${new Date().toISOString().slice(0, 10)}`;
const commitMessage = explicitMessage || defaultMessage;

const REQUIRED_ARTIFACTS = [
  'main.pdf',
  'web/site/index.html',
  'web/src/modules/c/resumeData/resumeData.ts',
];

function step(label, fn) {
  process.stdout.write(`▸ ${label}\n`);
  const start = Date.now();
  try {
    const result = fn();
    process.stdout.write(`  ✓ ${label} (${Date.now() - start}ms)\n`);
    return result;
  } catch (err) {
    process.stderr.write(`  ✗ ${label} failed\n`);
    throw err;
  }
}

function run(cmd, opts = {}) {
  return execSync(cmd, { stdio: 'inherit', cwd: repoRoot, ...opts });
}

function runCapture(cmd, opts = {}) {
  return execSync(cmd, { encoding: 'utf8', cwd: repoRoot, ...opts }).trim();
}

function ensureCleanGitState() {
  const branch = runCapture('git rev-parse --abbrev-ref HEAD');
  if (branch !== 'main') {
    throw new Error(`Refusing to ship from branch '${branch}'. Switch to main first.`);
  }
  // Check there's a remote
  const remotes = runCapture('git remote');
  if (!remotes) {
    throw new Error('No git remote configured. Add one before running ship.');
  }
  return { branch };
}

function verifyArtifacts() {
  const missing = REQUIRED_ARTIFACTS.filter((p) => !existsSync(resolve(repoRoot, p)));
  if (missing.length) {
    throw new Error(`Missing build artifacts: ${missing.join(', ')}`);
  }
  for (const p of REQUIRED_ARTIFACTS) {
    const s = statSync(resolve(repoRoot, p));
    if (s.size === 0) throw new Error(`Artifact is empty: ${p}`);
  }
}

function hasStagedOrDirtyChanges() {
  const status = runCapture('git status --porcelain');
  return status.length > 0;
}

function main() {
  const { branch } = step('check git state', ensureCleanGitState);

  step('sync resume data from main.tex', () => run('npm run sync'));
  step('build PDF (pdflatex)', () => run('npm run pdf'));
  step('build website (LWR)', () => run('npm run web:build'));
  step('typecheck website', () => run('npm run web:typecheck'));
  step('verify artifacts', verifyArtifacts);

  if (hasStagedOrDirtyChanges()) {
    step('stage changes', () => {
      // -A picks up new files too (new scripts, new components). The .gitignore
      // covers secrets, build caches, and LaTeX aux files, so this is safe here.
      run('git add -A');
    });

    if (runCapture('git diff --cached --name-only')) {
      step(`commit (${commitMessage})`, () => {
        const result = spawnSync('git', ['commit', '-m', commitMessage], {
          cwd: repoRoot,
          stdio: 'inherit',
        });
        if (result.status !== 0) throw new Error('git commit failed');
      });
    } else {
      console.log('  (no staged changes after git add -u; skipping commit)');
    }
  } else {
    console.log('▸ working tree clean; skipping stage/commit');
  }

  step(`push to origin/${branch}`, () => run(`git push origin ${branch}`));

  step('deploy to Vercel production', () => {
    // Runs from web/ where .vercel/project.json lives. --yes skips the
    // "Set up and deploy" prompt.
    run('vercel --prod --yes', { cwd: resolve(repoRoot, 'web') });
  });

  console.log('');
  console.log('✓ Ship complete. Live at https://andrewsolomon.dev/');
}

try {
  main();
} catch (err) {
  console.error('');
  console.error('✗ Ship aborted:', err.message);
  process.exit(1);
}
