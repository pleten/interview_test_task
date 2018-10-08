const common = require("../common/common.js");

function profilePage() {

    this.regeneratePinBtn = element(By.model("user.supportPin"));

    this.newsletterToggleBtn = element(By.xpath('//span[text()=\'Newsletter\']/ancestor::div[@class="item"]' +
        '//div[@class="description"]/button'));

    this.getProfileField = function (fielName) {
        return element(By.xpath("//span[text()='"+fielName+"']/ancestor::div[@class=\"item\"]" +
            "//div[@class=\"description\"]"))
    };

    this.clickRegeneratePinBtn = function () {
        common.click(this.regeneratePinBtn);
    }
}
module.exports = new profilePage();