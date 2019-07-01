import { $, ExpectedConditions, browser, by, element } from "protractor";

class UserProfile {
    private userName = element.all(by.xpath("//*/div[@class='description']/span[contains(@ng-hide, 'name')]")).first();
    private userEmail = element.all(by.xpath("//*/div[@class='description']/span[contains(@ng-hide, 'email')]")).first();
    private password = element.all(by.xpath("//*/div[@class='description']/span[contains(@ng-hide, 'password')]")).first();
    private phone = element.all(by.xpath("//*/div[@class='description']/span[contains(@ng-hide, 'phone')]")).first();
    private address = element.all(by.xpath("//*/div[@class='description']/span[contains(@ng-hide, 'address')]")).first();
    private pinValue = element.all(by.xpath("//*/div[contains(@ng-class, 'pin')]/div[@class='description']/span")).first();
    private updatePinButton = element.all(by.xpath("//*/div[contains(@ng-class, 'pin')]/div[@class='description']/span")).first();

    public async getUserName() {
        const userName = await this.userName.getText();
        return userName.trim();
    }

    public async getUserEmail() {
        const email = await this.userEmail.getText();
        return email.trim();
    }

    public async getUserPassword() {
        const password = await this.password.getText();
        return password.trim();
    }

    public async getUserPhoneNumber() {
        const phoneNumber = await this.phone.getText();
        return phoneNumber.trim();
    }

    public async getUserAddress() {
        const userAddress = await this.address.getText();
        return userAddress.trim();
    }

    public async getActualPin() {
        const currentPin = await this.pinValue.getText();
        return currentPin.trim();
    }

    public async updateSupportPin() {
        await this.updatePinButton.click();
        await browser.wait(ExpectedConditions.presenceOf(this.pinValue), 3000);
    }
}

export const onProfilePage = new UserProfile();