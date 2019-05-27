let BasePage = require('./BasePage');

class MyProfilePage extends BasePage {

    constructor() {
        super();
        this.name = element(by.xpath('//span[contains(@ng-hide,"name")]'));
        this.email = element(by.xpath('//span[contains(@ng-hide,"email")]'));
        this.password = element(by.xpath('//span[contains(@ng-hide,"password")]'));
        this.phone = element(by.xpath('//span[contains(@ng-hide,"phone")]'));
        this.address = element(by.xpath('//span[contains(@ng-hide,"address")]'));
        this.newsletter = element(by.xpath('//span[contains(@class,"mail-list")]'));
        this.pin = element(by.xpath('//div[contains(@ng-class,"pin")]/descendant::span[@class="text ng-binding"]'));
        this.viewProfile = element(by.xpath('//a[text()="View profile"]'));
        this.refreshPin = element(by.name('supportPin'));
    };

    async openViewProfile() {
        await this.waitForElementVisibility(this.dropDownMenu);
        this.dropDownMenu.click();
        await this.waitForElementVisibility(this.viewProfile);
        this.viewProfile.click();
        await this.waitForElementVisibility(this.name);
    }
}

module.exports = new MyProfilePage();