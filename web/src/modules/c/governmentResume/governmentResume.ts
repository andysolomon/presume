import { LightningElement, track } from 'lwc';
import resume from 'c/resumeData';

type Theme = 'dark' | 'light';
const STORAGE_KEY = 'resume-theme';
const GOVERNMENT_PAGE_HREF = '/government-experience';
const MAIN_RESUME_HREF = '/';
const GOVERNMENT_COMPANY_MARKER = 'Department of Veterans Affairs';

const GOVERNMENT_SUMMARY =
  'Federal delivery experience across VA security and benefits programs, paired with broader enterprise leadership across Salesforce, platform engineering, frontend architecture, and secure delivery. This version foregrounds government work while preserving the adjacent experience that supports execution in regulated, large-scale environments.';

const GOVERNMENT_HIGHLIGHTS = [
  'Delivered Salesforce solutions for Veterans Affairs programs covering personnel security investigations and benefits quality management.',
  'Built secure Experience Cloud and SSO flows for high-volume applicant and investigator workflows.',
  'Implemented least-privilege testing, CRUD and FLS enforcement, and Security.stripInaccessible() patterns for compliance-sensitive delivery.',
  'Automated case distribution, queue-based assignment, and Flow modernization to improve operational throughput.',
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

export default class GovernmentResume extends LightningElement {
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
      subtitle: 'Federal delivery, secure Salesforce architecture, Experience Cloud, and compliance-focused engineering',
    };
  }

  get hasNameLink(): boolean {
    return Boolean(resume.header.nameHref);
  }

  get nameHref(): string {
    return resume.header.nameHref;
  }

  get summary(): string {
    return GOVERNMENT_SUMMARY;
  }

  get highlights(): RenderedHighlight[] {
    return GOVERNMENT_HIGHLIGHTS.map((text, index) => ({
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
    return resume.skills.map((s, i) => ({
      key: `skill-${i}`,
      label: `${s.label}:`,
      value: s.value,
    }));
  }

  get governmentExperience(): RenderedEvent[] {
    return resume.experience
      .filter((e) => e.company.includes(GOVERNMENT_COMPANY_MARKER))
      .map((e, i) => this.toRenderedEvent(e, `gov-exp-${i}`));
  }

  get additionalExperience(): RenderedEvent[] {
    return resume.experience
      .filter(
        (e) =>
          !e.company.includes(GOVERNMENT_COMPANY_MARKER) &&
          (e.title.includes('Salesforce') || e.company === 'CodeScience'),
      )
      .map((e, i) => this.toRenderedEvent(e, `add-exp-${i}`));
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

  get governmentPageHref(): string {
    return GOVERNMENT_PAGE_HREF;
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
    return {
      key: keyPrefix,
      date: e.date,
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
