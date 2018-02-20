import { $$, ElementArrayFinder, ElementFinder, $ } from 'protractor';

export class Notification {
  allNotifications: ElementArrayFinder = $$('.notification.information');
  text: ElementFinder = $('.noty_text');

  async getText(i = 0) {
    return await this.allNotifications.get(i).$('.noty_text').getText();
  }
}
