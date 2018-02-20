import { browser, by, element, $, ElementFinder } from 'protractor';
import { promise } from 'selenium-webdriver';
import { LoginFormComponent } from './';

export class LoginPage {
  url = `${browser.baseUrl}/authorize`;
  
  loginForm: LoginFormComponent;

  constructor() {
    this.loginForm = new LoginFormComponent();
  }

  async open(): Promise<void> {
    return await browser.get(this.url);
  }

  async loginUser(user: { email: string; password: string }): Promise<void> {
    await this.loginForm.fillForm(user.email, user.password);

    return await this.loginForm.submitForm();
  }
}
