const connections = require('../../connections.json');

class ProfilePage {

    constructor() {
    }

    get passwordFieldInEmail() {
        return $('input[type="password"]');
    }

    get supportPinUpdateButton() {
        return $('button[name="supportPin"]');
    }

    async getAndSaveName() {
        let userName = await this.getUserName();
        await this.editProfileEntityButton('name');
        await this.saveUserProfileDataButton('name');
        return userName;
    }

    async getAndSaveEmail() {
        const emailValue = this.getEmail();
        await this.editProfileEntityButton('email');
        await this.passwordFieldInEmail.sendKeys(connections.credentials.admin.password);
        await this.saveUserProfileDataButton('email');
        return emailValue;
    }

    async openAndSavePassword() {
        await this.editProfileEntityButton('password');
        await $('[name="current_password"]').sendKeys(connections.credentials.admin.password);
        await $('[name="password"]').sendKeys(connections.credentials.admin.password);
        await this.saveUserProfileDataButton('password');
    }

    async getAndSavePhone() {
        const phoneValue = await $('span[ng-hide*="phone"]').getText();
        await this.editProfileEntityButton('phone');
        await this.saveUserProfileDataButton('phone');
        return phoneValue;
    }

    async getAndSaveAddress() {
        let addressValue = await this.getAddress();
        await this.editProfileEntityButton('address');
        await this.saveUserProfileDataButton('address');
        return addressValue;
    }

    async getEmail(){
        return await $('span[ng-hide*="email"]').getText();
    }

    async getPassword(){
        return await $('span[ng-hide*="email"]').getText();
    }

    async getUserName() {
        return await $('span[ng-hide*="name"]').getText();
    }

    async getPassword(){
        return await $('span[ng-hide*="password"]').getText();
    }

    async getPhone(){
        return await $('span[ng-hide*="phone"]').getText();
    }

    async getAddress() {
        return await $('span[ng-hide*="address"]').getText();
    }

    async getSupportPinValue() {
        return await $('div[ng-class*="pin"] div:nth-child(2)>span').getText();
    }

    async getNewslettersToggleState() {
        return await $('div[ng-class*="newsletter"] div:nth-child(2)>button')
            .getAttribute('class');
    }

    async editProfileEntityButton(entity) {
        await $(`[ng-class]>button[ng-hide*="${entity}"]`).click();
    }

    async saveUserProfileDataButton(way) {
        await $(`div[ng-class*="${way}"] button[type="submit"]:last-child`).click();
    }
}

module.exports = ProfilePage;