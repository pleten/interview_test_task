class MyProfilePage {

    constructor() {
        this.supportPinUpdateButton = element(by.css('[name="supportPin"]'));
        this.profileValues = element.all(by.css('[class="description"]'));
    }

    profileRowDataByNumber(num) {
        return `form div[class="item"]:nth-child(${num}) [class="description"]`;
    }

    async getSupportPin() {
        return await element(by.css(this.profileRowDataByNumber(6))).getText();
    }

    clickRefreshSupportPin() {
        this.supportPinUpdateButton.click();
    }
}

module.exports = new MyProfilePage();