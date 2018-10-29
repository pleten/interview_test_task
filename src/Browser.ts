import { until, ThenableWebDriver, Builder, By, WebElement,
   Capabilities } from 'selenium-webdriver';
import * as chromedriver from 'chromedriver';
import * as chrome from 'selenium-webdriver/chrome';

const DEFAULT_TIMEOUT_TIME_SEC: number = 10;

export class Browser {
  private driver: ThenableWebDriver;
  constructor(browserName:string) {
    switch (browserName) {
      case 'chrome':
        this.driver = new Builder().withCapabilities(Capabilities.chrome()).build();
        break;
      default:
        throw Error('Not supported browser');
    }
    this.driver.manage().window().maximize();
  }

  static configure(browserName:string) {
    switch (browserName) {
      case 'chrome':
        const service = new chrome.ServiceBuilder(chromedriver.path).build();
        chrome.setDefaultService(service);
        break;
      default:
        throw Error('Not supported browser');
    }
  }

  async navigate(url:string): Promise<void> {
    await this.driver.get(url);
  }

  async findBy(locator:By): Promise<WebElement> {
    return await this.driver.wait(until.elementLocated(locator), DEFAULT_TIMEOUT_TIME_SEC * 1000);
  }

  async findAllBy(locator:By): Promise<WebElement[]> {
    return await this.driver.wait(until.elementsLocated(locator), DEFAULT_TIMEOUT_TIME_SEC * 1000);
  }

  async close(): Promise<void> {
    await this.driver.quit();
  }

  async getUrl(): Promise<string> {
    return await this.driver.getCurrentUrl();
  }

  async isElementPresent(locator: By): Promise<boolean> {
    try {
      await this.findBy(locator);
      return true;
    } catch (e) {
      return false;
    }
  }

  async waitForElementVisible(locator: By): Promise<WebElement>   {
    return this.driver.wait(until.elementIsVisible(await this.findBy(locator)),
                            DEFAULT_TIMEOUT_TIME_SEC * 1000);
  }

  async waitForElementNotVisible(locator: By): Promise<WebElement> {
    return this.driver.wait(until.elementIsNotVisible(await this.findBy(locator)),
                            DEFAULT_TIMEOUT_TIME_SEC * 1000);
  }

  async getAttributeValue(locator: By, attribute: string): Promise<string> {
    const elem = await this.findBy(locator);
    return elem.getAttribute(attribute);
  }

  async getText(locator: By): Promise<string> {
    const elem = await this.findBy(locator);
    return elem.getText();
  }

  async sleep(): Promise<void> {
    await this.driver.sleep(4000);
  }
}
