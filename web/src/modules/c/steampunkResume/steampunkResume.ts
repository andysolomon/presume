import { LightningElement, track } from 'lwc';
import resume from 'c/resumeData';

type Theme = 'dark' | 'light';
const STORAGE_KEY = 'resume-theme';

/* Steampunk onboarding requirements ("First Steps with Steampunk" email):
   1. No location, phone, or email on the resume (the contact block is omitted).
   2. Month + year on every job.
   3. Month + year on every degree.
   Framing: Arcnology is the current employer; Thrivent is a contractor
   engagement delivered through Arcnology, not a separate employer. */

const ARCNOLOGY_COMPANY = 'Arcnology';
const ARCNOLOGY_HREF = 'https://arcnology.com';
const ARCNOLOGY_TITLE = 'Founder / Principal Salesforce Engineer';
const ARCNOLOGY_DATE = 'Feb 2023 — Present';
const ARCNOLOGY_BULLETS = [
  'Founded an independent Salesforce engineering practice delivering architecture, 2GP package engineering, integration design, and platform standards to enterprise clients under contract.',
  'Own delivery end to end on each engagement: discovery, solution design, Apex and LWC implementation, DevOps pipelines, test architecture, documentation, and mentoring for client engineering teams.',
];

/* The Thrivent entry in main.tex becomes an engagement nested under Arcnology. */
const THRIVENT_COMPANY = 'Thrivent Financial';
const THRIVENT_DATE = 'Jan 2024 — Present';
const THRIVENT_ENGAGEMENT_LABEL = 'Contract engagement via Arcnology';

/* Month + year for every remaining entry, keyed by company as it appears in
   resumeData.ts. LinkedIn-sourced dates are listed first; the rest are best
   available and should be verified before the next revision. */
const DATE_OVERRIDES: Record<string, string> = {
  // LinkedIn
  'CodeScience': 'Feb 2019 — Jan 2023',
  'CNN': 'Aug 2018 — Feb 2019',
  'Cox Automotive': 'Jan 2014 — Feb 2018',
  'Look-Listen': 'Apr 2013 — Nov 2013',
  // VERIFY
  'MagMutual': 'Feb 2023 — Dec 2023',
  'Department of Veterans Affairs — PSIP': 'Apr 2022 — Jan 2023',
  'Department of Veterans Affairs — VBA QMS': 'May 2021 — Mar 2022',
  'Paper Tiger': 'Aug 2010 — Dec 2012',
  'Albany State University': 'Aug 2005 — May 2010',
};

const STEAMPUNK_SUBTITLE =
  'Principal Salesforce Engineer — federal delivery, secure Apex and LWC architecture, Experience Cloud, and 2GP package engineering';

const STEAMPUNK_SUMMARY =
  'Principal Salesforce Engineer with 15+ years of software development experience and 20+ full end-to-end Salesforce implementations across federal agencies and Fortune 500 enterprises. Founder of Arcnology, an independent Salesforce engineering practice, currently engaged with Thrivent Financial on 2GP package architecture, Bulk API 2.0 data pipelines, and platform engineering standards. Delivered case management, Experience Cloud, and security hardening for the Department of Veterans Affairs across the Personnel Security & Investigations Program and VBA Quality Management. Deep Apex specialist across trigger frameworks, asynchronous processing, fflib patterns, governor-limit optimization, and enterprise test architecture. Security-first approach with expertise in sharing models, persona-based testing, CRUD/FLS enforcement, and least-privilege design. Holds an active national security clearance.';

const STEAMPUNK_HIGHLIGHTS = [
  'Federal delivery for the Department of Veterans Affairs: a Salesforce case management system and Experience Cloud portal serving 10,000+ applicants and 500+ investigators for PSIP, plus least-privilege security hardening and fflib modernization for VBA QMS.',
  'Founder and principal engineer at Arcnology, delivering enterprise Salesforce engineering under contract; current engagement at Thrivent Financial spans 33+ repositories of 2GP packages, GitHub Actions pipelines, and a Bulk API 2.0 to Amazon S3 data pipeline.',
  'Security-first Apex: Security.stripInaccessible(), CRUD/FLS checks, sharing enforcement, FeatureManagement.checkPermission(), and persona-based test coverage across compliance-sensitive programs.',
  'Technical leadership: established Apex, LWC, Jest, and Playwright testing standards, authored engineering and DevOps documentation, and mentored engineering teams across platform, web, and AI-assisted tooling.',
];

type RenderedSkill = { key: string; label: string; value: string };

