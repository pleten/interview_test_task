Feature('Log Out');

Before(loginAs => {

    loginAs('user');
});

Scenario('Successful log out flow', (I, authorizePage, homePage, User, headerElem) => {
    I.amOnPage(homePage.url);
    I.waitForElement(headerElem.dropdownMenuItems.logOut);
    I.click(headerElem.dropdownMenuBtn);
    I.waitForElement(headerElem.dropdownMenuItems.logOut);
    I.click(headerElem.dropdownMenuItems.logOut);
    I.waitForResponse(response => response.url().endsWith('/authorize/logout'));
    I.waitForElement(authorizePage.authForm);
    I.seeInCurrentUrl(authorizePage.url);
    I.seeElement(headerElem.logInBtn);
});
