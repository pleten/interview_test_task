let page = require(`./pages/home`);

let HomeSteps = function() {

    this.seeCertListPage = function () {
        page.certListPage.isDisplayed();
    };

    this.getNumberOfSslItems = function (name) {
        if (name === "multi-domain") {
            name = "multiDomain";
        }
        return page[`${name}SslItem`].count();
    };

    this.checkNumberOfSslItems = function (expectNumber, name = 'any') {
        expect(page[`${name}SslItem`].count()).toBe(expectNumber);
    };

    this.checkActiveFilter = function (name) {
        page.filterButton(name, "active").isDisplayed();
    };

    this.checkNotActiveFilter = function (name) {
        page.filterButton(name, "notActive").isDisplayed();
    };

    this.clickFilterButton = function (name) {
        page.filterButton(name).click();
    };
};
module.exports = new HomeSteps();