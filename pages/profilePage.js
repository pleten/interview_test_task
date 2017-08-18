'use strict';

let I;

module.exports = {

    _init() {
        I = actor();
        this.header = require('../fragments/header');
        this.header._init();
    },


// Elements

    refreshPinIcon: '[name=supportPin]',
    disabledItem: '.item.disabled',
    newsletterSwitcher: '[ng-class*=newsletter] button',

    valueInUserProfile(name){
        return `//span[@class='text'][contains(.,'${name}')]/ancestor::div[@class='item']//span[@class='text ng-binding']`
    },


// Actions

    getValueFromUserProfile: function* (name){
        let value = yield I.grabTextFrom(this.valueInUserProfile(name));
        return value
    },

    getValueOfNewsletter: function* (){
        let value = yield I.grabAttributeFrom(this.newsletterSwitcher, 'class');
        return value
    },

    clickPinIcon(){
        I.click(this.refreshPinIcon);
        I.waitForInvisible(this.disabledItem);
    },

    getAllProfileValues: function* (){
        let profileValues = [];
        profileValues["name"] = yield* this.getValueFromUserProfile('Name');
        profileValues["email"] = yield* this.getValueFromUserProfile('Email');
        profileValues["password"] = yield* this.getValueFromUserProfile('Password');
        profileValues["phone"] = yield* this.getValueFromUserProfile('Phone');
        profileValues["address"] = yield* this.getValueFromUserProfile('Address');
        profileValues["supportPin"] = yield* this.getValueFromUserProfile('Support pin');
        profileValues["newsletter"] = yield* this.getValueOfNewsletter();
        return profileValues
    }
};