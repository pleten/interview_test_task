import { ElementFinder, $ } from 'protractor';

export class Tooltip {
  rootSelector: ElementFinder;
  
  constructor(rootSelector: ElementFinder) {
    this.rootSelector = rootSelector;
  }
  
  async getText(): Promise<string> {
    return await this.rootSelector.$('.left-tooltip-box:not(.ng-hide) .tooltip-text').getText();
  }
}
