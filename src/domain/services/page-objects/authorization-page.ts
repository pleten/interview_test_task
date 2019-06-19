import {PageObject} from "./page-object";
import {$, $$, browser, by, element, ElementFinder, ExpectedConditions} from "protractor";

export class AuthorizationPage extends PageObject {
    constructor(url: string = 'https://www.ssls.com/authorize') {
        super(url);
    }

    public async logIn(): Promise<void> {
        if (await this.isLoggedOut()) {
            await this.inputEmail(browser.params.regTestUser.email);
            await this.inputPassword(browser.params.regTestUser.password);

            await this.clickLoginButton();

            await browser.wait(ExpectedConditions.presenceOf($('.btn.btn-s.round.filled.user-btn')), 5000);
        }
    }

    // tslint:disable-next-line:prefer-function-over-method
    public async inputEmail(email: string): Promise<void> {
        const emailInput: ElementFinder = $('.authorization-content [name="email"]');
        await browser.wait(ExpectedConditions.presenceOf(emailInput), 5000);
        await emailInput.clear();

        if (email !== 'EMPTY') {
            return emailInput.sendKeys(email);
        }
    }

    // tslint:disable-next-line:prefer-function-over-method
    public async inputPassword(password: string): Promise<void> {
        const passwordInput: ElementFinder = $('[name="password"]');
        await browser.wait(ExpectedConditions.presenceOf(passwordInput), 5000);
        await passwordInput.clear();

        if (password !== 'EMPTY') {
            return passwordInput.sendKeys(password);
        }
    }

    // tslint:disable-next-line:prefer-function-over-method
    public async clickLoginButton(): Promise<void> {
        return element(by.buttonText('Login')).click();
    }

    // tslint:disable-next-line:prefer-function-over-method
    public async clickPasswordEye(): Promise<void> {
        return $$('.btn-box > button').get(0).click();
    }

    // tslint:disable-next-line:prefer-function-over-method
    public async getPasswordValue(): Promise<string> {
        return browser.executeScript(`return document.querySelector(".input-box.password > input").value;`);
    }

    // tslint:disable-next-line:prefer-function-over-method
    public async getErrorMessageText(): Promise<string> {
        await browser.wait(ExpectedConditions.visibilityOf($('.noty_text')), 5000,
            'The error message text does not appear.');

        return browser.executeScript(`return document.querySelector('.noty_text').innerText;`);
    }

    // tslint:disable-next-line:prefer-function-over-method
    public async getEmailFieldErrorMessage(code: string = 'NOT_EMAIL'): Promise<string> {
        const selector: string = code === 'NOT_EMAIL' ?
            'form > div:nth-child(2) > div > div:nth-child(2) > div > div.tooltip.tooltip-error > span' :
            'form > div:nth-child(2) div:nth-child(3) div.tooltip.tooltip-error > span';

        return browser
            .executeScript(`return document.querySelector("${selector}").innerText.trim().replace('\\n', ' ');`);
    }

    // tslint:disable-next-line:prefer-function-over-method
    public async getPasswordFieldErrorMessage(): Promise<string> {
        const selector: string =
            'form > div:nth-child(3) > div > div.left-tooltip-box > div > div.tooltip.tooltip-error > span';

        return browser
            .executeScript(`return document.querySelector("${selector}").innerText.trim().replace('\\n', ' ');`);
    }

    // tslint:disable-next-line:prefer-function-over-method
    public async isLoggedOut(): Promise<boolean> {
        const emailInput: ElementFinder = $('.authorization-content [name="email"]');
        const emailFieldVisible: boolean = await emailInput.isPresent();

        const passwordInput: ElementFinder = $('[name="password"]');
        const passwordFieldVisible: boolean = await passwordInput.isPresent();

        return emailFieldVisible && passwordFieldVisible;
    }
}