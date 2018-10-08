const common = require("../common/common.js");

function authorizationPage() {

    this.emailInput = element(By.model("form.email"));
    this.passwdInput = element(By.model("form.password"));
    this.eyeBtn = element(By.css(".btn-input.btn-input-block"));
    this.loginBtn = element(By.css(".btn.block.primary"));
    this.notificationMsg = element(By.css(".noty_message.message"));
    this.emailTooltipMsg = element(By.css("form[name=\"authForm\"] .row:nth-child(2) [class=\"left-tooltip-box\"] " +
        ".tooltip.tooltip-error"));
    this.passwdTooltipMsg = element(By.css("form[name=\"authForm\"] .row:nth-child(3) [class=\"left-tooltip-box\"] " +
        ".tooltip.tooltip-error"));

    this.setUserData = function (email, passwd) {
        common.sendKeys(this.emailInput, email);
        common.sendKeys(this.passwdInput, passwd)
    };

    this.clickEyeBtn = function () {
        common.click(this.eyeBtn);
    };

    this.clickLoginBtn = function () {
        common.click(this.loginBtn);
    };
}
module.exports = new authorizationPage();