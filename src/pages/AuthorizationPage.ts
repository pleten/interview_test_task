import { Browser } from '../Browser';
import { By } from 'selenium-webdriver';
import { Utils } from '../Utils';

export class AuthorizationPage {
  private emailFieldLocator: By = By.css('.email [name="email"]');
  private passwordFieldLocator: By = By.css('input[name="password"]');
  private submitLoginButtonLocator: By = By.css('.authorization-content [type="submit"]');
  private showPasswordButtonLocator: By = By.css('button[ng-click^="showPassword"]');
  private pageTitleLocator: By = By.css('.page-title');
  private errorMessageLocator: By = By.css('.noty_text');
  private emailTooltipMessageLocator: By =
                By.xpath('//div[@class="form-group email"]//div[@class="left-tooltip-box"]//span');
  private passwordTooltipMessageLocator: By =
                By.xpath('//div[@class="form-group"]//div[@class="left-tooltip-box"]//span');

  constructor(private browser: Browser) {
  }

  async login(username: string, password: string): Promise<void> {
    await this.browser.findBy(this.emailFieldLocator)
      .then(element => element.sendKeys(username));
    await this.browser.findBy(this.passwordFieldLocator)
      .then(element => element.sendKeys(password));
    await this.browser.findBy(this.submitLoginButtonLocator)
    .then(element => element.click());
  }

  async isOpened(): Promise<boolean> {
    return Utils.formatString(
        await this.browser.getText(this.pageTitleLocator)) === 'Authorization' &&
      await this.browser.getUrl() === 'https://www.ssls.com/authorize';
  }

  async showPassword(): Promise<void> {
    await this.browser.findBy(this.showPasswordButtonLocator)
      .then(element => element.click());
  }

  async isPasswordShown(): Promise<boolean> {
    return await this.browser.getAttributeValue(this.passwordFieldLocator, 'type') === 'text';
  }

  async getErrorText(): Promise<string> {
    await this.browser.waitForElementVisible(this.errorMessageLocator);
    return await this.browser.getText(this.errorMessageLocator);
  }

  async getEmailTooltipText(): Promise<string> {
    await this.browser.waitForElementVisible(this.emailTooltipMessageLocator);
    return Utils.formatString(await this.browser.getText(this.emailTooltipMessageLocator));
  }

  async getPasswordTooltipText(): Promise<string> {
    await this.browser.waitForElementVisible(this.passwordTooltipMessageLocator);
    return Utils.formatString(await this.browser.getText(this.passwordTooltipMessageLocator));
  }
}
