import { browser, element, $, ElementFinder, By, ElementArrayFinder, $$ } from 'protractor';
import { promise as wd } from 'selenium-webdriver';
import { Filter } from './index';

export class HomePage {
  url = `${browser.baseUrl}`;

  loginBtn: ElementFinder = $('.log-box');
  userDropdownBtn: ElementFinder = $('.dropdown-btn');
  logOutBtn: ElementFinder = $('[ng-click="logout()"]');
  profileBtn: ElementFinder = $('[ui-sref="user.profile"]');

  allItems: ElementArrayFinder = $$('.ssl-item');
  
  async getItemDescription(item: ElementFinder): Promise<string> {
    return await item.$('.desc-box').getText();
  }

  async getItemRating(item: ElementFinder): Promise<number> {
    return Number((await item.$('.rating').getAttribute('class')).replace('rating stars-', '').replace('_', '.'));
  }

  async getItemPrice(item: ElementFinder): Promise<number> {
    return Number(await item.$('[class="price"] .integer').getText() + await item.$('[class="price"] .cent').getText());
  }

  async open(): Promise<void> {
    return await browser.get(browser.baseUrl);
  }

  async gotoLoginPage(): Promise<void> {
    return await this.loginBtn.click();
  }

  async gotoProfilePage(): Promise<void> {
    await this.userDropdownBtn.click();
    await this.profileBtn.click();
  } 

  async logOut(): Promise<void> {
    await this.userDropdownBtn.click();
    
    return await this.logOutBtn.click();
  }

  async filterBy(filter: Filter): Promise<void> {
    await filter.click();
  }

  async getItemsList(): Promise<ElementFinder[]> {
    return await this.allItems.asElementFinders_();
  }

  async getAllItemsDescriptions(): Promise<string[]> {
    return await Promise.all((await this.getItemsList())
      .map(async item => await this.getItemDescription(item)));
  } 

  async getAllItemsRatings(): Promise<number[]> {
    return (await Promise.all((await this.getItemsList()).map(async item => await this.getItemRating(item))));
  }

  async getAllItemsPrices(): Promise<number[]> {
    return (await Promise.all((await this.getItemsList()).map(async item => await this.getItemPrice(item))));
  }


}