const LoginPage = require('../../common/pages/login_page.js');
const MainPage = require('../../common/pages/main_page.js');
const connections = require('../../connections.json');
const EC = protractor.ExpectedConditions;

module.exports = {

    login: async function (
        email = connections.credentials.admin.login,
        password = connections.credentials.admin.password
    ) {

        let mainPage = new MainPage();
        let loginPage = new LoginPage();
        this.email = email;
        this.password = password;
        await browser.wait(EC.elementToBeClickable(mainPage.loginButton), 10000);
        await mainPage.loginButton.click();
        await browser.wait(EC.elementToBeClickable(loginPage.nameField), 10000);
        await loginPage.nameField.sendKeys(this.email);
        await loginPage.passwordField.sendKeys(this.password);
        await loginPage.submitLoginButton.click();
        browser.wait(EC.elementToBeClickable(mainPage.userMenu.userDropDownButton), 4000);

    },

    logout:  async function () {

        let mainPage = new MainPage();
        if (await mainPage.userMenu.userDropDownButton.isPresent()) {
            await mainPage.userMenu.userDropDownButton.click();
            await mainPage.userMenu.logoutButton.click();
            await  browser.sleep(2000, 'Logout awaiting was not fulfilled');

        }
    }
};
