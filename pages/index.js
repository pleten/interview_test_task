let chai = require("chai"),
    check = chai.expect;
chai.use(require("chai-sorted"));

let IndexPage = function() {

    const loginBtn = element(by.css('[ui-sref="authorize.index"]'));
    const userEmailBtn = element(by.css('.profile-box .user-btn'));
    const userMenuDropDown = element(by.css('.profile-box .dropdown-btn'));
    const logoutBtn = element(by.css('[ng-click="$ctrl.logout()"]'));
    const viewProfileBtn = element(by.css('[ui-sref="user.profile"]'));

    const listOfRatings = element.all(by.css("[class*='rating stars']"));
    const listOfPrices = element.all(by.css('.ssl-price-box price[class*=lg-price]'));
    const listOfTitles = element.all(by.css('.ssl-name'));

    this.filterBtn = function (name) {
        let filterButton = element(by.xpath(`//div[contains(@class,'filter-item')]//a[contains(.,'${name}')]`));
        return filterButton
    };

    this.sortOption = function (name) {
        let sortOption = element(by.xpath(`//a[contains(.,'${name}')]`));
        return sortOption
    };

    this.clickLoginBtn = function() {
        loginBtn.click();
    };

    this.getUserEmailBtn = function () {
        return userEmailBtn;
    };

    this.getUserMenuDropDown = function () {
        return userMenuDropDown;
    };

    this.openProfilePage = function () {
        userMenuDropDown.click();
        viewProfileBtn.click()

    };

    this.logout = function(){
        userMenuDropDown.click();
        logoutBtn.click();
    };

    this.filterBtn = function (name) {
        let filterButton = element(by.xpath(`//div[contains(@class,'filter-item')]//a[contains(.,'${name}')]`));
        return filterButton
    };

    this.sortOption = function (name) {
        let sortOption = element(by.xpath(`//a[contains(.,'${name}')]`));
        return sortOption
    };

    this.clickFilterBtn = function (name) {
        this.filterBtn(name).click()
    };

    this.sortCertificatesBy = function (name) {
        this.sortOption(name).click();
    };

    this.checkSortingByFeatured = function () {
        let ratingArr = [];
        listOfRatings.each((ratingElement) => {
            ratingElement.getAttribute('class').then(text => {
                let number = parseFloat(text.replace(/[^\d_]/g, '').replace('_', '.'));
                return ratingArr.push(number);
            });
        }).then(() => {
            console.log(ratingArr);
            check(ratingArr).to.be.sorted(true);
        });
    };

    this.checkSortingByPrices = function () {
        let pricesArr = [];
        listOfPrices.each((priceElement) => {
            priceElement.getAttribute('value').then(text => {
                return pricesArr.push(parseFloat(text));
            });
        }).then(() => {
            console.log(pricesArr);
            check(pricesArr).to.be.sorted();
        });
    };

    this.checkPersonalFilter = function (array) {
        let list = [];
        listOfTitles.each(function(element) {
            element.getText().then(function (text) {
                return list.push(text)
            });
        }).then(() => {
           console.log(list);
           check(list).to.deep.equal(array);
       });
    };

    this.checkMultiDomainFilter = function () {
        listOfTitles.each(function(element) {
            element.getText().then(function (text) {
                console.log('sdfsdfsd'+text);
                expect(text).toContain('Multi-Domain');
            });
        });
    }

};
module.exports = new IndexPage();