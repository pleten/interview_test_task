import { by, element } from 'protractor';

export class LoginPage {
    private readonly loginPageBlock = element(by.css('.authorization-page'));
    private readonly authForm = this.loginPageBlock.element(by.name('authForm'));
    private readonly userEmailInput = this.authForm.element(by.model('form.email'));
    private readonly userEmailTooltips = this.authForm.element(by.css('.form-group.email')).all(by.css('.left-tooltip-box'));
    private readonly userPasswordTooltip = this.authForm
        .element(by.css('.input-group'))
        .element(by.xpath('..'))
        .element(by.css('.tooltip-error'));
    private readonly userPasswordInput = this.authForm.element(by.model('form.password'));
    private readonly loginButton = this.authForm.element(by.buttonText('Login'));
    private readonly showPasswordButton = this.authForm.element(by.css('.icon-eye'));

    async setEmail(userName) {
        await this.userEmailInput.clear();
        await this.userEmailInput.sendKeys(userName);
    }
    async setPassword(password) {
        await this.userPasswordInput.clear();
        await this.userPasswordInput.sendKeys(password);
    }
    async getPassword() {
        return this.userPasswordInput.getAttribute('value');
    }
    async clickLoginButton() {
        await this.loginButton.click();
    }
    async clickShowPasswordButton() {
        await this.showPasswordButton.click();
    }
    async isOpened() {
        return this.loginPageBlock.isPresent();
    }
    async tryGetEmailValidationMessage() {
        let message = '';
        try {
            message = await this.userEmailTooltips
                .filter(async filteredElement => {
                    const elementClassValue = await filteredElement.getAttribute('class');
                    return !elementClassValue.includes('ng-hide');
                })
                .first()
                .getText();
        } catch (error) {}
        return message;
    }
    async tryGetPasswordValidationMessage() {
        let message = '';
        try {
            message = await this.userPasswordTooltip.getText();
        } catch (error) {}
        return message;
    }
}
