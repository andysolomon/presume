import { LightningElement, track } from 'lwc';
import resume from 'c/resumeData';

type Theme = 'dark' | 'light';
const STORAGE_KEY = 'resume-theme';

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

export default class App extends LightningElement {
  @track theme: Theme = 'dark';

  resume = resume;

  override connectedCallback(): void {
    const saved = this.readSavedTheme();
    if (saved) {
      this.theme = saved;
    }
    this.applyTheme();
  }

  get header() {
    return resume.header;
  }

  get hasNameLink(): boolean {
    return Boolean(resume.header.nameHref);
  }

  get nameHref(): string {
    return resume.header.nameHref;
  }

  get summary(): string {
    return resume.summary;
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

  get experience(): RenderedEvent[] {
    return resume.experience.map((e, i) => this.toRenderedEvent(e, `exp-${i}`));
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
