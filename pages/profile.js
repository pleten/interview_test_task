let profilePage = function() {
    this.itemByName = function(name) {
        if (name === "pin") {
            return element(by.css(`div[ng-class*="pin"] span.ng-binding`));
        } else if (name === "newsletter") {
            return element(by.css(`div[ng-class*="newsletter"] button`));
        }
        else {
            return element(by.css(`span[ng-hide="activeRow === '${name}'"]`));
        }
    };
    this.editItemButtonByName = function (name) {
        if (name === "pin") {
            return element(by.css(`div[ng-class*="pin"] button`));
        } else if (name === "newsletter") {
            return element(by.css(`div[ng-class*="newsletter"] button`));
        }
        else {
            return element(by.css(`button[ng-hide="activeRow === '${name}'"]`));
        }
    };
};
module.exports = new profilePage();