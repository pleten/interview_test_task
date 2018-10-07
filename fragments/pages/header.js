let Header = function() {

    this.loginButton = element(by.css('.log-box'));
    this.loggedInButton = function (email = false) {
        if (email) {
            return element(by.cssContainingText('.user-btn', email));
        } else {
            return element(by.css('.user-btn'));
        }
    };
    this.profileDropBoxButton = element(by.css('.profile-box button.btn'));
    this.dropMenu = {
        logoutButton: element(by.css('.drop-button')),
        profileButton: element.all(by.xpath('//*[@ui-sref="user.profile"]'))
    };
};
module.exports = new Header();