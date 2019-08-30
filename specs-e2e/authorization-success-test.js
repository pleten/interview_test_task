Feature('Authorization page successful login');

Scenario('successful login user flow', (I, authorizePage, homePage, User, headerElem) => {
    I.amOnPage(homePage.url);
    I.waitForElement(headerElem.logInBtn, 3);
    I.click(headerElem.logInBtn);
    I.waitForElement(authorizePage.authForm);
    I.seeCurrentUrlEquals(authorizePage.url);
    authorizePage.login(User.email, User.password);
    I.waitForElement(headerElem.userCertificatesBtn, 2);
    I.seeCurrentUrlEquals(homePage.url);
    I.see(User.email, headerElem.userCertificatesBtn);
});
