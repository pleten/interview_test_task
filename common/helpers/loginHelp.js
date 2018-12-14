const loginPage = require('../../common/pages/login_page.js');
const connections = require('../../connections.json');
const EC = protractor.ExpectedConditions;

module.exports = {

    login: async function (email, password) {

        let loginPage = new loginPage();
        email = connections.credentials.admin.login;
        password = connections.credentials.admin.password;
        await loginPage.loginButton.click();
        await loginPage.nameField.sendKeys(email);
        await loginPage.passwordField.sendKeys(password);
        await loginPage.submit.click();
        browser.wait(EC.elementToBeClickable(loginPage.userDropDownButton), 4000);

    },

    logout:  async function () {

        let loginPage = new loginPage();
        if (await loginPage.userDropDownButton.isPresent()) {
            await loginPage.userDropDownButton.click();
            await loginPage.logoutButton.click();

        }
    }
};
