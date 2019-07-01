const { When, Then } = require("cucumber");
const expect = require("chai").use(require("chai-as-promised")).expect;
import { onDropDownMenu } from "../pagesObjects";
import { onProfilePage } from "../pagesObjects/profilePage";

const userData = { userName: "", userEmail: "", supportPin: "" };

When(/^I open dropdown menu and remember user data values$/, async function () {
    await onDropDownMenu.openDropDownMenu();
    userData.userName = await onDropDownMenu.getUserNameFromDropBox();
    userData.userEmail = await onDropDownMenu.getUserEmailFromDropBox();
    userData.supportPin = await onDropDownMenu.getSupportedPinFromDropBox();
});

When(/^I open My profile page$/, async () => {
    await onDropDownMenu.goToUserProfilePage();
});

When(/^I open My profile page from the dropdown menu$/, async function () {
    await onDropDownMenu.openDropDownMenu();
    await onDropDownMenu.goToUserProfilePage();
});

When(/^I refresh Support pin on Profile form$/, async function () {
    this.oldPin = await onProfilePage.getActualPin();
    await onProfilePage.updateSupportPin();
});

Then(/^User name, Email and Support pin on Profile form should match corresponding values on the dropdown menu$/, async function () {
    const userNameFromProfile = await onProfilePage.getUserName();
    const userEmailFromProfile = await onProfilePage.getUserEmail();
    const supportPinFromProfile = await onProfilePage.getActualPin();

    expect(userNameFromProfile).to.be.equal(userData.userName);
    expect(userEmailFromProfile).to.be.equal(userData.userEmail);
    expect(supportPinFromProfile).to.be.equal(userData.supportPin);
});

Then(/^Password, Phone and Address fields should not be empty$/, async function () {
    const userPasswordFromProfile = await onProfilePage.getUserPassword();
    const userPhoneFromProfile = await onProfilePage.getUserPhoneNumber();
    const userAddressFromProfile = await onProfilePage.getUserAddress();
    expect(userPasswordFromProfile.length > 0).to.be.true;
    expect(userPhoneFromProfile.length > 0).to.be.true;
    expect(userAddressFromProfile.length > 0).to.be.true;
});

Then(/^Support pin should be updated on Profile form and on dropdown menu$/, async function () {
    const actualPinFromProfile = await onProfilePage.getActualPin();
    await onDropDownMenu.openDropDownMenu();
    const actualPinFromDropDownMenu = await onDropDownMenu.getSupportedPinFromDropBox();
    expect(actualPinFromProfile).to.be.not.equal(this.oldPin);
    expect(actualPinFromDropDownMenu).to.be.not.equal(this.oldPin);
    expect(actualPinFromDropDownMenu).to.be.equal(actualPinFromProfile);
});
