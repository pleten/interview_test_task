'use strict';

let UserProfilePage = function() {
    let profileItems = element.all(by.css('div.profile-content div.item'));
    let updateSupportPinButton = element(by.name('supportPin'));
    let supportPinValue = element(by.css('[ng-class*=pin] span.ng-binding'));


    this.getNameForRow = (selector) => {
        return selector.element(by.css('div.terms span')).getText();
    };

    this.getTextForRow = (selector) => {
        return selector.element(by.css('div.description span.text.ng-binding')).getText();
    };

    this.getItemsObjects = async () => {

        return new Promise(async (resolve, reject) => {
            let arr = [];

            let elementsCount = await profileItems.count();

            for (let i = 0; i < elementsCount - 1; i++) { // -1 for skip 'Newsletter' field
                let obj = {};
                let key = await this.getNameForRow(profileItems.get(i));
                let value = await this.getTextForRow(profileItems.get(i));
                obj[key] = value;
                arr.push(obj);
                if (arr.length === elementsCount - 1){
                    resolve(arr);
                }
            }
        });
    };

    this.updateSupportPin = () => {
        updateSupportPinButton.click();
    };

    this.getSupportPinValue = () => {
        return supportPinValue.getText();
    }

};
module.exports = new UserProfilePage();
