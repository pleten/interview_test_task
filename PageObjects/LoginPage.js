let BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor() {
    super();
    this.logInButton = element(by.xpath('//a[text()="Log in"]'));
    this.emailField = element(by.xpath('//div[@class ="form-group email"]/child::input[contains(@name,"email")]'));
    this.passwordField = element(by.xpath('//input[contains(@name,"password")]'));
    this.showPassword = element(by.xpath('//button[contains(@class,"btn-input")]'));
    this.login = element(by.xpath('//button[text()="Login"]'));
    this.url = 'https://ssls.com';
    this.logText = element(by.xpath('//div[@class="log-box"]'));
    this.notifyMessage = element(by.xpath('//span[@class="noty_text"]'));
    this.leftSideTooltip = element(
      by.xpath('//input[@name="email"]/following-sibling::div[@class="left-tooltip-box"]')
    );
    this.emptyFieldsValidationError = element(
      by.xpath('//div[@class="input-group"]/following-sibling::div[@class="left-tooltip-box"]')
    );
    this.logOutButton = element(by.xpath('//button[text()="Log out"]'));
  }

  clickLogInButton() {
    this.login.click();
  }

  clickOnEyeButton() {
    this.showPassword.click();
  }

  async logOut() {
    await this.waitForElementVisibility(this.dropDownMenu);
    this.dropDownMenu.click();
    await this.waitForElementVisibility(this.logOutButton);
    this.logOutButton.click();
  }

  fillInlogInForm(email, password) {
    this.logInButton.click();
    this.emailField.sendKeys(email);
    this.passwordField.sendKeys(password);
  }
}

module.exports = new LoginPage();
