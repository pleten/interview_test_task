var HomePage = function() {

    this.loginLink = element(by.linkText('LOG IN'));
    this.logoutLink = element(by.buttonText('Log out'));
    this.profileLink = element(by.linkText('View profile'));
    this.certificateList = element(by.css('.cert-list'));
    this.profileBtn = element(by.css('.user-btn'));
    this.profileMenu = element(by.css('.dropdown-btn'));

    this.go = function() {
        browser.get('https://www.ssls.com');
    };

    this.logout = function() {
        this.profileMenu.click().then(function() {
            this.logoutLink.click();
        })
    }

    this.viewProfile = function() {
        this.profileMenu.click().then(function() {
            this.profileLink.click();
        })
    }
}

module.exports = HomePage;
