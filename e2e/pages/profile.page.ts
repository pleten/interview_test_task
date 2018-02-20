import { browser, ElementFinder, $ } from 'protractor';

export class ProfilePage {
  url = `${browser.baseUrl}/user/profile`;

  profileForm: ElementFinder = $('.profile-content');
  name: ElementFinder = this.profileForm.$(`[ng-class~="'name'"]`);
  email: ElementFinder = this.profileForm.$(`[ng-class~="'email'"]`);
  password: ElementFinder = this.profileForm.$(`[ng-class~="'password'"]`);
  phone: ElementFinder = this.profileForm.$(`[ng-class~="'phone'"]`);
  address: ElementFinder = this.profileForm.$(`[ng-class~="'address'"]`);
  pin: ElementFinder = this.profileForm.$(`[ng-class~="'pin'"]`);
  newsletter: ElementFinder = this.profileForm.$(`[ng-class~="'newsletter'"]`);

  async open(): Promise<void> {
    return await browser.get(this.url)
  }

  async getPropValue(prop: ElementFinder): Promise<string> {
    return await prop.$('.description .text').getText();
  }

  async isSupscribedToNewsletter(): Promise<boolean> {
    const toggle = await this.newsletter.$('.toggle-btn').getAttribute('class');

    return toggle.includes('on');
  }

  async refreshPin(): Promise<void> {
    return await this.pin.$('[name="supportPin"]').click();
  }

  async getProfileData() {
    const name = await this.getPropValue(this.name);
    const email = await this.getPropValue(this.email);
    const password = !!(await this.getPropValue(this.password)).length;
    const phone = await this.getPropValue(this.phone);
    const address = await this.getPropValue(this.address);
    const pin = await this.getPropValue(this.pin);
    const newsletter = await this.isSupscribedToNewsletter();

    return Object.assign({
      name,
      email,
      password,
      phone,
      address,
      pin,
      newsletter
    });
  }
}
