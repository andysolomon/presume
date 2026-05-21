import { LightningElement, track } from 'lwc';
import resume from 'c/resumeData';

type Theme = 'dark' | 'light';
const STORAGE_KEY = 'resume-theme';
const MAIN_RESUME_HREF = '/';

/* VERIFY: best-guess month prefixes for the Kapitus recruiter request.
   Edit this map to correct any dates without touching the rest of the file. */
const DATE_OVERRIDES: Record<string, string> = {
  'Thrivent Financial': 'Jan 2024 — Present',
  'MagMutual': 'Feb 2023 — Dec 2023',
  'Department of Veterans Affairs — PSIP': 'Apr 2022 — Jan 2023',
  'Department of Veterans Affairs — VBA QMS': 'May 2021 — Mar 2022',
  'CodeScience': 'Aug 2018 — Apr 2022',
  'CNN': 'Jan 2018 — Jul 2018',
  'Cox Automotive': 'Jun 2014 — Dec 2017',
  'Look-Listen': 'Jan 2013 — May 2014',
  'Paper Tiger': 'Aug 2010 — Dec 2012',
  'Albany State University': 'Aug 2005 — May 2010',
};

const KAPITUS_SUBTITLE =
  'Salesforce Tech Lead — Sales Cloud, Experience Cloud, LWC, Apex, integrations, and team leadership';

const KAPITUS_SUMMARY =
  'Salesforce Tech Lead with 15+ years of software development and 20+ end-to-end Salesforce implementations across regulated industries including financial services and federal agencies. Hands-on expertise across Apex, Triggers, Batch Apex, Lightning Web Components, Visualforce, and Experience Cloud, paired with deep integration experience using REST, SOAP, and Bulk API 2.0. Proven track record leading agile teams, establishing engineering standards, owning DevOps (Git, SFDX, CI/CD), and shipping scalable, secure solutions aligned to business goals.';

const KAPITUS_HIGHLIGHTS = [
  'Tech Lead at a Fortune 500 financial-services Salesforce org — owning 2GP package architecture, AWS-backed Bulk API 2.0 pipelines, and platform engineering standards.',
  'Hands-on across the Salesforce stack: Apex, Triggers, Batch Apex, LWC, Visualforce, Flow, SOQL — with comprehensive Apex and Jest unit testing.',
  'Integration depth across REST, SOAP, and Bulk API 2.0 with middleware and external systems; AWS S3 streaming pipelines for large result sets.',
  'Experience Cloud delivery for 10,000+ portal users with SSO/JIT provisioning, queue-based sharing, and persona-based security testing.',
  'Agile leadership — sprint planning, stand-ups, grooming, retrospectives — plus code reviews, mentoring, and engineering documentation across multiple teams.',
  'Modern DevOps: GitHub Actions, SFDX, multi-tier release pipelines, Playwright + Jest test coverage, design tokens, and AI-assisted engineering workflows.',
];

const KAPITUS_SKILLS = [
  {
    label: 'Salesforce Platform',
    value: 'Sales Cloud, Experience Cloud, Apex, Triggers, Batch Apex, Lightning Web Components (LWC), Visualforce, Flow, SOQL, OmniStudio',
  },
  {
    label: 'Integrations',
    value: 'REST API, SOAP API, Bulk API 2.0, Named Credentials, External Services, Platform Events, middleware-based integrations',
  },
  {
    label: 'Architecture & Security',
    value: 'Data modeling, sharing model, CRUD/FLS enforcement, Security.stripInaccessible(), persona-based testing, fflib Selector pattern, governance',
  },
  {
    label: 'DevOps & Testing',
    value: 'Git, SFDX, GitHub Actions, CI/CD, 2GP packages, Jest, Apex unit testing, Playwright, SonarQube',
  },
  {
    label: 'Cloud & AI',
    value: 'AWS (S3, IAM, Lambda-adjacent integrations), Agentforce, OpenAI, Claude API, MCP, prompt engineering',
  },
  {
    label: 'Leadership',
    value: 'Tech Lead, agile delivery, sprint planning, code review standards, mentoring, cross-functional collaboration with product, QA, and operations',
  },
];

type RenderedMeta = {
  key: string;
  label: string;
  value: string;
  href: string;
  isLink: boolean;
};

type RenderedSkill = { key: string; label: string; value: string };

type RenderedEvent = {
  key: string;
  date: string;
  title: string;
  companySeparator: string;
  company: string;
  companyHref: string;
  hasCompanyLink: boolean;
  bullets: { key: string; text: string }[];
};

type RenderedFooter = { key: string; label: string; href: string };
type RenderedHighlight = { key: string; text: string };

const SALESFORCE_COMPANIES = new Set([
  'Thrivent Financial',
  'MagMutual',
  'Department of Veterans Affairs — PSIP',
  'Department of Veterans Affairs — VBA QMS',
  'CodeScience',
]);

export default class KapitusResume extends LightningElement {
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
      subtitle: KAPITUS_SUBTITLE,
    };
  }

  get hasNameLink(): boolean {
    return Boolean(resume.header.nameHref);
  }

  get nameHref(): string {
    return resume.header.nameHref;
  }

  get summary(): string {
    return KAPITUS_SUMMARY;
  }

  get highlights(): RenderedHighlight[] {
    return KAPITUS_HIGHLIGHTS.map((text, index) => ({
      key: `highlight-${index}`,
      text,
    }));
  }

  get metaItems(): RenderedMeta[] {
    return resume.meta.map((m, i) => {
      const isEmail = m.value.includes('@');
      const isPortfolio = m.label.toLowerCase() === 'portfolio';
      const href = isEmail ? `mailto:${m.value}` : isPortfolio ? '/portfolio' : '';
      return {
        key: `meta-${i}`,
        label: m.label,
        value: isPortfolio ? `${m.value}/portfolio` : m.value,
        href,
        isLink: href !== '',
      };
    });
  }

  get skills(): RenderedSkill[] {
    return KAPITUS_SKILLS.map((s, i) => ({
      key: `skill-${i}`,
      label: `${s.label}:`,
      value: s.value,
    }));
  }

  get salesforceExperience(): RenderedEvent[] {
    return resume.experience
      .filter((e) => SALESFORCE_COMPANIES.has(e.company))
      .map((e, i) => this.toRenderedEvent(e, `sf-exp-${i}`));
  }

  get adjacentExperience(): RenderedEvent[] {
    return resume.experience
      .filter((e) => !SALESFORCE_COMPANIES.has(e.company))
      .map((e, i) => this.toRenderedEvent(e, `adj-exp-${i}`));
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

  get mainResumeHref(): string {
    return MAIN_RESUME_HREF;
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

  private toRenderedEvent(e: typeof resume.experience[number], keyPrefix: string): RenderedEvent {
    const overriddenDate = DATE_OVERRIDES[e.company] ?? e.date;
    return {
      key: keyPrefix,
      date: overriddenDate,
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
