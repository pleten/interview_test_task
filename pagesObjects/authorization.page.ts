import { $, ExpectedConditions, browser, by, element } from "protractor";
import { commonMethods } from "./commonMethods";

class AuthorizationPageObject {
    private loginInput = $("div.email>input[name='email']");
    private passwordInput = $("input[name='password']");
    private loginButton = $("button.primary");
    private eyeButton = $("button[ng-click='showPassword = !showPassword']");
    private notyMessageContainer = $("div.noty_message>span.noty_text");

    public async goToAuthorizationPage() {
        await browser.get(`${browser.baseUrl}/authorize`);
        // await browser.wait(ExpectedConditions.urlIs(`${browser.baseUrl}/authorize`), 6000);
    }

    public async isAuthorizationPageOpened() {
        const url = await browser.getCurrentUrl();
        if (url.includes("authorize")) { return true; }
        return false;
    }

    public async isPasswordDisplayedInTheField() {
        const passwordFieldType = await this.passwordInput.getAttribute("type");
        if (passwordFieldType === "text") { return true; }
        return false;
    }

    public async getPasswordValueFromTheField() {
        return await this.passwordInput.getAttribute("value");
    }

    public async fillInLoginInput(email: string) {
        await browser.wait(ExpectedConditions.presenceOf(this.loginInput), 5000);
        await this.loginInput.sendKeys(email);
    }

    public async fillInPasswordInput(password: string) {
        await browser.wait(ExpectedConditions.presenceOf(this.passwordInput), 5000);
        await this.passwordInput.sendKeys(password);
    }

    public async initLogin() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.loginButton), 3000);
        await this.loginButton.click();
    }

    public async clickEyeButton() {
        await this.eyeButton.click();
    }

    public async getValidationMessageForEmailField() {
        const messageText = await element.all(by.xpath("//*/div[@class='form-group email']/div[@class='left-tooltip-box']//span[@class='tooltip-text']")).first().getText();
        return messageText.replace("\n", " ").trim();
    }

    public async getValidationMessageForPasswordField() {
        const messageText = await element.all(by.xpath("//*/div[@class='form-group']/div[@class='left-tooltip-box']//span[@class='tooltip-text']")).first().getText();
        return messageText.replace("\n", " ").trim();
    }

    public async isValidationMessageDisplayedForEmailField() {
        return await commonMethods.isElementDisplayed(element.all(by.xpath("//*/div[@class='form-group email']/div[@class='left-tooltip-box']//span[@class='tooltip-text']")).first());
    }

    public async isValidationMessageDisplayedForPasswordField() {
        return await commonMethods.isElementDisplayed(element.all(by.xpath("//*/div[@class='form-group']/div[@class='left-tooltip-box']//span[@class='tooltip-text']")).first());
    }

    public async isNotificationMessageDisplayed() {
        return await commonMethods.isElementDisplayed($("div.noty_message>span.noty_text"));
    }

    public async getNotificationMessageText() {
        return await $("div.noty_message>span.noty_text").getText();
    }
}

export const onAuthorizationPage: AuthorizationPageObject = new AuthorizationPageObject();