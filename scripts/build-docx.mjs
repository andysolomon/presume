#!/usr/bin/env node
// Build a Microsoft Word version of the resume from main.tex via the generated resumeData.ts.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const dataPath = resolve(repoRoot, 'web/src/modules/c/resumeData/resumeData.ts');
const docxPath = resolve(repoRoot, 'andrewsolomon.docx');

function commandExists(command) {
  try {
    execFileSync('bash', ['-lc', `command -v ${command}`], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function readResumeData() {
  execFileSync('node', [resolve(repoRoot, 'scripts/parse-resume.mjs')], {
    cwd: repoRoot,
    stdio: 'inherit',
  });

  const source = readFileSync(dataPath, 'utf8');
  const marker = 'export const resume: Resume = ';
  const start = source.indexOf(marker);
  const end = source.indexOf('\n\nexport default resume;', start);
  if (start === -1 || end === -1) {
    throw new Error(`Could not locate generated resume JSON in ${dataPath}`);
  }
  const json = source.slice(start + marker.length, end).trim().replace(/;$/, '');
  return JSON.parse(json);
}

function mdLink(label, href) {
  return href ? `[${label}](${href})` : label;
}

function renderMarkdown(resume) {
  const lines = [];
  lines.push(`---`);
  lines.push(`title: "${resume.header.name} ${resume.header.title}"`);
  lines.push(`author: "${resume.header.name}"`);
  lines.push(`---`);
  lines.push('');
  lines.push(`# ${mdLink(resume.header.name, resume.header.nameHref)} ${resume.header.title}`);
  lines.push('');
  if (resume.header.subtitle) lines.push(`**${resume.header.subtitle}**`);
  lines.push('');
  for (const item of resume.meta) {
    lines.push(`**${item.label}:** ${item.value}  `);
  }
  lines.push('');

  lines.push('## Summary');
  lines.push('');
  lines.push(resume.summary);
  lines.push('');

  lines.push('## Technical Skills');
  lines.push('');
  for (const skill of resume.skills) {
    lines.push(`- **${skill.label}:** ${skill.value}`);
  }
  lines.push('');

  lines.push('## Experience');
  lines.push('');
  for (const job of resume.experience) {
    lines.push(`### ${job.title} — ${mdLink(job.company, job.companyHref)}`);
    lines.push('');
    lines.push(`*${job.date}*`);
    lines.push('');
    for (const bullet of job.bullets) lines.push(`- ${bullet}`);
    lines.push('');
  }

  lines.push('## Education');
  lines.push('');
  for (const school of resume.education) {
    lines.push(`### ${school.title} — ${mdLink(school.company, school.companyHref)}`);
    lines.push('');
    lines.push(`*${school.date}*`);
    lines.push('');
    for (const bullet of school.bullets) lines.push(`- ${bullet}`);
    lines.push('');
  }

  if (resume.footer?.length) {
    lines.push('---');
    lines.push('');
    lines.push(resume.footer.map((link) => mdLink(link.label, link.href)).join(' · '));
    lines.push('');
  }

  return lines.join('\n');
}

function main() {
  if (!commandExists('pandoc')) {
    throw new Error('pandoc is required to build the Word resume, but it was not found on PATH.');
  }

  const resume = readResumeData();
  const tempDir = mkdtempSync(resolve(tmpdir(), 'resume-docx-'));
  const mdPath = resolve(tempDir, 'andrewsolomon-resume.md');
  writeFileSync(mdPath, renderMarkdown(resume), 'utf8');

  execFileSync(
    'pandoc',
    [mdPath, '--from', 'markdown', '--to', 'docx', '--standalone', '--output', docxPath],
    { cwd: repoRoot, stdio: 'inherit' },
  );

  if (!existsSync(docxPath)) throw new Error(`Expected ${docxPath} to be created.`);
  console.log(`build-docx: wrote ${docxPath}`);
}

main();
