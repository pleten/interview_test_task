const MainPage = require('../../common/pages/main_page.js');

module.exports = {

    goToUserProfile: async function () {
        const mainPage = new MainPage();
        await mainPage.userMenu.userDropDownButton.click();
        await mainPage.userMenu.profileButton.click();
    },


};