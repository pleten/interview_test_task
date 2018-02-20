import { ElementFinder, $, browser } from "protractor";
import { Tooltip } from "./tooltip.page-component";

export class LoginFormComponent {
  rootSelector: ElementFinder = $('.email-box');

  emailBlock: ElementFinder = this.rootSelector.$('.form-group.email');
  emailInput: ElementFinder = this.emailBlock.$('[name="email"]');
  emailError: Tooltip = new Tooltip(this.emailBlock);

  passwordBlock: ElementFinder = this.rootSelector.$('.input-group');
  passwordInput: ElementFinder = this.rootSelector.$('[name="password"]');
  passwordError: Tooltip = new Tooltip(this.passwordBlock);
  
  loginBtn: ElementFinder = this.rootSelector.$('.btn.block.primary');
  eyeIcon: ElementFinder = this.rootSelector.$('.icon-eye');

  async fillForm(email: string, pass: string): Promise<void> {
    await this.emailInput.clear();
    await this.emailInput.sendKeys(email);
    await this.passwordInput.clear();
    await this.passwordInput.sendKeys(pass);
  }

  async showPassword(): Promise<void> {
    await this.eyeIcon.click();
  }

  async isPasswordVisible(): Promise<boolean> {
    return await this.passwordInput.getAttribute('type') === 'text';   
  }

  async submitForm(): Promise<void> {
    await this.loginBtn.click();
  }

}