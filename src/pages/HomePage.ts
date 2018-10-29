import { Browser } from '../Browser';
import { By, WebElement } from 'selenium-webdriver';
import { AuthorizationPage } from './AuthorizationPage';
import { ProfilePage } from './ProfilePage';
import { Utils } from '../Utils';

export class HomePage {
  private loginButtonLocator: By = By.css('.log-box a');
  private profileButtonLocator: By = By.css('[ui-sref="user.certificates.list"].btn');
  private logoutButtonLocator: By = By.css('.drop-button');
  private profileViewButtonLocator: By = By.css('a[href="/user/profile"]');
  private menuDropdownButtonLocator: By = By.css('.dropdown-btn');
  private sslCertificateLocator: By = By.css('.ssl-item');
  private descriptionBoxLocator: By = By.css('.desc-box');
  private activeFilterButtonLocator: By = By.css('.btn.active');
  private sortButtonLocator: By = By.css('[ng-click*="orderBy"]');
  private amountTextLocator: By = By.css('.price:not(.old-price) .integer');
  private centTextLocator: By = By.css('.price:not(.old-price) .cent');
  private hotLabelLocator: By = By.css('.promo.hot');
  private saleLabelLocator: By = By.css('.promo.sale');

  constructor(private browser: Browser) {
  }

  async open(): Promise<void> {
    await this.browser.navigate('https://www.ssls.com');
  }

  async isOpened(): Promise<boolean> {
    return await this.browser.isElementPresent(this.loginButtonLocator);
  }

  async openAutorizationPage(): Promise<AuthorizationPage> {
    await this.browser.findBy(this.loginButtonLocator)
      .then(element => element.click());
    return new AuthorizationPage(this.browser);
  }

  async openProfilePage(): Promise<ProfilePage> {
    await this.browser.findBy(this.menuDropdownButtonLocator)
      .then(element => element.click());
    await this.browser.findBy(this.profileViewButtonLocator)
      .then(element => element.click());
    return new ProfilePage(this.browser);
  }

  async isUserLoggerIn(name: string): Promise<boolean> {
    return await this.browser.isElementPresent(this.profileButtonLocator) &&
      await this.browser.getText(this.profileButtonLocator) === name;
  }

  async logout(): Promise<void> {
    await this.browser.findBy(this.menuDropdownButtonLocator)
      .then(element => element.click());
    await this.browser.findBy(this.logoutButtonLocator)
      .then(element => element.click());
  }

  async filterSslCertificates(category: string): Promise<void> {
    await this.browser.findBy(this.buildFilterLocator(category))
      .then(element => element.click());
  }

  async isPersonalFilterApplied(): Promise<boolean> {
    const businessPattern = 'Organization validation';
    const ecommercePattern = 'EV (greenbar)';
    const certificates = await this.getAllSslCertificates();

    for (const certificate of certificates) {
      const text = Utils.formatString(
          await certificate.findElement(this.descriptionBoxLocator).getText());
      if (text.includes(businessPattern) || text.includes(ecommercePattern)) {
        return false;
      }
    }
    return true;
  }

  async isMultiDomainFilterApplied(): Promise<boolean> {
    const multiDomainPattern = '3-100 domains';
    const certificates = await this.getAllSslCertificates();

    for (const certificate of certificates) {
      const text = Utils.formatString(
          await certificate.findElement(this.descriptionBoxLocator).getText());
      if (text.includes(multiDomainPattern)) {
        return true;
      }
    }
    return false;
  }

  async isSslSortedByCheapest(): Promise<boolean> {
    const certificates = await this.getAllSslCertificates();
    let previosPrice = 0;

    for (const certificate of certificates) {
      const price = Number(await certificate.findElement(this.amountTextLocator).getText() +
        await certificate.findElement(this.centTextLocator).getText());
      if (price >= previosPrice) {
        previosPrice = price;
      } else {
        return false;
      }
    }
    return true;
  }

  async isSslSortedByFeatured(): Promise<boolean> {
    const certificates = await this.getAllSslCertificates();
    let isHot = true;
    let isSale = true;
    let isHotAndSale = true;

    for (const certificate of certificates) {
      const saleCount = await certificate.findElements(
          this.saleLabelLocator).then(sales => sales.length);
      const hotCount = await certificate.findElements(
          this.hotLabelLocator).then(hots => hots.length);

      // check if hot and sale
      if (hotCount === 0 || saleCount === 0) {
        isHotAndSale = false;
      } else if (hotCount !== 0 && !isHot && saleCount !== 0 && !isSale) {
        return false;
      }

      // check if hot
      if (hotCount === 0 && !isHotAndSale) {
        isHot = false;
      } else if (hotCount !== 0 && !isHot) {
        return false;
      }

      // check if sale
      if (saleCount === 0 && !isHot) {
        isSale = false;
      } else if (saleCount !== 0 && !isSale) {
        return false;
      }
    }
    return true;
  }

  async clearAllFilter(): Promise<void> {
    await this.browser.findAllBy(this.activeFilterButtonLocator)
      .then(filters => filters
        .forEach(filter => filter.click()));
  }

  async sort(): Promise<void> {
    await this.browser.findBy(this.sortButtonLocator)
      .then(element => element.click());
  }

  private buildFilterLocator(category: string): By {
    return By.xpath(`//a[contains(text(), "${category}")]`);
  }

  private async getAllSslCertificates(): Promise<WebElement[]> {
    return await this.browser.findAllBy(this.sslCertificateLocator);
  }

  async close(): Promise<void> {
    await this.browser.close();
  }
}
