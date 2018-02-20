import { ElementFinder, element, By, $$, ElementArrayFinder } from 'protractor';

export class Filter {
  el: ElementFinder;

  constructor(selector: string) {
    this.el = element(By.partialLinkText(selector));
  }

  async click() {
    return await this.el.click();
  }
}

export const personal: Filter = new Filter('PERSONAL');
export const multiDomain: Filter = new Filter('MULTI-DOMAIN');
export const cheapest: Filter = new Filter('CHEAPEST');
export const featured: Filter = new Filter('FEATURED');
