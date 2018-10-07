let I = require('../mainSteps');
let data = require(`./testData`);

describe('Login page tests', function() {
    beforeEach(function () {
        I.openUrl();
        I.seeHomePage();
        I.openLoginPage();
        I.seeLoginPage();
    });

    it('Authorization page (Welcome back!)', function() {
        I.fillLoginData(data.validUser);
        I.checkLoggedIn(data.validUser.email);
    });

     it('Authorization page. Not registered user', function() {
        I.fillLoginData(data.notExistUser);
        I.checkLoginError();
    });

     it('Authorization page. Invalid email', function() {
        I.fillLoginData(data.invalidEmailUser);
        I.checkInvalidEmailError();
    });

     it('Authorization page. Empty fields', function() {
         I.fillLoginData({}, true, false);
         I.checkBlankEmailError();
         I.checkBlankPasswordError();
     });

    afterEach(function() {
        I.clearBrowserData();
    });
});