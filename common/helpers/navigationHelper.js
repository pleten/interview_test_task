const MainPage = require('common/pages/main_page.js');
const LoginPage = require('../../common/pages/login_page.js');
const connections = require('../../connections.json');
const EC = protractor.ExpectedConditions;

module.exports = {

    selectProfile: async function () {
        const loginPage = new LoginPage();
        const mainPage = new MainPage();
        await loginPage.userDropDownButton.click();
        await mainPage.viewProfileButton.click();
    },


};