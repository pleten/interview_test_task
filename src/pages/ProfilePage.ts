import { Browser } from '../Browser';
import { By } from 'selenium-webdriver';
import { Utils } from '../Utils';

export class ProfilePage {
  private refreshSupportPinButtonLocator: By = By.css('button[name="supportPin"]');
  private supportPinTextLocator: By = By.css('[ng-class*=pin] .description .text');
  private disabledItemLocator: By = By.css('.item.disabled');
  private activeItemLocator: By = By.css('form .item:not(.disabled):not([ng-class*="pin"])');
  private pageTitleLocator: By = By.css('.page-title');

  constructor(private browser: Browser) {
  }

  async isOpened(): Promise<boolean> {
    return Utils.formatString(await this.browser.getText(this.pageTitleLocator)) === 'Profile' &&
      await this.browser.getUrl() === 'https://www.ssls.com/user/profile';
  }

  async refreshSupportPin(): Promise<void> {
    await this.browser.findBy(this.refreshSupportPinButtonLocator)
      .then(element => element.click());
    await this.browser.findBy(this.disabledItemLocator);
    await this.browser.findBy(this.activeItemLocator);
  }

  async getSupportPinValue(): Promise<string> {
    await this.browser.findBy(this.refreshSupportPinButtonLocator);
    return Utils.formatString(await this.browser.getText(this.supportPinTextLocator));
  }

  async getFieldValue(field: string) : Promise<string> {
    const locator = this.buildProfileFieldLocator(field);
    const value = await this.browser.findBy(locator);

    return Utils.formatString(await value.getText());
  }

  private buildProfileFieldLocator(field: string): By {
    return By.css(`[ng-class*="${field}"] .description > span`);
  }
}
