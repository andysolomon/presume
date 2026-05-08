import { LightningElement, api } from 'lwc';

type Theme = 'dark' | 'light';

export default class ThemeToggle extends LightningElement {
  @api theme: Theme = 'dark';

  get isDark(): boolean {
    return this.theme === 'dark';
  }

  get ariaLabel(): string {
    return this.isDark ? 'Switch to light mode' : 'Switch to dark mode';
  }

  handleClick(): void {
    this.dispatchEvent(new CustomEvent('toggle'));
  }
}
