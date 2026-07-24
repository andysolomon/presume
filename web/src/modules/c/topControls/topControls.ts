import { LightningElement, api } from 'lwc';

type Theme = 'dark' | 'light';

export default class TopControls extends LightningElement {
  @api theme: Theme = 'dark';

  handleThemeToggle(): void {
    this.dispatchEvent(new CustomEvent('themetoggle'));
  }
}
