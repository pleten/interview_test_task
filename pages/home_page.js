const HomePage = function() {
    // elements
    const loginNavigationLink = element(by.css('.btn.flat-dark.ng-scope'));
    const userCertificatesButton = element(by.css('.user-btn'));
    const dropdownButton = element(by.css('.dropdown-btn'));
    const dropdownContainer = element(by.css('.dropdown'));
    const logoutButton = element(by.css('.drop-button'));
    const profileButton = element(by.css(`[ui-sref='user.profile']`));
    const certsLink = element(by.css(`[ng-click*='certs']`));
    const personalFilterButton = element(by.xpath(`//a[contains(text(), 'Personal')]`));
    const multiDomainFilterButton = element(by.xpath(`//a[contains(text(), 'multi-domain')]`));
    const cheapestFilterButton = element(by.xpath(`//a[contains(., 'Cheapest')]`));
    const featuredFilterButton = element(by.xpath(`//a[contains(., 'Featured')]`));
    const certsPrice = (by.css(`.ssl-content price.lg-price`));
    const certsNamesXpath = (by.xpath(`//h3`));

    // methods
    this.goToLoginPage = function() {
        console.log('Navigate to Authorize page');
        return loginNavigationLink.click();
    };

    this.goToCerts = function() {
        console.log('Scroll to Certs block');
        return certsLink.click();
    };

    this.usePersonalFilter = function() {
        console.log('Activate Personal Filter');
        return personalFilterButton.click();
    };

    this.useMultiDomainFilter = function() {
        console.log('Activate Multi Domain Filter');
        return multiDomainFilterButton.click();
    };

    this.useCheapestFilter = function() {
        console.log('Activate Cheapest Filter');
        return cheapestFilterButton.click();
    };

    this.useFeaturedFilter = function() {
        console.log('Activate Featured Filter');
        return featuredFilterButton.click();
    };

    this.getVisibleCertsCount = function () {
        console.log('Get visible Certs count');
        return element.all(certsNamesXpath).count();
    };

    this.getLastCertPrice = function () {
        console.log('Get last Cert price');
        return element.all(certsPrice).last().getAttribute("value");
    };

    this.isLoginNavigationLinkDisplayed = function() {
        console.log('Check login button');
        return !!loginNavigationLink.isDisplayed();
    };

    this.getUserCertificatesButtonText = function() {
        console.log('Get user Certificates button text');
        return userCertificatesButton.getText();
    };

    this.openUserDropdownMenu = function() {
        console.log('Click on drop down button');
        return dropdownButton.click();
    };

    this.getUserDropdownMenuContainer = function() {
        console.log('Get drop down container element');
        return dropdownContainer;
    };

    this.performLogout = function() {
        console.log('Click on Logout button');
        return logoutButton.click();
    };

    this.navigateToUserProfile = function() {
        console.log('Click on Profile link');
        return profileButton.click();
    };
};

module.exports = new HomePage();