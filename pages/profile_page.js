const EC = protractor.ExpectedConditions;


const ProfilePage = function() {
    // elements
    const nameCell = element(by.css(`[class*='text'][ng-hide*='name']`));
    const emailCell = element(by.css(`[class*='text'][ng-hide*='email']`));
    const passwordCell = element(by.css(`[class*='text'][ng-hide*='password']`));
    const phoneCell = element(by.css(`[class*='text'][ng-hide*='phone']`));
    const addressCell = element(by.css(`[class*='text'][ng-hide*='address']`));
    const supportPinCell = element(by.css(`[ng-class*='pin'] .description span`));
    const refreshSupportPinButton = element(by.css(`button[ng-click*="regeneratePin"]`));
    const newsletterOnStatus = element(by.css(`.toggle-btn.on`));

    // methods
    this.getName = function() {
        console.log(`Get user Name`);
        return nameCell.getText();
    };

    this.getEmail = function() {
        console.log(`Get user Email`);
        return emailCell.getText();
    };

    this.getPhone = function() {
        console.log(`Get user Phone`);
        return phoneCell.getText();
    };

    this.getAddress = function() {
        console.log(`Get user Address`);
        return addressCell.getText();
    };

    this.refreshSupportPin = function() {
        console.log(`Update 'Support Pin'`);
        return refreshSupportPinButton.click();
    };

    this.getSupportPin = function() {
        console.log(`Get 'Support Pin'`);
        browser.wait(EC.elementToBeClickable(newsletterOnStatus), 5000);
        return supportPinCell.getText();
    };

    this.getPassword = function () {
        console.log('Get Password');
        return passwordCell;
    };

    this.getNewsletter = function () {
        console.log('Get Newsletter');
        return newsletterOnStatus;
    };
};

module.exports = new ProfilePage();