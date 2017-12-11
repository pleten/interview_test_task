'use strict';

let I;
let pHome = require('./Home');

module.exports = {

    _init() {
        I = require('../steps_file')();
    },

    url: "/user/profile",

    locators: {
        profileFields: {
            name: "Name",
            email: "Email",
            password: "Password",
            phone: "Phone",
            address: "Address",
            supportPin: "Support pin",
            newsletter: "Newsletter"
        }
    },

    clickButtonNextToFieldName(){
        I.click('//*[text()[contains(.,"Support pin")]]/parent::*/following-sibling::button/span');
    },

    getValueContextByFieldName(name){
        return '//*[text()[contains(.,"' + name + '")]]/parent::*/following-sibling::div/span';
    },
};
