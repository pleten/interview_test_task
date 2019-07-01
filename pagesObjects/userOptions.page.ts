import { $, ExpectedConditions, browser } from "protractor";

class DropDownMenu {
    private openDDMenuButton = $("button.dropdown-btn");
    private userCertificatesListButton = $("div.profile-box>a");
    private userNameText = $("li.drop-item>span.drop-text>span");
    private dropBoxText = $("li.drop-item>span.drop-text");
    private logoutButton = $("li.drop-item>button.drop-button");
    private viewProfileButton = $("li.drop-item>a[ui-sref='user.profile']");

    public async openDropDownMenu() {
        await browser.wait(ExpectedConditions.presenceOf(this.openDDMenuButton), 2000);
        await this.openDDMenuButton.click();
    }

    public async isUserCertificatesListButtonDisplayed() {
        try {
            await browser.wait(ExpectedConditions.presenceOf($("div.profile-box>a")), 2000);
            return await this.userCertificatesListButton.isDisplayed();
        }
        catch (e) {
            return false;
        }
    }

    public async getUserCertificatesListButtonTitle() {
        return await this.userCertificatesListButton.getText();
    }

    public async clickLogoutButton() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.logoutButton), 2000);
        await this.logoutButton.click();
    }

    public async goToUserProfilePage() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.viewProfileButton), 2000);
        await this.viewProfileButton.click();
    }

    public async getUserNameFromDropBox() {
        const listOfTexts = await this.getListOfUserDataFromDropBox();
        return listOfTexts.userName;
    }

    public async getUserEmailFromDropBox() {
        const listOfTexts = await this.getListOfUserDataFromDropBox();
        return listOfTexts.userEmail;
    }

    public async getSupportedPinFromDropBox() {
        const listOfTexts = await this.getListOfUserDataFromDropBox();
        return listOfTexts.pin;
    }

    private async getListOfUserDataFromDropBox() {
        const userData = {
            userName: "",
            userEmail: "",
            pin: ""
        };

        const dropBoxText = await this.dropBoxText.getText();
        const arrayOfUserData = dropBoxText.split("\nSupport pin:");

        userData.userName = await this.userNameText.getText();
        userData.userEmail = arrayOfUserData[0].trim();
        userData.pin = arrayOfUserData[1].trim();
        return userData;
    }

}

export const onDropDownMenu = new DropDownMenu();