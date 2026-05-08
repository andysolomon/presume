#!/usr/bin/env node
// Parse main.tex into a typed TS module the LWR app imports.
// Single source of truth for resume content lives in main.tex.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const texPath = resolve(repoRoot, 'main.tex');
const outPath = resolve(repoRoot, 'web/src/modules/c/resumeData/resumeData.ts');

function stripComments(src) {
  return src
    .split('\n')
    .map((line) => {
      let out = '';
      let escaped = false;
      for (const ch of line) {
        if (!escaped && ch === '%') break;
        out += ch;
        escaped = ch === '\\' && !escaped;
      }
      return out;
    })
    .join('\n');
}

// Convert LaTeX-escaped text to plain string with the conventions used in main.tex.
function deLatex(s) {
  return s
    .replace(/\\&/g, '&')
    .replace(/\\%/g, '%')
    .replace(/\\_/g, '_')
    .replace(/\\#/g, '#')
    .replace(/\\\$/g, '$')
    .replace(/\\\{/g, '{')
    .replace(/\\\}/g, '}')
    // textbf{x} -> x (we render strong via template, not content)
    .replace(/\\textbf\{([^{}]*)\}/g, '$1')
    .replace(/\\textit\{([^{}]*)\}/g, '$1')
    .replace(/\\emph\{([^{}]*)\}/g, '$1')
    // em-dash convention from LaTeX (`--`) becomes en-dash here; main.tex uses it for ranges.
    .replace(/ -- /g, ' — ')
    .replace(/--/g, '—')
    .replace(/~/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Find the matching closing brace for a `{` at index `openIdx` in `src`.
function matchBrace(src, openIdx) {
  if (src[openIdx] !== '{') throw new Error(`Expected { at ${openIdx}`);
  let depth = 0;
  for (let i = openIdx; i < src.length; i++) {
    const ch = src[i];
    if (ch === '\\') {
      i++;
      continue;
    }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  throw new Error(`Unmatched { at ${openIdx}`);
}

// Read one `{...}` argument starting at the next `{` after `from`. Returns { body, end }.
function readArg(src, from) {
  const open = src.indexOf('{', from);
  if (open === -1) throw new Error(`No opening brace after ${from}`);
  const close = matchBrace(src, open);
  return { body: src.slice(open + 1, close), end: close + 1 };
}

// Split a comma list at depth 0 (commas inside nested braces are ignored).
function splitTopLevel(src, sep = ',') {
  const out = [];
  let depth = 0;
  let buf = '';
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (ch === '\\') {
      buf += ch + (src[i + 1] ?? '');
      i++;
      continue;
    }
    if (ch === '{') depth++;
    else if (ch === '}') depth--;
    if (ch === sep && depth === 0) {
      out.push(buf);
      buf = '';
    } else {
      buf += ch;
    }
  }
  if (buf.length) out.push(buf);
  return out;
}

// Strip an outer pair of braces around an item if present.
function unwrapBraces(s) {
  const t = s.trim();
  if (t.startsWith('{') && t.endsWith('}')) {
    const inner = t.slice(1, -1);
    if (matchBrace(t, 0) === t.length - 1) return inner;
  }
  return t;
}

function parseHeader(src) {
  const titleBlock = src.match(/\\HUGE[^]*?\\textsc\{([^}]+)\}[^]*?\\textsc\{([^}]+)\}/);
  const subtitleMatch = src.match(/\\small\s+([^\\\n]+)/);
  return {
    name: titleBlock ? deLatex(titleBlock[1]) : 'Andrew Solomon',
    title: titleBlock ? deLatex(titleBlock[2]) : 'Resume',
    subtitle: subtitleMatch ? deLatex(subtitleMatch[1]) : '',
  };
}

function parseMeta(src) {
  // \metasection{value}{\textbf{Label}}
  const re = /\\metasection\{/g;
  const out = [];
  let m;
  while ((m = re.exec(src))) {
    const a = readArg(src, m.index + '\\metasection'.length);
    const b = readArg(src, a.end);
    const label = deLatex(b.body);
    const value = deLatex(a.body);
    out.push({ label, value });
    re.lastIndex = b.end;
  }
  return out;
}

function parseSections(src) {
  // Walk the body and split it on \cvsection{...}. Each section then contains either
  // an itemize block (skills/certs) or a sequence of \cvevent macros (experience/education).
  const re = /\\cvsection\{/g;
  const sections = [];
  const matches = [];
  let m;
  while ((m = re.exec(src))) matches.push(m.index);
  for (let i = 0; i < matches.length; i++) {
    const start = matches[i];
    const titleArg = readArg(src, start + '\\cvsection'.length);
    const sectionEnd = matches[i + 1] ?? src.length;
    const body = src.slice(titleArg.end, sectionEnd);
    sections.push({ title: deLatex(titleArg.body), body });
  }
  return sections;
}

function parseSummary(body) {
  // A bare paragraph between \cvsection{Summary} and the next macro/section.
  const trimmed = body.replace(/^\s+/, '');
  const stop = trimmed.search(/\\cv|\\begin\{itemize\}/);
  const text = stop === -1 ? trimmed : trimmed.slice(0, stop);
  return deLatex(text);
}

function parseItemize(body) {
  const begin = body.indexOf('\\begin{itemize}');
  const end = body.indexOf('\\end{itemize}');
  if (begin === -1 || end === -1) return [];
  const inner = body.slice(begin + '\\begin{itemize}'.length, end);
  const items = inner
    .split(/\\item\s+/)
    .slice(1)
    .map((s) => s.trim());
  return items.map((raw) => {
    // Items often look like: \textbf{Label:} body...
    const labelMatch = raw.match(/^\\textbf\{([^}]+)\}\s*(.*)$/s);
    if (labelMatch) {
      const label = deLatex(labelMatch[1]).replace(/:$/, '').trim();
      return { label, value: deLatex(labelMatch[2]) };
    }
    return { label: '', value: deLatex(raw) };
  });
}

function parseCvEvents(body) {
  const re = /\\cvevent\{/g;
  const events = [];
  let m;
  while ((m = re.exec(body))) {
    const a = readArg(body, m.index + '\\cvevent'.length);
    const b = readArg(body, a.end);
    const c = readArg(body, b.end);
    const d = readArg(body, c.end);
    const bullets = splitTopLevel(d.body)
      .map((s) => unwrapBraces(s))
      .map((s) => deLatex(s))
      .filter(Boolean);
    events.push({
      date: deLatex(a.body),
      title: deLatex(b.body),
      company: deLatex(c.body),
      bullets,
    });
    re.lastIndex = d.end;
  }
  return events;
}

function parseFooter(src) {
  // Footer lives inside `\colorbox{pagecol}{...}`; extract the \textcolor{sectcol}{slug} entries.
  const cb = src.indexOf('\\colorbox{pagecol}');
  if (cb === -1) return [];
  const region = src.slice(cb);
  const re = /\\textcolor\{sectcol\}\{([^}]+)\}/g;
  const links = [];
  let m;
  while ((m = re.exec(region))) {
    const value = deLatex(m[1]);
    if (value.includes('linkedin.com')) {
      links.push({ label: value, href: 'https://' + value });
    } else if (value.includes('github.com')) {
      links.push({ label: value, href: 'https://' + value });
    }
  }
  return links;
}

function buildResume(tex) {
  const src = stripComments(tex);
  const header = parseHeader(src);
  const meta = parseMeta(src);
  const sections = parseSections(src);
  const footer = parseFooter(src);

  const result = {
    header,
    meta,
    summary: '',
    skills: [],
    experience: [],
    education: [],
    certifications: [],
    footer,
  };

  for (const s of sections) {
    const key = s.title.toLowerCase();
    if (key === 'summary') {
      result.summary = parseSummary(s.body);
    } else if (key === 'technical skills' || key === 'skills') {
      result.skills = parseItemize(s.body);
    } else if (key === 'experience') {
      result.experience = parseCvEvents(s.body);
    } else if (key === 'education') {
      result.education = parseCvEvents(s.body);
    } else if (key === 'certifications') {
      result.certifications = parseItemize(s.body).map((i) => i.value);
    }
  }
  return result;
}

function emitTs(resume) {
  const banner =
    '// AUTO-GENERATED from main.tex by scripts/parse-resume.mjs. Do not edit by hand.\n\n';
  const types = `export type MetaItem = { label: string; value: string };
export type SkillItem = { label: string; value: string };
export type CvEvent = {
  date: string;
  title: string;
  company: string;
  bullets: string[];
};
export type FooterLink = { label: string; href: string };
export type Resume = {
  header: { name: string; title: string; subtitle: string };
  meta: MetaItem[];
  summary: string;
  skills: SkillItem[];
  experience: CvEvent[];
  education: CvEvent[];
  certifications: string[];
  footer: FooterLink[];
};

`;
  const data = `export const resume: Resume = ${JSON.stringify(resume, null, 2)};\n\nexport default resume;\n`;
  return banner + types + data;
}

function main() {
  const tex = readFileSync(texPath, 'utf8');
  const resume = buildResume(tex);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, emitTs(resume), 'utf8');
  const counts = {
    meta: resume.meta.length,
    skills: resume.skills.length,
    experience: resume.experience.length,
    education: resume.education.length,
    certifications: resume.certifications.length,
  };
  console.log(`parse-resume: wrote ${outPath}`);
  console.log(`  ${JSON.stringify(counts)}`);
}

main();
