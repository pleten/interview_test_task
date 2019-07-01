import { $, ExpectedConditions, browser, by, element } from "protractor";
import {commonMethods} from "./commonMethods";

class UserProfile {
    private userName = element.all(by.xpath("//*/div[@class='description']/span[contains(@ng-hide, 'name')]")).first();
    private userEmail = element.all(by.xpath("//*/div[@class='description']/span[contains(@ng-hide, 'email')]")).first();
    private password = element.all(by.xpath("//*/div[@class='description']/span[contains(@ng-hide, 'password')]")).first();
    private phone = element.all(by.xpath("//*/div[@class='description']/span[contains(@ng-hide, 'phone')]")).first();
    private address = element.all(by.xpath("//*/div[@class='description']/span[contains(@ng-hide, 'address')]")).first();
    private pinValue = element.all(by.xpath("//*/div[contains(@ng-class, 'pin')]/div[@class='description']/span")).first();
    private updatePinButton = element.all(by.xpath("//*/div[contains(@ng-class, 'pin')]/button[@name='supportPin']")).first();

    public async getUserName() {
        await browser.wait(ExpectedConditions.visibilityOf(this.userName), 4000);
        const userName = await this.userName.getText();
        return userName.trim();
    }

    public async getUserEmail() {
        await browser.wait(ExpectedConditions.visibilityOf(this.userEmail), 4000);
        const email = await this.userEmail.getText();
        return email.trim();
    }

    public async getUserPassword() {
        await browser.wait(ExpectedConditions.visibilityOf(this.password), 4000);
        const password = await this.password.getText();
        return password.trim();
    }

    public async getUserPhoneNumber() {
        await browser.wait(ExpectedConditions.visibilityOf(this.phone), 4000);
        const phoneNumber = await this.phone.getText();
        return phoneNumber.trim();
    }

    public async getUserAddress() {
        await browser.wait(ExpectedConditions.visibilityOf(this.address), 4000);
        const userAddress = await this.address.getText();
        return userAddress.trim();
    }

    public async getActualPin() {
        await browser.wait(ExpectedConditions.visibilityOf(element.all(by.xpath("//*/div[contains(@ng-class, 'pin')]/div[@class='description']/span")).first()), 4000);
        const currentPin = await element.all(by.xpath("//*/div[contains(@ng-class, 'pin')]/div[@class='description']/span")).first().getText();
        return currentPin.trim();
    }

    public async updateSupportPin() {
        await browser.wait(ExpectedConditions.visibilityOf(this.updatePinButton), 4000);
        await this.updatePinButton.click();
        await commonMethods.waitLittleBit(6000);
    }
}

export const onProfilePage = new UserProfile();