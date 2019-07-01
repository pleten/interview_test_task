const { When, Then } = require("cucumber");
const expect = require("chai").use(require("chai-as-promised")).expect;
import { onDropDownMenu } from "../pagesObjects";
import { onProfilePage } from "../pagesObjects/profilePage";
import { context } from "../support/hooks";

When(/^I open dropdown menu and remember user data values$/, async function () {
    context.userData = { userName: "", userEmail: "", supportPin: "" };
    await onDropDownMenu.openDropDownMenu();
    context.userData.userName = await onDropDownMenu.getUserNameFromDropBox();
    context.userData.userEmail = await onDropDownMenu.getUserEmailFromDropBox();
    context.userData.supportPin = await onDropDownMenu.getSupportedPinFromDropBox();
});

When(/^I open My profile page$/, async () => {
    await onDropDownMenu.goToUserProfilePage();
});

When(/^I open My profile page from the dropdown menu$/, async function () {
    await onDropDownMenu.openDropDownMenu();
    await onDropDownMenu.goToUserProfilePage();
});

When(/^I refresh Support pin on Profile form$/, async function () {
    context.oldPin = await onProfilePage.getActualPin();
    await onProfilePage.updateSupportPin();
});

Then(/^User name, Email and Support pin on Profile form should match corresponding values on the dropdown menu$/, async function () {
    const userNameFromProfile = await onProfilePage.getUserName();
    const userEmailFromProfile = await onProfilePage.getUserEmail();
    const supportPinFromProfile = await onProfilePage.getActualPin();

    expect(userNameFromProfile).to.be.equal(context.userData.userName);
    expect(userEmailFromProfile).to.be.equal(context.userData.userEmail);
    expect(supportPinFromProfile).to.be.equal(context.userData.supportPin);
});

Then(/^Password, Phone and Address fields should not be empty$/, async function () {
    const userPasswordFromProfile = await onProfilePage.getUserPassword();
    const userPhoneFromProfile = await onProfilePage.getUserPhoneNumber();
    const userAddressFromProfile = await onProfilePage.getUserAddress();
    expect(userPasswordFromProfile.length > 0).to.be.true;
    expect(userPhoneFromProfile.length > 0).to.be.true;
    expect(userAddressFromProfile.length > 0).to.be.true;
});

Then(/^Support pin should be updated on Profile form$/, async function () {
    context.actualPinFromProfile = await onProfilePage.getActualPin();

    expect(context.actualPinFromProfile).to.be.not.equal(context.oldPin);
});

Then(/^New support pin should be displayed on dropDown menu$/, async function(){
    await onDropDownMenu.openDropDownMenu();
    const currentPinFromDropDownMenu = await onDropDownMenu.getSupportedPinFromDropBox();

    expect(currentPinFromDropDownMenu).to.be.not.equal(context.oldPin);
    expect(context.actualPinFromProfile).to.be.equal(currentPinFromDropDownMenu);
});
