const pageObject = require('../../services/pages').container.PageObject;
const abstractPage = pageObject.getAbstractPage();
const commonHelper = require('./../../helpers/common.helper.js');
const fileHelper = require('./../../helpers/file.helper.js');
let resultArray = [];
const ProfilePage = function () {

    //--------------------------------------------------------------------------
    // Elements
    //--------------------------------------------------------------------------

    this.txtName = $('div[ng-class*="name"] .description span.text');
    this.txtEmail = $('div[ng-class*="email"] .description span.text');
    this.txtPassword = $('div[ng-class*="password"] .description span.text');
    this.txtPhone = $('div[ng-class*="phone"] .description span.text');
    this.txtAddress = $('div[ng-class*="address"] .description span.text');
    this.txtSupportPin = $('div[ng-class*="pin"] .description span.text');
    this.txtNewsletter = $('div[ng-class*="newsletter"] .description button');
    this.btnUpdatePin = $('button[name="supportPin"]');

    //--------------------------------------------------------------------------
    // Functions
    //--------------------------------------------------------------------------

    this.getProfileInfo = async function () {
        abstractPage.openViewProfile();
        commonHelper.waitUntilElementVisible(this.txtEmail);
        const name = await this.txtName.getText();
        const email = await this.txtEmail.getText();
        const password = await this.txtPassword.getText();
        const phone = await this.txtPhone.getText();
        const address = await this.txtAddress.getText();
        const pin = await this.txtSupportPin.getText();
        const newsletter = await this.txtNewsletter.getAttribute('class');

        this.infoToObj(name, email, password, phone, address, pin, newsletter);
    };

    this.infoToObj = function (name, email, password, phone, address, pin, newsletter) {
        global.profileInfo = {
            name: name,
            email: email,
            password: password,
            phone: phone,
            address: address,
            pin: pin,
            newsletter: newsletter
        };
    };

    this.getSupportPin = async function () {
        abstractPage.openViewProfile();
        commonHelper.waitUntilElementVisible(this.txtSupportPin);
        global.preSupportPin = await this.txtSupportPin.getText();
    };

    this.updateSupportPin = function () {
        commonHelper.waitUntilElementVisible(this.btnUpdatePin);
        this.txtSupportPin.click();
    }
};

module.exports = ProfilePage;


