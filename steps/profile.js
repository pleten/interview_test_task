let page = require(`./pages/profile`);

let profilePage = function() {

    this.seeTextInItem = function(itemName, text) {
        expect(page.itemByName(itemName).getText()).toBe(text);
    };

    this.waitForChangesInItemByName = function(itemName, oldText) {
        expect(page.itemByName(itemName).getText() === oldText).toBe(false);
    };

    this.seeToggleState = function(isActive) {
        if (isActive) {
            expect(page.itemByName("newsletter").getAttribute('class')).toBe("toggle-btn on");
        } else {
            expect(page.itemByName("newsletter").getAttribute('class')).toBe("toggle-btn");
        }
    };

    this.clickOnItemButtonByName = function (name) {
        page.editItemButtonByName(name).click();
    };

    this.getTextFromItemByName = function (name) {
        return page.itemByName(name).getText();
    };
};
module.exports = new profilePage();