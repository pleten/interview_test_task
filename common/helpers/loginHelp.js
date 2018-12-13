const loginPage = require('../../common/pages/login_page.js');
const connections = require('../connections.json');

module.exports = {


    login: function (login, password){
        browser.waitForAngular(true);

        const timeout = 20;//sec
        const loginPage = new loginPage();
        loginPage.get();
        loginPage.login(login, password);

        const mainPage = new MainPage();
        expect(mainPage.userButton.getText()).toBe(connections.username, 'login failed');


    }
}