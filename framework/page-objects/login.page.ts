import { $, by, ElementArrayFinder, ElementFinder } from 'protractor';

export class LoginPage {
    private readonly authForm: ElementFinder = $('.authorization-page').element(by.name('authForm'));
    private readonly userEmailInput: ElementFinder = this.authForm.element(by.model('form.email'));
    private readonly userEmailTooltips: ElementArrayFinder = this.authForm.$('.form-group.email').$$('.left-tooltip-box');
    private readonly userPasswordTooltip: ElementFinder = this.authForm
        .$('.input-group')
        .element(by.xpath('..'))
        .$('.tooltip-error');
    private readonly userPasswordInput: ElementFinder = this.authForm.element(by.model('form.password'));
    private readonly loginButton: ElementFinder = $('[name="authForm"]').$('[type="submit"]');
    private readonly showPasswordButton: ElementFinder = this.authForm.$('.icon-eye');

    async setEmail(userName: string): Promise<void> {
        await this.userEmailInput.clear();
        await this.userEmailInput.sendKeys(userName);
    }
    async setPassword(password: string): Promise<void> {
        await this.userPasswordInput.clear();
        await this.userPasswordInput.sendKeys(password);
    }

    async getPassword(): Promise<string> {
        return this.userPasswordInput.getAttribute('value');
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    async isLoginButtonPresent(): Promise<boolean> {
        return  this.loginButton.isPresent();
    }

    async clickShowPasswordButton(): Promise<void> {
        await this.showPasswordButton.click();
    }

    async isOpened(): Promise<boolean> {
        return this.authForm.isPresent();
    }

    async tryGetEmailValidationMessage(): Promise<string> {
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

    async tryGetPasswordValidationMessage(): Promise<string> {
        let message = '';
        try {
            message = await this.userPasswordTooltip.getText();
        } catch (error) {}
        return message;
    }
}
