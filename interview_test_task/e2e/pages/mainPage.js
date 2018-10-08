const common = require("../common/common.js");
const authPage = require("../pages/authorizationPage.js");

function mainPage() {

    this.loginBtn = element(By.css(".btn.flat-dark.ng-scope"));
    this.userEmailBtn = element(By.css(".btn.btn-s.round.filled.user-btn.ng-binding"));
    this.dropdownTriggerBtn = element(By.css(".btn.btn-s.round.filled.dropdown-btn.ng-isolate-scope"));
    this.logOutBtn = element(By.css("[style=\"display: block;\"] [ng-click=\"$ctrl.logout()\"]"));
    this.viewProfileBtn = element(By.css("[style=\"display: block;\"] [ui-sref=\"user.profile\"]"));
    this.certSortFilter = element(By.css(".btn.block.round.control.ng-scope"));

    this.openHomePage = function () {
        return common.openUrl(browser.baseUrl);
    };

    this.clickSingInBtn = function () {
        return common.click(this.loginBtn);
    };

    this.authUser = function (userLogin, userPasswd) {
        this.openHomePage();
        this.clickSingInBtn();
        authPage.setUserData(userLogin, userPasswd);
        authPage.clickLoginBtn();
    };

    this.logOut = function () {
        common.click(this.dropdownTriggerBtn);
        common.click(this.logOutBtn);
        common.waitVisible(authPage.loginBtn)
    };
    this.goToUserProfile = function () {
        common.click(this.dropdownTriggerBtn);
        common.click(this.viewProfileBtn);
    };

    this.clickFilterBtn = function (filterName) {
        common.click(element(By.xpath("//div[@class=\"filter-box ng-scope\"]" +
            "//a[contains(text(),'"+ filterName +"')]")));
    };

    this.getCertCount = function () {
        return element.all(By.css(".ssl-item.dv-item.col-4")).count();
    };

    this.getCertTitle = function () {
        return element.all(By.css("a .ssl-name.ng-binding")).getText();
    };

    this.clickSortFilter = function () {
        common.click(this.certSortFilter);
    };

    this.getPrice = function () {
        return element.all(By.css(".lg-price.ng-isolate-scope")).getText();
    };

    this.getReitingStars = function () {
        return element.all(By.css(".ssl-title > div.rating")).getAttribute("class");
    }
}
module.exports = new mainPage();