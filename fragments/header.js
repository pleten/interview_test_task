'use strict';

let I;

module.exports = {

    _init() {
        I = actor();
    },



// Elements
    userDropDownIcon: '.dropdown-btn',

    headerOption(name){
        return `//a[contains(@class,'btn')][contains(.,'${name}')]`
    },

    userMenuOption(name){
        return `//li[contains(@class,'drop-item')]//*[contains(.,'${name}')]`
    },


// Actions

    clickHeaderOption(name){
        I.click(this.headerOption(name))
    },

    seeHeaderOption(name){
        I.waitForVisible(this.headerOption(name));
        I.seeElement(this.headerOption(name));
    },

    dontSeeHeaderOption(name){
        I.dontSeeElement(this.headerOption(name))
    },

    openUserMenu(){
        I.click(this.userDropDownIcon)
    },

    clickUserMenuOption(name){
        this.openUserMenu();
        I.click(this.userMenuOption(name))
    }

};