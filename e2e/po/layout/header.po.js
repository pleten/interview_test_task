/* eslint-disable protractor/no-by-xpath */
"use strict";

const HeaderPage = function () {
    this.logo = element(by.css(".logo"));
    this.logInLink = element(by.css(".log-box"));

    this.profileBox = element(by.css(".profile-box"));

    this.userCertificatesLink = this.profileBox.element(by.css("a.user-btn"));

    this.userDropdownMenu = this.profileBox.element(by.css("button.dropdown-btn"));
    this.purchasedCertsLink  = this.profileBox.element(by.linkText("Purchased certs"));
    this.orderHistoryLink  = this.profileBox.element(by.linkText("Order history"));
    this.addFundsLink  = this.profileBox.element(by.linkText("Add funds"));
    this.viewProfileLink  = this.profileBox.element(by.linkText("View profile"));
    this.logOutLink  = this.profileBox.element(by.buttonText("Log out"));

    this.userDataInDropdown = element(by.css(".drop-text"));

    this.certsLink = element(by.css('.nav .list-item:nth-child(1)'))
};

module.exports = new HeaderPage();
