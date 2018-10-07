let login = require(`./steps/login`);
let header = require(`./fragments/steps/header`);
let home = require(`./steps/home`);
let profile = require(`./steps/profile`);
let testData = require(`./testData`);

let I = function() {

    this.openUrl = function(url) {
        if (typeof url === "undefined") {
            browser.get(testData.mainUrl);
        } else if (url.includes("http")) {
            browser.get(url);
        } else {
            browser.get(`${testData.mainUrl}/${url}`);
        }
        browser.waitForAngular();
    };

    this.seeHomePage = function () {
        home.seeCertListPage();
    };

    this.openLoginPage = function () {
        header.clickLoginButton();
    };

    this.seeLoginPage = function () {
        login.seeEmailField();
        login.seePasswordField();
    };

    this.fillLoginData = function (user, shouldSubmit = true, checkEyeFeature = true) {
        for (let field in user) {
            login[`fill${this.ucFirst(field)}Field`](user[field]);
        }
        if (checkEyeFeature) {
            this.checkEyeFeature(user.password);
        }
        if (shouldSubmit) {
            login.clickLoginButton();
        }
    };

    this.checkEyeFeature = function (password) {
        login.clickShowPasswordButton();
        login.seeTextInPasswordField(password);
    };

    this.checkLoggedIn = function (email) {
        header.seeLoggedInButton(email);
        header.seeDropDownProfileButton();
    };

    this.checkLoginError = function() {
        login.seeTextInNotify(testData.loginError);
    };

    this.checkInvalidEmailError = function() {
        login.seeTextInEmailTooltip(testData.invalidEmailError);
    };

    this.checkBlankEmailError = function() {
        login.seeTextInEmailTooltip(testData.blankEmailError);
    };

    this.checkBlankPasswordError = function() {
        login.seeTextInPasswordTooltip(testData.blankPasswordError);
    };

    this.logOut = function() {
        header.clickProfileDropBoxButton();
        header.clickOnDropMenuItem('logout');
    };

    this.openProfile = function() {
        header.clickProfileDropBoxButton();
        header.clickOnDropMenuItem('profile');
    };

    this.seeUrl = function(url) {
        if (typeof url === "undefined") {
            expect(browser.getCurrentUrl()).toBe(testData.mainUrl);
        } else if (url.includes("http")) {
            expect(browser.getCurrentUrl()).toBe(url);
        } else {
            expect(browser.getCurrentUrl()).toBe(`${testData.mainUrl}/${url}`);

        }
    };

    this.getProfileData = function () {
        testData.additionalUserData.pin = profile.getTextFromItemByName('pin');
        testData.additionalUserData.name = profile.getTextFromItemByName('name');
        testData.additionalUserData.email = profile.getTextFromItemByName('email');
        testData.additionalUserData.phone = profile.getTextFromItemByName('phone');
        testData.additionalUserData.address = profile.getTextFromItemByName('address');
    };

    this.checkAdditionalProfileData = function(userData) {
        for (let field in userData) {
            if (field === "newsletter") {
                profile.seeToggleState(userData[field]);
            } else {
                profile.seeTextInItem(field, userData[field]);
            }
        }
    };

    this.getCurrentPin = function() {
        testData.currentPin = profile.getTextFromItemByName('pin');
    };

    this.generateNewPin = function() {
        profile.clickOnItemButtonByName('pin');
    };

    this.checkPinChanged = function () {
        profile.waitForChangesInItemByName('pin', testData.currentPin);
        let newPin = profile.getTextFromItemByName('pin');
        profile.seeTextInItem('pin', newPin);
    };

    this.getNumberOfSslItems = async function (name) {
        testData[`${name}SslItemsCount`] = await home.getNumberOfSslItems(name);
    };

    this.selectFilter = function (name) {
        home.clickFilterButton(name);
        home.checkActiveFilter(name);
    };

    this.unSelectFilter = function (name) {
        home.clickFilterButton(name);
        home.checkNotActiveFilter(name);
    };

    this.checkNumberOfSslItems = function (name) {
        home.checkNumberOfSslItems(testData[`${name}SslItemsCount`], name);
        home.checkNumberOfSslItems(testData[`${name}SslItemsCount`]);
    };

    this.clearBrowserData = function() {
        browser.driver.manage().deleteAllCookies();
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
    };

    this.ucFirst = function (str) {
        if (!str) return str;
        return str[0].toUpperCase() + str.slice(1);
    }
};
module.exports = new I();