type RenderedEngagement = {
  key: string;
  label: string;
  date: string;
  title: string;
  companySeparator: string;
  company: string;
  companyHref: string;
  hasCompanyLink: boolean;
  bullets: { key: string; text: string }[];
};

type RenderedEvent = {
  key: string;
  date: string;
  title: string;
  companySeparator: string;
  company: string;
  companyHref: string;
  hasCompanyLink: boolean;
  bullets: { key: string; text: string }[];
  engagements: RenderedEngagement[];
  hasEngagements: boolean;
};

type RenderedFooter = { key: string; label: string; href: string };
type RenderedHighlight = { key: string; text: string };

type SourceEvent = typeof resume.experience[number];

export default class SteampunkResume extends LightningElement {
  @track theme: Theme = 'dark';

  override connectedCallback(): void {
    const saved = this.readSavedTheme();
    if (saved) {
      this.theme = saved;
    }
    this.applyTheme();
  }

  get header() {
    return {
      ...resume.header,
      subtitle: STEAMPUNK_SUBTITLE,
    };
  }

  get hasNameLink(): boolean {
    return Boolean(resume.header.nameHref);
  }

  get nameHref(): string {
    return resume.header.nameHref;
  }

  get summary(): string {
    return STEAMPUNK_SUMMARY;
  }

  get highlights(): RenderedHighlight[] {
    return STEAMPUNK_HIGHLIGHTS.map((text, index) => ({
      key: `highlight-${index}`,
      text,
    }));
  }

  get skills(): RenderedSkill[] {
    return resume.skills.map((s, i) => ({
      key: `skill-${i}`,
      label: `${s.label}:`,
      value: s.value,
    }));
  }

  get experience(): RenderedEvent[] {
    const thrivent = resume.experience.find((e) => e.company === THRIVENT_COMPANY);
    const others = resume.experience.filter((e) => e.company !== THRIVENT_COMPANY);

    const arcnology: RenderedEvent = {
      key: 'exp-arcnology',
      date: ARCNOLOGY_DATE,
      title: ARCNOLOGY_TITLE,
      companySeparator: ' — ',
      company: ARCNOLOGY_COMPANY,
      companyHref: ARCNOLOGY_HREF,
      hasCompanyLink: true,
      bullets: ARCNOLOGY_BULLETS.map((text, j) => ({ key: `exp-arcnology-b${j}`, text })),
      engagements: thrivent ? [this.toRenderedEngagement(thrivent, 'exp-arcnology-thrivent')] : [],
      hasEngagements: Boolean(thrivent),
    };

    return [arcnology, ...others.map((e, i) => this.toRenderedEvent(e, `exp-${i}`))];
  }

  get education(): RenderedEvent[] {
    return resume.education.map((e, i) => this.toRenderedEvent(e, `edu-${i}`));
  }

  get footerLinks(): RenderedFooter[] {
    return resume.footer.map((f, i) => ({
      key: `footer-${i}`,
      label: f.label,
      href: f.href,
    }));
  }

  get pdfHref(): string {
    return this.theme === 'light'
      ? '/assets/andrewsolomon-steampunk-light.pdf'
      : '/assets/andrewsolomon-steampunk.pdf';
  }

  handleThemeToggle(): void {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(STORAGE_KEY, this.theme);
    } catch {
      /* localStorage unavailable; theme persists for the session only */
    }
    this.applyTheme();
  }

  private toRenderedEvent(e: SourceEvent, keyPrefix: string): RenderedEvent {
    return {
      key: keyPrefix,
      date: DATE_OVERRIDES[e.company] ?? e.date,
      title: e.title,
      companySeparator: ' — ',
      company: e.company,
      companyHref: e.companyHref,
      hasCompanyLink: Boolean(e.companyHref),
      bullets: e.bullets.map((text, j) => ({ key: `${keyPrefix}-b${j}`, text })),
      engagements: [],
      hasEngagements: false,
    };
  }

  private toRenderedEngagement(e: SourceEvent, keyPrefix: string): RenderedEngagement {
    return {
      key: keyPrefix,
      label: THRIVENT_ENGAGEMENT_LABEL,
      date: THRIVENT_DATE,
      title: e.title,
      companySeparator: ' — ',
      company: e.company,
      companyHref: e.companyHref,
      hasCompanyLink: Boolean(e.companyHref),
      bullets: e.bullets.map((text, j) => ({ key: `${keyPrefix}-b${j}`, text })),
    };
  }

  private readSavedTheme(): Theme | null {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return value === 'dark' || value === 'light' ? value : null;
    } catch {
      return null;
    }
  }

  private applyTheme(): void {
    document.documentElement.setAttribute('data-theme', this.theme);
  }
}
