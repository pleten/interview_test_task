const {I} = inject();
const fs = require('fs');
const path = require('path');

module.exports = {

    url: '/user/profile',

    profileContentBlck: '.profile-content',
    profileItems: '.item .description',
    newsletterRadioBtn: '.toggle-btn.on',
    supportPinValue: '//*[@ng-click="regeneratePin()"]/preceding-sibling::*[@class="description"]',
    supportPinBtn: '[ng-click="regeneratePin()"]',
    pinGeneratorApiUrl: '/api/user/current/pinGenerator',
    formTextFields: ['name', 'email', 'password', 'phone', 'address'],

    getFormDescriptionLocatorByName(name = '') {
        let locator;
        let baseLocator = '//*[@ng-click="activeRow = \'%fieldName\'"]/preceding-sibling::*[@class="description"]';
        if (this.formTextFields.includes(name) && name.length > 0) {
            locator = baseLocator.replace('%fieldName', name)
        } else {
            locator = "//*[@name=\"supportPin\"]/preceding-sibling::*[@class=\"description\"]";
        }

        return locator;
    },

    async saveUserProfileDataToFile() {
        I.amOnPage(this.url);
        I.waitForElement(this.profileContentBlck, 2);
        let _this = this;
        I.seeNumberOfVisibleElements(_this.profileItems, 7);

        // grab text for regular fields
        let fieldValue;
        var result = {};
        for (let field of this.formTextFields) {
            fieldValue = await I.grabTextFrom(_this.getFormDescriptionLocatorByName(field));
            result[field] = fieldValue;
        }
        // grab value for support pin
        result['supportPin'] = await I.grabTextFrom(_this.getFormDescriptionLocatorByName());
        // radio btn value
        result['newsletter'] = await I.grabNumberOfVisibleElements(_this.newsletterRadioBtn);
        pathToFile = path.join(global.output_dir, 'user_profile.json');
        fs.writeFileSync(pathToFile, JSON.stringify(result));
        return pathToFile;
    },
};
