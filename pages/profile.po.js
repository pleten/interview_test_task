/**
 * Created by vbu on 2/16/17.
 */

var ProfilePage = function () {

    var page = this;

    page.updatePin = function () {

        page.pinDesc.getText().then(function (pinBefore) {
            page.pinButton.click();
            browser.wait(function () {
                return page.pinDesc.getText().then(function (pinAfter) {
                    return pinBefore !== pinAfter;
                });
            }, BROWSER_WAIT, 'Waiting for pin changed ');
        });

    }
};

ProfilePage.prototype = Object.create({}, {
    items: { get: function() { return $$('.profile-content .item'); }},
    pinButton: { get: function() { return $('[ng-click*=regeneratePin]'); }},
    pinDesc: { get: function() { return element(by.cssContainingText('.item', 'Support pin')).$('.description'); }},
    itemDesc: { value: function(itemName) { return element(by.cssContainingText('.item', itemName)).$('.description'); }},
});

module.exports = ProfilePage;