class HeaderPage {

    constructor() {
        this.logInText = element(by.css('.log-box a'));
        this.logInButtonAfterLogIn = element(by.css('.log-box div>a'));
        this.userMenu = element(by.css('button[class*=dropdown-btn]'));
        this.userOptionsDropDown = element(by.css('button[class*=dropdown-btn]'));
    }

    rowByTextInUserOptionDropDown(rowText) {
        return `//ul[@nc-dropdown]/li[@class="drop-item"]/*[.="${rowText}"]`;
    }

    choseOptionInUserDropDown(rowName) {
        this.userOptionsDropDown.click();
        element(by.xpath(this.rowByTextInUserOptionDropDown(rowName))).click();
    }

    clickLogInText() {
        this.logInText.click();
    }
}

module.exports = new HeaderPage();