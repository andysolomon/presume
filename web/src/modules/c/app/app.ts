import { LightningElement, track } from 'lwc';

type Theme = 'dark' | 'light';
const STORAGE_KEY = 'resume-theme';

export default class App extends LightningElement {
  @track theme: Theme = 'dark';

  connectedCallback(): void {
    const saved = this.readSavedTheme();
    if (saved) {
      this.theme = saved;
    }
    this.applyTheme();
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
