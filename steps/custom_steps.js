const {authorizePage, User, headerElem} = inject();

module.exports = function () {
    return actor({
        logOut: function () {
            this.amOnPage(authorizePage.logOutUrl);
            this.clearCookie();
        },
        login: function () {
            this.amOnPage(authorizePage.url);
            this.waitForElement(authorizePage.authForm);
            authorizePage.login(User.email, User.password);
            this.waitForElement(headerElem.userCertificatesBtn, 4);
            this.seeCookie('sc.ASP.NET_SESSIONID');
        }
    });
};
