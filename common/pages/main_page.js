class MainPage {

    constructor() {
        browser.ignoreSynchronization = false;
    }

    get viewProfileButton() {
        return $('a[ui-sref="user.profile"]');
    }

    get supportPinValue() {
        const supportPinValueElement = element(by.xpath('//span[contains(text(),"Support pin")]/following::div[@class="description"]/span[@class="text ng-binding"]'));
        return supportPinValueElement.getText();
    }
}
module.exports = MainPage;