let page = require(`./fragments/pages/header`);

let HeaderSteps = function() {

    this.clickLoginButton = function() {
       page.loginButton.click();
    };

    this.seeLoggedInButton = function(email = false) {
        page.loggedInButton(email).isDisplayed();
    };

    this.seeDropDownProfileButton = function () {
        page.profileDropBoxButton.isDisplayed();
    };

    this.clickProfileDropBoxButton = function() {
        page.profileDropBoxButton.click();
    };

    this.clickOnDropMenuItem = function (name) {
        page.dropMenu[`${name}Button`].click();
    };
};
module.exports = new HeaderSteps();